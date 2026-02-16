/**
 * SoundFlow – TikTok Saved Sounds Auto-Player
 * Content script injected on tiktok.com
 */

(() => {
  'use strict';

  // ── State ──────────────────────────────────────────────
  const state = {
    sounds: [],          // Array of { el, name, author }
    currentIndex: -1,
    isPlaying: false,
    shuffle: false,
    repeat: 'off',       // off | one | all
    volume: 0.8,
    enabled: true,
    shuffleOrder: [],
    shufflePos: -1,
  };

  let playerEl = null;
  let progressInterval = null;
  let observer = null;

  // ── Helpers ────────────────────────────────────────────
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function formatTime(s) {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'sf-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }

  // ── Sound Detection ────────────────────────────────────
  // TikTok's DOM changes often. We use multiple strategies to find sound items.
  function isSavedSoundsPage() {
    const url = window.location.href;
    return /tiktok\.com\/@[^/]+\/favorites\/sounds/.test(url) ||
           /tiktok\.com\/.*favorites.*sound/i.test(url) ||
           /tiktok\.com\/.*collection.*sound/i.test(url);
  }

  function detectSounds() {
    const candidates = [];

    // Strategy 1: Look for sound/music item containers with play buttons
    // TikTok uses data-e2e attributes extensively
    const soundItems = $$('[data-e2e*="sound"], [data-e2e*="music"], [data-e2e*="favorite-sound"]');
    if (soundItems.length > 0) {
      soundItems.forEach(el => {
        const name = extractSoundName(el);
        candidates.push({ el, name: name || 'Unknown Sound', author: extractAuthor(el) });
      });
    }

    // Strategy 2: Look for common sound list patterns
    if (candidates.length === 0) {
      // Sound cards typically have a play icon and music note
      const cards = $$('[class*="Sound" i], [class*="music" i], [class*="sound-card" i], [class*="soundCard" i]');
      cards.forEach(el => {
        if (el.offsetHeight > 20 && el.offsetHeight < 300) {
          const name = extractSoundName(el);
          if (name) candidates.push({ el, name, author: extractAuthor(el) });
        }
      });
    }

    // Strategy 3: Generic – any clickable item in a list that looks like a sound
    if (candidates.length === 0) {
      // On favorites/sounds page, look for list items with links
      const listItems = $$('div[class*="ItemContainer"], div[class*="item-container"], div[class*="Card"]');
      listItems.forEach(el => {
        const hasLink = $('a[href*="/music/"], a[href*="sound"]', el);
        if (hasLink) {
          const name = extractSoundName(el) || hasLink.textContent.trim();
          candidates.push({ el, name: name || 'Sound', author: extractAuthor(el) });
        }
      });
    }

    // Strategy 4: Broadest – look for any link pointing to /music/
    if (candidates.length === 0) {
      const musicLinks = $$('a[href*="/music/"]');
      const seen = new Set();
      musicLinks.forEach(a => {
        const container = a.closest('div[class]') || a.parentElement;
        const key = a.href;
        if (!seen.has(key) && container) {
          seen.add(key);
          candidates.push({
            el: container,
            name: a.textContent.trim() || 'Sound',
            author: extractAuthor(container)
          });
        }
      });
    }

    return candidates;
  }

  function extractSoundName(el) {
    // Try data-e2e labeled elements
    const named = $('[data-e2e*="name"], [data-e2e*="title"]', el);
    if (named) return named.textContent.trim();
    // Try headings or prominent text
    const h = $('h2, h3, h4, strong, [class*="title" i], [class*="name" i]', el);
    if (h) return h.textContent.trim();
    // First meaningful text node
    const text = el.textContent.trim().split('\n')[0];
    return text.length > 80 ? text.slice(0, 77) + '…' : text;
  }

  function extractAuthor(el) {
    const a = $('[data-e2e*="author"], [class*="author" i], [class*="creator" i]', el);
    return a ? a.textContent.trim() : '';
  }

  // ── Playback ───────────────────────────────────────────
  function getActiveMedia() {
    // Find the currently playing video or audio element
    const videos = $$('video');
    const audios = $$('audio');
    const all = [...videos, ...audios].filter(m => !m.paused || m.currentTime > 0);
    return all[0] || videos[0] || audios[0] || null;
  }

  function clickSound(index) {
    if (index < 0 || index >= state.sounds.length) return false;

    const sound = state.sounds[index];
    const el = sound.el;

    // Try clicking a play button within the sound element
    const playBtn = $('button, [role="button"], [class*="play" i], [data-e2e*="play"]', el) || el;
    playBtn.click();

    // If there's a link, also try clicking it
    const link = $('a[href*="/music/"]', el);
    if (link && !link.href.includes(window.location.pathname)) {
      // Don't navigate away – just trigger the inline play
    }

    state.currentIndex = index;
    state.isPlaying = true;
    updateUI();

    // Attach ended listener to media
    setTimeout(() => attachMediaListener(), 500);
    setTimeout(() => attachMediaListener(), 1500); // retry

    return true;
  }

  function attachMediaListener() {
    const media = getActiveMedia();
    if (!media) return;

    media.volume = state.volume;

    // Remove old listeners
    media.removeEventListener('ended', onMediaEnded);
    media.removeEventListener('pause', onMediaPause);

    media.addEventListener('ended', onMediaEnded);
    media.addEventListener('pause', onMediaPause);
  }

  function onMediaEnded() {
    if (state.repeat === 'one') {
      const media = getActiveMedia();
      if (media) { media.currentTime = 0; media.play(); }
      return;
    }
    playNext();
  }

  function onMediaPause() {
    // Only update if we didn't trigger pause ourselves
    setTimeout(() => {
      const media = getActiveMedia();
      if (media && media.paused && state.isPlaying) {
        // Could be end of track or user paused via TikTok UI
      }
    }, 200);
  }

  function playNext() {
    if (state.sounds.length === 0) return;

    let nextIndex;
    if (state.shuffle) {
      state.shufflePos++;
      if (state.shufflePos >= state.shuffleOrder.length) {
        if (state.repeat === 'all') {
          generateShuffleOrder();
          state.shufflePos = 0;
        } else {
          state.isPlaying = false;
          updateUI();
          toast('🎵 Queue finished');
          return;
        }
      }
      nextIndex = state.shuffleOrder[state.shufflePos];
    } else {
      nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.sounds.length) {
        if (state.repeat === 'all') {
          nextIndex = 0;
        } else {
          state.isPlaying = false;
          updateUI();
          toast('🎵 Queue finished');
          return;
        }
      }
    }

    clickSound(nextIndex);
  }

  function playPrev() {
    if (state.sounds.length === 0) return;

    // If more than 3s into track, restart it
    const media = getActiveMedia();
    if (media && media.currentTime > 3) {
      media.currentTime = 0;
      updateUI();
      return;
    }

    let prevIndex;
    if (state.shuffle) {
      state.shufflePos = Math.max(0, state.shufflePos - 1);
      prevIndex = state.shuffleOrder[state.shufflePos];
    } else {
      prevIndex = state.currentIndex - 1;
      if (prevIndex < 0) prevIndex = state.repeat === 'all' ? state.sounds.length - 1 : 0;
    }

    clickSound(prevIndex);
  }

  function togglePlayPause() {
    const media = getActiveMedia();

    if (state.currentIndex === -1 && state.sounds.length > 0) {
      // Start from beginning
      if (state.shuffle) {
        generateShuffleOrder();
        state.shufflePos = 0;
        clickSound(state.shuffleOrder[0]);
      } else {
        clickSound(0);
      }
      return;
    }

    if (media) {
      if (media.paused) {
        media.play();
        state.isPlaying = true;
      } else {
        media.pause();
        state.isPlaying = false;
      }
    } else {
      // No media found – try clicking the sound again
      clickSound(state.currentIndex >= 0 ? state.currentIndex : 0);
    }

    updateUI();
  }

  function generateShuffleOrder() {
    state.shuffleOrder = state.sounds.map((_, i) => i);
    // Fisher-Yates
    for (let i = state.shuffleOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.shuffleOrder[i], state.shuffleOrder[j]] = [state.shuffleOrder[j], state.shuffleOrder[i]];
    }
  }

  function cycleRepeat() {
    const modes = ['off', 'all', 'one'];
    const idx = modes.indexOf(state.repeat);
    state.repeat = modes[(idx + 1) % modes.length];
    updateUI();
    const labels = { off: 'Repeat off', all: 'Repeat all', one: 'Repeat one' };
    toast(`🔁 ${labels[state.repeat]}`);
  }

  function toggleShuffle() {
    state.shuffle = !state.shuffle;
    if (state.shuffle) {
      generateShuffleOrder();
      state.shufflePos = state.shuffleOrder.indexOf(state.currentIndex);
      if (state.shufflePos === -1) state.shufflePos = 0;
    }
    updateUI();
    toast(state.shuffle ? '🔀 Shuffle on' : '🔀 Shuffle off');
  }

  // ── UI ─────────────────────────────────────────────────
  function createPlayer() {
    if (playerEl) return;

    const html = `
      <button class="sf-collapse-btn" id="sf-toggle-collapse">▼ SoundFlow</button>
      <div class="sf-progress-wrap" id="sf-progress-wrap">
        <div class="sf-progress-bar" id="sf-progress-bar"></div>
      </div>
      <div class="sf-main">
        <div class="sf-info">
          <div class="sf-title" id="sf-title">SoundFlow – Ready</div>
          <div class="sf-meta" id="sf-meta">Detecting sounds…</div>
        </div>
        <div class="sf-controls">
          <button class="sf-btn" id="sf-shuffle" title="Shuffle">🔀</button>
          <button class="sf-btn" id="sf-prev" title="Previous">⏮</button>
          <button class="sf-btn sf-btn-play" id="sf-play" title="Play/Pause">▶</button>
          <button class="sf-btn" id="sf-next" title="Next">⏭</button>
          <button class="sf-btn" id="sf-repeat" title="Repeat">🔁</button>
        </div>
        <div class="sf-time" id="sf-time">0:00 / 0:00</div>
        <div class="sf-right">
          <div class="sf-volume-wrap">
            <button class="sf-btn" id="sf-vol-btn" title="Volume">🔊</button>
            <input type="range" class="sf-volume-slider" id="sf-volume" min="0" max="1" step="0.05" value="0.8">
          </div>
          <span class="sf-queue-badge" id="sf-badge">0 sounds</span>
        </div>
      </div>
    `;

    playerEl = document.createElement('div');
    playerEl.id = 'soundflow-player';
    playerEl.innerHTML = html;
    document.body.appendChild(playerEl);

    // Event listeners
    $('#sf-play', playerEl).addEventListener('click', togglePlayPause);
    $('#sf-next', playerEl).addEventListener('click', playNext);
    $('#sf-prev', playerEl).addEventListener('click', playPrev);
    $('#sf-shuffle', playerEl).addEventListener('click', toggleShuffle);
    $('#sf-repeat', playerEl).addEventListener('click', cycleRepeat);

    $('#sf-volume', playerEl).addEventListener('input', (e) => {
      state.volume = parseFloat(e.target.value);
      const media = getActiveMedia();
      if (media) media.volume = state.volume;
      const icon = state.volume === 0 ? '🔇' : state.volume < 0.5 ? '🔉' : '🔊';
      $('#sf-vol-btn', playerEl).textContent = icon;
    });

    $('#sf-toggle-collapse', playerEl).addEventListener('click', () => {
      playerEl.classList.toggle('sf-hidden');
      $('#sf-toggle-collapse', playerEl).textContent =
        playerEl.classList.contains('sf-hidden') ? '▲ SoundFlow' : '▼ SoundFlow';
    });

    // Progress bar seeking
    $('#sf-progress-wrap', playerEl).addEventListener('click', (e) => {
      const media = getActiveMedia();
      if (!media || !media.duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      media.currentTime = pct * media.duration;
    });

    // Start progress updater
    startProgressUpdater();
  }

  function updateUI() {
    if (!playerEl) return;

    const sound = state.sounds[state.currentIndex];
    const title = sound ? sound.name : 'SoundFlow – Ready';
    const meta = sound ? (sound.author || `Track ${state.currentIndex + 1} of ${state.sounds.length}`) : `${state.sounds.length} sounds detected`;

    $('#sf-title', playerEl).textContent = title;
    $('#sf-meta', playerEl).textContent = meta;
    $('#sf-play', playerEl).textContent = state.isPlaying ? '⏸' : '▶';
    $('#sf-badge', playerEl).textContent = `${state.sounds.length} sound${state.sounds.length !== 1 ? 's' : ''}`;

    // Shuffle active
    const shuffleBtn = $('#sf-shuffle', playerEl);
    shuffleBtn.classList.toggle('sf-active', state.shuffle);

    // Repeat state
    const repeatBtn = $('#sf-repeat', playerEl);
    const repeatIcons = { off: '🔁', all: '🔁', one: '🔂' };
    repeatBtn.textContent = repeatIcons[state.repeat];
    repeatBtn.classList.toggle('sf-active', state.repeat !== 'off');
  }

  function startProgressUpdater() {
    if (progressInterval) clearInterval(progressInterval);
    progressInterval = setInterval(() => {
      const media = getActiveMedia();
      if (!media) return;

      const pct = media.duration ? (media.currentTime / media.duration) * 100 : 0;
      const bar = $('#sf-progress-bar', playerEl);
      if (bar) bar.style.width = `${pct}%`;

      const timeEl = $('#sf-time', playerEl);
      if (timeEl) timeEl.textContent = `${formatTime(media.currentTime)} / ${formatTime(media.duration)}`;
    }, 250);
  }

  // ── Scanning & Observation ─────────────────────────────
  function scan() {
    const sounds = detectSounds();
    if (sounds.length !== state.sounds.length) {
      state.sounds = sounds;
      if (state.shuffle) generateShuffleOrder();
      updateUI();
    }
  }

  function startObserver() {
    if (observer) observer.disconnect();
    observer = new MutationObserver(() => {
      // Debounced rescan
      clearTimeout(observer._timer);
      observer._timer = setTimeout(scan, 800);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ── Init ───────────────────────────────────────────────
  function init() {
    // Check storage for enabled state
    chrome.storage?.local?.get?.(['soundflow_enabled'], (result) => {
      if (result && result.soundflow_enabled === false) {
        state.enabled = false;
        return;
      }
      boot();
    }) || boot();
  }

  function boot() {
    createPlayer();
    scan();
    startObserver();

    // Rescan periodically (TikTok loads dynamically)
    setInterval(scan, 3000);

    // Re-scan on URL change (SPA navigation)
    let lastUrl = location.href;
    const urlObserver = new MutationObserver(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        setTimeout(scan, 1000);
      }
    });
    urlObserver.observe(document.body, { childList: true, subtree: true });

    toast('🎵 SoundFlow loaded');
  }

  // Listen for messages from popup
  chrome.runtime?.onMessage?.addListener?.((msg, sender, sendResponse) => {
    if (msg.type === 'soundflow_toggle') {
      state.enabled = msg.enabled;
      if (state.enabled) {
        boot();
      } else {
        if (playerEl) { playerEl.remove(); playerEl = null; }
        if (observer) observer.disconnect();
        if (progressInterval) clearInterval(progressInterval);
      }
      sendResponse({ ok: true });
    }
    if (msg.type === 'soundflow_status') {
      sendResponse({
        enabled: state.enabled,
        soundCount: state.sounds.length,
        playing: state.isPlaying,
        currentSound: state.sounds[state.currentIndex]?.name || null,
      });
    }
  });

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

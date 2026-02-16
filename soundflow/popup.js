const toggle = document.getElementById('toggle');
const statusEl = document.getElementById('status');

// Load state
chrome.storage.local.get(['soundflow_enabled'], (result) => {
  toggle.checked = result.soundflow_enabled !== false;
});

// Toggle
toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ soundflow_enabled: enabled });

  // Notify active TikTok tab
  chrome.tabs.query({ url: '*://*.tiktok.com/*' }, (tabs) => {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, { type: 'soundflow_toggle', enabled }).catch(() => {});
    });
  });

  statusEl.textContent = enabled ? '✅ Enabled' : '⏸️ Disabled';
});

// Get status from active tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  if (tab && tab.url && tab.url.includes('tiktok.com')) {
    chrome.tabs.sendMessage(tab.id, { type: 'soundflow_status' }, (response) => {
      if (chrome.runtime.lastError || !response) {
        statusEl.textContent = 'Navigate to TikTok to start';
        return;
      }
      const { soundCount, playing, currentSound } = response;
      if (currentSound) {
        statusEl.textContent = `${playing ? '▶' : '⏸'} ${currentSound}\n${soundCount} sounds loaded`;
      } else {
        statusEl.textContent = `${soundCount} sounds detected`;
      }
    });
  } else {
    statusEl.textContent = 'Open TikTok.com to get started';
  }
});

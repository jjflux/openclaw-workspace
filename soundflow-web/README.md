# SoundFlow 🎵

Play TikTok sounds continuously like a Spotify playlist.

## What it does

SoundFlow is a PWA that lets you build a playlist of sounds from TikTok and play them back-to-back with full player controls.

## How to use

1. **Copy a TikTok video URL** (Share → Copy Link from the TikTok app)
2. **Paste it into SoundFlow** — it will attempt to extract the audio automatically
3. **If extraction fails**, use a third-party downloader (like [snaptik.app](https://snaptik.app) or [ssstik.io](https://ssstik.io)) to get a direct media URL, then paste that instead
4. **Build your playlist** and hit play!

## Features

- ▶️ Full playback controls (play/pause/next/prev)
- 🔀 Shuffle & 🔁 Repeat (off/all/one)
- 📊 Progress bar with seeking
- 🔊 Volume control
- 💾 Playlist saved to localStorage
- 📱 Mobile-responsive, PWA-installable
- 🎨 Dark TikTok-inspired UI
- 🎧 Media Session API (lock screen controls)

## Audio Extraction — Honest Assessment

### What works
- **Direct audio/video URLs**: Any direct link to an audio or video file will work perfectly. This is the most reliable method.
- **tikwm.com API**: The app tries this automatically for TikTok video URLs. It works sometimes but is unreliable — TikTok frequently changes their systems and these third-party services break often.

### What doesn't work
- **TikTok sound/music page URLs** (`/music/...`): These can't be extracted directly. You need to find a video that uses the sound and use that video's URL instead.
- **iframes**: TikTok blocks iframe embedding entirely.
- **cobalt.tools API**: Now requires JWT authentication, no longer free for anonymous use.
- **CORS**: Most TikTok CDN URLs have CORS restrictions. The tikwm.com API proxies around this, but direct TikTok CDN URLs won't play in-browser.

### Recommended workflow
The most reliable approach is a two-step process:
1. Copy TikTok video URL
2. Paste into a downloader site (snaptik.app, ssstik.io, etc.)  
3. Copy the direct download URL
4. Paste into SoundFlow

This is a limitation of TikTok's closed ecosystem — there's no public API for audio extraction that works reliably from the browser.

## Deploy

Drop this folder on [Netlify](https://netlify.com) or any static host. No build step needed.

```bash
# Or serve locally
npx serve .
```

## Tech

Single `index.html` with inline CSS/JS. No dependencies, no build tools.
- PWA with service worker + manifest
- localStorage for persistence
- Media Session API for OS-level controls
- Web Audio via standard `<audio>` element

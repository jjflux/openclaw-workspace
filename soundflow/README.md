# 🎵 SoundFlow – TikTok Sound Auto-Player

A Chrome extension that adds a floating music player to your TikTok saved sounds page, letting you auto-play through your collection.

## Features

- **Floating player UI** – Dark-themed player bar at the bottom of TikTok
- **Auto-play** – Automatically plays the next sound when one finishes
- **Shuffle & Repeat** – Shuffle mode + repeat off/all/one
- **Progress bar** – Click to seek, shows current time
- **Volume control** – Adjustable slider
- **Background playback** – Keeps playing in background tabs
- **Dynamic detection** – Uses MutationObserver to handle TikTok's SPA navigation

## Install (Developer Mode)

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the `soundflow/` folder
5. Navigate to your TikTok saved sounds page
6. The floating player appears at the bottom – hit ▶ to start!

## Usage

1. Go to **TikTok.com** → Your Profile → Favorites → Sounds
2. SoundFlow detects your saved sounds automatically
3. Use the floating player controls:
   - **▶ / ⏸** – Play/Pause
   - **⏮ / ⏭** – Previous/Next
   - **🔀** – Toggle shuffle
   - **🔁 / 🔂** – Cycle repeat (off → all → one)
4. Click the extension icon for a quick toggle on/off

## Tech Stack

- Chrome Manifest V3
- Content script + CSS injection
- MutationObserver for dynamic DOM detection
- No external dependencies

## Notes

- TikTok frequently changes their DOM structure. If sound detection stops working, the extension may need selector updates.
- Works best on the dedicated saved sounds page.
- Instagram support planned for a future release.

## License

MIT

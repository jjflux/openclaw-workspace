// SoundFlow – Background service worker (Manifest V3)
// Keeps extension alive and handles cross-tab communication

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ soundflow_enabled: true });
  console.log('SoundFlow installed');
});

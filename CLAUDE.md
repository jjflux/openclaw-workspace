# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is **Flux's workspace** — an OpenClaw-style persistent-agent setup, not a conventional code project. The root holds identity/memory/protocol files for a Claude agent ("Flux") who works for a human ("Jason"). The session-start ritual and behavioral rules live in `AGENTS.md` — **read it first**. This file only covers the Claude Code-specific concerns.

Each top-level subfolder is its own independent project (static sites and a Chrome extension); there is no monorepo tooling, no shared package manager, and no root build/test commands.

## Session-start protocol (from AGENTS.md)

Before doing anything, read in order:

1. `SOUL.md` — persona/values
2. `USER.md` — who Jason is
3. `memory/YYYY-MM-DD.md` for today and yesterday (raw daily logs)
4. `MEMORY.md` — long-term curated memory **(main session only — see security note below)**

If `BOOTSTRAP.md` still exists, it's stale (`IDENTITY.md` is already populated); the protocol says to delete it once identity is set.

## Security boundaries — important

- **`MEMORY.md` is main-session-only.** Per `AGENTS.md`, do NOT load it in shared/group contexts (Discord, group chats, sessions involving other people). It contains personal context that mustn't leak.
- **`TOOLS.md` contains live credentials** (ElevenLabs API key, voice IDs). Never paste its contents into external tools, web requests, commits to public remotes, or shared chats. Treat it as a secret store.
- The `.gitignore` only excludes `.netlify/` — there is no broader secret-hygiene safety net. Be deliberate about what you stage.
- Per `SOUL.md` / `AGENTS.md`: read/organize internally is free; anything that *leaves the machine* (emails, posts, deploys, external API calls beyond what's needed) requires asking first.

## Memory writing

- Daily raw logs → `memory/YYYY-MM-DD.md` (create if missing). `HEARTBEAT.md` makes the **10:00 PM PT end-of-day note mandatory** — Jason explicitly requested this.
- Curated long-term distillations → `MEMORY.md` (main session only).
- Heartbeat state, when used, lives in `memory/heartbeat-state.json`.

## Subprojects

All four are static or near-static; none have a JS build pipeline.

### `profluxlabs/website/` — the **Land More Calls** site
Folder name is misleading: this is the **Land More Calls** product site, not a ProFluxLabs site. ProFlux Labs is the parent agency; Land More Calls is the customer-facing brand/service. The homepage (`index.html`) title is "LandMore Calls — More Jobs. Less Chasing." and logo assets are `landmorecalls-*.svg/png`. Production domain is **landmorecalls.com**. **Note on dual branding:** the homepage and most public pages use **Land More Calls**, but `pricing.html` (and `pricing-internal.html`) are fully **ProFlux Labs**-branded — title, email (`jason@profluxlabs.com`), domain (`profluxlabs.com`), and Cal.com booking links (`cal.com/profluxlabs/demo`) all point to the agency brand. This may be intentional (B2B/internal sales page under the parent-agency brand) rather than stale. Don't auto-rebrand it without confirming intent.

Plain HTML/CSS, deployed to Netlify with **base directory = `profluxlabs/website`** (set in the Netlify dashboard, since `profluxlabs/website/netlify.toml` is nested rather than at repo root). Build: `publish = "."`, no build command. Production URL: **https://landmorecalls.com**. Auto-deploys on push to `origin/main` (GitHub `jjflux/openclaw-workspace`). Multiple `*.html` files = multiple routes (pricing, terms, privacy, testimonials, sms-signup, success, etc.). Edit HTML/CSS directly; preview by opening the file in a browser.

### `profluxlabs/` (non-website folders)
`outreach/`, `sales/`, `research/`, `youtube/`, `voice-training/`, `finances/`, `pricing/`, `system/`, `demo-website/` — these are **content/operations directories**, not code. Markdown docs, assets, and process notes for running the agency. Treat them as a knowledge base; don't try to "build" or "test" them.

### `personal-website/`
Single-page static site (`index.html` + `styles.css` + `script.js`) with personal photo assets. No build step — open `index.html` directly.

### `soundflow/`
Chrome extension (Manifest V3) that adds a floating player to TikTok's saved-sounds page. Content script + CSS injection, MutationObserver for SPA navigation, no external deps. To test:
1. Open `chrome://extensions/`, enable Developer Mode, click "Load unpacked", select this folder.
2. Visit TikTok → Profile → Favorites → Sounds.

### `soundflow-web/`
PWA version of soundflow — paste TikTok URLs and play extracted audio back-to-back. Static HTML/JS/CSS + `sw.js` service worker + `manifest.json`. Deployed to Netlify (`publish = "."`, no build). Honest limitation per its README: direct audio extraction is unreliable; users may need a third-party extractor like snaptik.app first.

## Conventions worth knowing

- **Subprojects are siloed.** Don't introduce cross-project shared code, monorepo tooling, or a root `package.json` unless explicitly asked — the workspace is intentionally a flat collection of independent things plus agent memory.
- **Static-first.** Default approach to new web work here is plain HTML/CSS/JS deployed to Netlify, not a framework. Don't reach for React/Next/Vite without a reason.
- **The agent files are living documents.** `SOUL.md`, `AGENTS.md`, `TOOLS.md`, `IDENTITY.md` are meant to be edited as the persona evolves — if you change `SOUL.md`, tell the human (it's the agent's "soul").
- **Platform formatting matters** (from AGENTS.md): no markdown tables on Discord/WhatsApp, no headers on WhatsApp, wrap Discord links in `<>` to suppress embeds.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. It auto-loads into every Claude Code session started in this folder — so any new session instantly knows the setup below.

**New session? Start here:** read this whole file, skim the "Current status & open items" below, then ask Jakob what he wants to work on. The infra (deploys, tracking, GHL) is all live — you're maintaining/extending, not building from scratch.

## 📍 Current status & open items
*(Keep this section updated as things change — it's how a fresh session knows what's pending.)*

**Live & working:** epoxy funnel + thank-you page, Meta pixel + server-side CAPI (Lead/Schedule/Purchase, all tested), GHL "1. New Lead" + "Booked Appointment" + "Closed sale → Purchase" workflows, closed-won loop.

**2026-08-26 — AI receptionist removed; Spartan case study added** (done in a separate Claude Code session on Jakob's Mac): nav link gone from index, `ai-receptionist.html` is now a redirect stub + forced 301→/ in `_redirects` (scott-testimonial also force-301s to the North Star page). New `case-study-spartan-coatings.html` (all type, no photos) + Spartan card on `/case-studies` + featured card on index testimonials. Numbers (57 appts in first 15 days / 10 of 20 territories / $150/appt / 60% close → ~$250 per sold job, ~14× at $3,500 avg ticket) — 57 came from Jakob's live lead-ops dashboard on 2026-08-26 and GROWS; refresh from lead-ops.onrender.com before editing. NOTE: a stale sibling repo `jjflux/profluxlabs-website` exists and was synced+updated the same day, but THIS repo is the only deploy source — ignore that one. `/pricing` still sells the old $295/mo receptionist offer (unlinked orphan) and the North Star case-study story still mentions the AI receptionist as part of Lead Lock — both left for Jakob to decide.

**Open / pending (most useful first):**
1. **Split the name on `epoxy.html`** — currently sends one `name` field → GHL first_name gets the full name → SMS reads "hey Firstname Lastname." Fix: send `first_name` + `last_name` separately, then map both in GHL.
2. **GHL: scope the "Remove from Workflow"** action (in the Booked workflow) to "1. New Lead" only, not "all workflows" (preventive — avoids nuking future nurtures).
3. **Ad optimization event** — make sure the Meta ad set optimizes for **`Lead`** (owner had to duplicate the ad set to change it). Switch to Schedule later once booking volume grows.
4. **Decide:** should the AI-bot nurture chase unqualified ($0–25k) leads? Webhook fires for all tiers by design. Add a `qualified = yes` trigger filter only if you want to exclude them.
5. **Optional:** map the 9 UTM keys to GHL custom fields (only for in-GHL ad-level reporting; Meta doesn't need it, GHL already captures Source/Campaign natively). Low priority.
6. **Homepage CTAs** point to `/book.html` (moved off `/quiz` for A2P widget verification) — restore to `/quiz` post-approval if desired.

**Reminder:** Claude Code has NO direct access to GoHighLevel or Meta dashboards — guide Jakob through those by hand (unless a GHL MCP gets set up).

## What this repo is

This is **Flux's workspace** — an OpenClaw-style persistent-agent setup. The root holds identity/memory/protocol files for a Claude agent ("Flux") working for the human ("Jason" / Jakob). Read `AGENTS.md` for the session ritual and behavioral rules. Beyond the agent files, the real day-to-day work is the **LandMore Calls website** in `profluxlabs/website/`.

## ⚙️ How deploys work (important — no Netlify access needed)

There is **no Netlify login or CLI involved.** The pipeline is pure git:

```
edit files → git commit → git push origin main → Netlify auto-deploys from GitHub
```

- **GitHub remote:** `git@github.com:jjflux/openclaw-workspace.git`, branch `main`
- **Netlify** is connected to that repo and **auto-publishes on every push to `main`.** Base directory = `profluxlabs/website`. Live at **https://landmorecalls.com**.
- To verify a deploy, `curl` the live site (e.g. `curl -s https://landmorecalls.com/epoxy | grep ...`). The Netlify CLI is NOT installed and is not needed.
- **Netlify env vars** (set in the Netlify dashboard, NOT in the repo): `META_PIXEL_ID`, `META_CAPI_TOKEN`. Changing them requires a redeploy to take effect.

## Business context

- **Brand:** LandMore Calls (customer-facing). **Legal entity:** ProFlux Labs LLC.
- Lead-gen agency. Primary active offer: **epoxy flooring** contractor lead-gen (pay-per-shown-appointment, targets $25k+/mo shops). Also an older concrete-coating quiz funnel.
- **Owner's cell** (for GHL notifications): `9254138554`
- **Design system:** `profluxlabs/BRAND.md` (main site: gold `#F0A500` + dark, Oswald + DM Sans). The epoxy funnel uses its own blue/Nunito system.

## Security boundaries

- **`MEMORY.md` is main-session-only** — don't load in shared/group contexts (per `AGENTS.md`).
- **`TOOLS.md` holds live credentials** (ElevenLabs key, etc.) — never paste into external tools, commits, or shared chats.
- The **Meta CAPI token** lives ONLY in Netlify env vars (`META_CAPI_TOKEN`) — never in the repo.
- `.gitignore` only excludes `.netlify/` — be deliberate about what you stage.

---

## The website — `profluxlabs/website/`

Plain static HTML/CSS/JS. No build step. Each `.html` is a route.

### Key pages
- `index.html` — homepage. **CTAs currently point to `/book.html`** (temporarily moved off `/quiz` during A2P chat-widget verification; restore to `/quiz` post-approval if desired).
- `epoxy.html` + `epoxy-thank-you.html` — **the main paid-ads funnel** (see below). Unlisted-ish (for ad traffic).
- `quiz.html` + `quiz-thank-you.html` — concrete-coating quiz funnel (5 steps).
- `case-studies.html`, `case-study-dc-electric.html` (Rob), `case-study-north-star-plumbing.html` (Scott).
- `ai-receptionist.html` — partner-built page.
- `book.html` — standalone GHL calendar embed.
- `vsl-review-elias.html` — unlisted VSL review page (noindex), video in `vsl/`.
- Legal: `privacy.html`, `terms.html`, `sms-signup.html`, `sms-terms.html`, `success.html`.
- `netlify/functions/meta-capi.js` — **serverless function**, the Meta Conversions API relay (see Tracking).

### The epoxy funnel (`epoxy.html`) — how it works
- 2-step form: **Step 1** revenue qualifier (`0-25` / `25-50` / `50+`) → **Step 2** contact (name/phone/email) → on submit, the GHL calendar reveals inline.
- **Everyone can book** (all revenue tiers see the calendar). The **Meta `Lead` pixel event fires ONLY for qualified ($25k+)** — gated by `if(qualified){ fireLeadPixel(contact); }`. The GHL webhook fires for ALL tiers (with a `qualified: yes/no` flag).
- On submit, `saveToGoHighLevel(contact)` POSTs the full payload to the GHL inbound webhook.
- **GHL inbound webhook (`GHL_WEBHOOK_URL`):** `https://services.leadconnectorhq.com/hooks/MAK3DATQKWj4NrGfnqSG/webhook-trigger/Q6ONO4WHKvQbRbCkejXR` → triggers the "1. New Lead" workflow.
- **GHL calendar (`GHL_CALENDAR_BASE`):** `https://api.leadconnectorhq.com/widget/booking/vlhhAVmm0RnenlMMEoRm`. GHL's `form_embed.js` auto-resizes the iframe. Calendar's post-booking redirect is set to `/epoxy-thank-you` (fires the Schedule event).
- **Webhook payload keys:** `name, phone, email, monthly_revenue, qualified, lead_type, fbp, fbc, utm_source, utm_medium, utm_campaign, utm_content, utm_term, ad_id, placement, fbclid, gclid, submitted_at, source`. All sent flat/top-level; tracking keys always sent (empty string if absent). See `TRACKING_KEYS` in the file.
- **Known open item:** the funnel maps a single `name` field to GHL's First Name → contacts get full name in first_name (SMS reads "hey Firstname Lastname"). Splitting into `first_name`/`last_name` on the page is a pending refinement.

## Meta tracking (pixel + CAPI) — LIVE and verified

- **Pixel ID:** `1557942752544196` (LandMore Calls "B2B" dataset). Hardcoded in `epoxy.html` + `epoxy-thank-you.html` (`META_PIXEL_ID`). Pixel is on ONLY those two pages.
- **Ad accounts:** `B2b` (`1250388558834327`) and `Lead gen`. Pixel connected to B2b.
- **Server-side CAPI:** `netlify/functions/meta-capi.js` relays events to Meta. Reads `META_PIXEL_ID` + `META_CAPI_TOKEN` from Netlify env; no-ops if unset. Endpoint: `https://landmorecalls.com/.netlify/functions/meta-capi`.
- **Events (browser pixel + CAPI, de-duplicated via shared `event_id`):**
  - `PageView` — page load
  - `Lead` — qualified ($25k+) form submit ONLY (gated by design)
  - `Schedule` — on `/epoxy-thank-you` (after booking)
  - `Purchase` — fired from GHL when a deal is marked Won (with `lead_value`)
- CAPI value parser strips `$`/commas (`$4,600.00` → `4600`).
- **Ad optimization:** optimize the ad set for the **`Lead`** event (not Schedule/Purchase yet — too little volume early). Switch to Schedule once booking volume is high, Purchase once deals close.

## GoHighLevel setup (owner manages in GHL dashboard — Claude Code can't access GHL directly)

- **"1. New Lead" workflow** — trigger: Inbound Webhook (the epoxy URL). Actions: **Create/Update Contact** (maps `name`/`phone`/`email`) → **Update Contact Field** (maps `monthly_revenue`, `fbp`, `fbc`; UTMs NOT mapped — optional) → Create Opportunity (EPOXY pipeline) → Internal Notification (SMS to owner) → 3-min wait → SMS nurture with AI bot "Jack". The 3-min wait lets bookers get pulled out before the nurture texts fire.
- **"Booked Appointment" workflow** — trigger: Customer Booked Appointment → CALL BOOKED internal SMS with appointment time + contact info. Has a "Remove from Workflow" action (ideally scoped to "1. New Lead" only).
- **"Closed sale Facebook tracking webhook" workflow** — trigger: Opportunity status = **Won**, pipeline EPOXY → Custom Webhook POST to `meta-capi` with a `Purchase` event + `{{opportunity.lead_value}}`. Set the deal's $ value before marking Won.
- **Custom fields:** Monthly Revenue, Facebook Browser ID, Facebook Click ID.
- **EPOXY pipeline stages:** New Lead, Contacted, Scheduled, Reschedule, (Closed).
- GHL merge fields: use `{{inboundWebhookRequest.X}}` in webhook-triggered workflows (reads the payload directly, avoids contact-record timing blanks); `{{contact.X}}` only reads reliably once the contact record exists.
- **Note:** Claude Code has NO access to GHL or Meta dashboards — it guides the owner through those by hand. A GHL MCP could change this (not currently set up).

## Conventions
- **Static-first.** Plain HTML/CSS/JS deployed via git push → Netlify. No frameworks without a reason.
- **Verify deploys via `curl`** against landmorecalls.com, not Netlify tooling.
- **Commit + push** after meaningful changes (auto-deploys). Keep commit messages descriptive.
- Large binaries (video): compress before committing — GitHub rejects files >100MB (`vsl/elias-vsl.mp4` is an 81MB compressed example).
- Agent files (`SOUL.md`, `AGENTS.md`, `TOOLS.md`, `IDENTITY.md`) are living documents — if you change `SOUL.md`, tell the human.

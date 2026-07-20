# Epoxy Funnel — Setup Guide

The paid-ads landing funnel for concrete coating / epoxy contractors. Everything's already built and live — this doc is the "fill in the 4 blanks" checklist so the leads, calendar, and pixel actually fire.

## The pages

| URL | File | Purpose |
|---|---|---|
| `landmorecalls.com/epoxy` | `epoxy.html` | The funnel. 2-step qualifier → inline calendar (qualified) or "on our radar" (unqualified). |
| `landmorecalls.com/epoxy-thank-you` | `epoxy-thank-you.html` | Post-booking confirmation. GHL calendar redirects here after someone books. |

Both are set to `noindex,nofollow` and are **not linked anywhere** on the main site — the only way in is the ad link. That's the "can't be normally accessed" part; nobody stumbles onto it.

---

## What you need to fill in (4 things)

All four live in clearly-marked spots at the **top of the `<script>` in `epoxy.html`** (plus the pixel ID in `<head>`). Tell me the values and I'll paste them in + push — or edit them yourself.

### 1. GoHighLevel inbound webhook — `GHL_WEBHOOK_URL`

This is where the lead gets saved. **Make a NEW webhook for this funnel** (don't reuse the quiz one — you want epoxy leads on their own workflow with their own tags).

- In GHL: **Automation → Workflows → + Create Workflow → Start from scratch**
- Add trigger: **Inbound Webhook** → copy the URL it gives you
- Paste that URL into `GHL_WEBHOOK_URL` in `epoxy.html`
- Fire a test (fill the form once) so GHL captures the field schema, then map fields

**Payload the webhook receives:**
```json
{
  "name": "James Carter",
  "phone": "(555) 123-4567",
  "email": "james@example.com",
  "monthly_revenue": "25-50",        // "0-25" | "25-50" | "50+"
  "qualified": "yes",                // "yes" | "no"
  "lead_type": "epoxy_funnel",
  "utm_source": "facebook",
  "utm_medium": "paid",
  "utm_campaign": "...",
  "utm_content": "...",
  "utm_term": "...",
  "fbclid": "...",
  "submitted_at": "2026-06-…Z",
  "source": "epoxy_lp_v1"
}
```

**Field mapping in GHL** (create these as custom fields once, like we did for the quiz):
- `name` → First/Last Name · `phone` → Phone · `email` → Email
- `monthly_revenue` → dropdown custom field (values `0-25`, `25-50`, `50+`)
- `qualified` → tag it instead: **If `qualified = yes` → Add Tag "Epoxy Qualified"**, else **"Epoxy Unqualified"**
- `utm_*` / `fbclid` → custom fields or just let them ride on the contact for attribution
- Add Tag "Epoxy Funnel" to everyone so you can filter this source

**Important:** the webhook fires for BOTH qualified and unqualified leads (you asked to still be able to work the unqualified ones manually). The pixel is what's conditional, not the save.

### 2. GoHighLevel calendar embed — `GHL_CALENDAR_BASE`

The calendar that shows inline after someone qualifies. Right now it defaults to your existing `demo-jakob` booking widget so it works immediately, but you probably want a **dedicated "Epoxy Discovery Call" calendar** so those bookings are separate.

- In GHL: **Calendars → + Create Calendar** (15-min discovery call)
- Get its embed/booking URL (looks like `https://api.leadconnectorhq.com/widget/bookings/YOUR-SLUG`)
- Paste it into `GHL_CALENDAR_BASE` in `epoxy.html`
- **Set the calendar's post-booking redirect** to `https://landmorecalls.com/epoxy-thank-you` (Calendar settings → Confirmation → Redirect to URL). That's how people land on the thank-you page after booking.

The funnel automatically prefills the calendar with the name/phone/email they just typed, plus passes the UTMs through — so booking is one click and attribution survives.

### 3. Meta Pixel — `META_PIXEL_ID`

Two files have a `META_PIXEL_ID = ''` line near the top (`epoxy.html` and `epoxy-thank-you.html`). Put the **same** pixel ID in both.

- Get your pixel ID: **Meta Events Manager → Data Sources →** your pixel → the numeric ID
- Paste it into both files' `META_PIXEL_ID`

**What fires where (this is the important part you asked about):**
- **PageView** — fires on both pages for everyone (standard).
- **Lead** — fires on `epoxy.html` **only when someone qualifies** (revenue ≠ `$0–$25k`), right before the calendar shows. Under-25k people get saved to GHL but the Lead pixel does **not** fire. ✅ exactly what you asked for.
- **Schedule** — fires on `epoxy-thank-you.html` when they actually book (optional but recommended — it's a stronger conversion signal than Lead). Already wired; activates as soon as the pixel ID is set.

**Recommended Meta optimization:** optimize your ad set for the **Lead** event. That teaches Meta to find people who qualify (25k+), not just anyone who fills the form. The `Schedule` event later tells you booking rate.

### 4. Testimonial images (optional, do anytime)

The proof section has 6 placeholder tiles. When you have real screenshots/selfies/before-afters, drop the files in `profluxlabs/website/case-studies/` and I'll swap each placeholder for a real `<img>`. Until then the placeholders render as labeled gray tiles — fine for launch, better with real proof.

---

## UTM parameters — how they work (you asked)

UTMs are just tags you add to the end of your ad's link so you know **where a lead came from**. Example ad URL:

```
https://landmorecalls.com/epoxy?utm_source=facebook&utm_medium=paid&utm_campaign=epoxy-spring&utm_content=video-a
```

- `utm_source` — the platform (facebook, instagram, google)
- `utm_medium` — the type (paid, cpc, email)
- `utm_campaign` — which campaign (epoxy-spring, retargeting-jan)
- `utm_content` — which specific ad/creative (video-a, image-b) — great for A/B testing
- `utm_term` — keyword, if running search

**You don't build these by hand.** Use Meta's built-in fields or Google's [Campaign URL Builder](https://ga-dev-tools.google/campaign-url-builder/). In Meta Ads Manager, at the ad level there's a **"URL parameters"** box — paste:
```
utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&fbclid={{fbclid}}
```
Meta auto-fills the `{{...}}` per ad. The funnel captures whatever's in the URL, remembers it across both form steps, and ships it to GHL with the lead — so in your CRM you can see exactly which ad/creative produced each booked call.

`fbclid` (Facebook click ID) is captured automatically too — it's what lets Meta match an offline booking back to the ad click if you ever set up the Conversions API.

---

## Keeping the page hidden

- It's `noindex,nofollow` (won't show in Google) and unlinked (not in nav/sitemap). That's the standard, correct setup for a paid LP.
- If you want it **truly gated** (password), Netlify supports it: Site config → Visitor access → Password protection. **Don't** do this for a cold-ad LP — a password wall kills ad conversion. Only gate it if it's for a specific private audience.

---

## Launch checklist

- [ ] Create GHL workflow + inbound webhook → paste URL into `GHL_WEBHOOK_URL`
- [ ] Map webhook fields + add the qualified/unqualified tags in the workflow
- [ ] Create the Epoxy Discovery Call calendar → paste URL into `GHL_CALENDAR_BASE`
- [ ] Set that calendar's redirect to `/epoxy-thank-you`
- [ ] Paste Meta Pixel ID into BOTH `epoxy.html` and `epoxy-thank-you.html`
- [ ] In Meta Events Manager, confirm `Lead` and `Schedule` show up after a test run
- [ ] Add UTM params to your ad links (or Meta URL parameters box)
- [ ] Test the full flow: qualified (should show calendar + fire Lead) AND unqualified (should show "on our radar", NO Lead, but still lands in GHL)
- [ ] (optional) Send real testimonial images to swap the 6 placeholders

Once you have the webhook URL, calendar URL, and pixel ID, send them over and I'll wire all three in one commit.

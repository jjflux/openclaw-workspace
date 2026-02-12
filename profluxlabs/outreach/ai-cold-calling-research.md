# AI Cold Calling Research — February 2026

> Can we use AI to make outbound cold calls to roofer prospects? Here's the full breakdown.

---

## THE PLATFORMS

### 1. Bland AI
- **What it does:** Outbound + inbound AI voice agents. Can make thousands of calls/hour.
- **Pricing:** $0.09/min outbound, $0.04/min inbound, $15/mo per number
- **Pros:** Massive scale (20,000+ calls/hour), API-first, customizable prompts
- **Cons:** Requires developer skills, 800ms+ latency reported, can sound robotic
- **GHL Integration:** Via Zapier/webhook — not native, but doable
- **Best for:** High-volume outbound campaigns at scale

### 2. Synthflow AI
- **What it does:** No-code AI voice agents for inbound/outbound calling
- **Pricing:** Starts ~$29/mo + per-minute costs, flat-rate plans available
- **Pros:** No-code builder, natural-sounding voices, predictable pricing, easy setup
- **Cons:** Newer platform, less battle-tested at massive scale
- **GHL Integration:** Native GHL integration available
- **Best for:** Agency owners who want quick setup without coding

### 3. Vapi
- **What it does:** Developer platform for building voice AI agents
- **Pricing:** ~$0.05/min + model costs + phone provider costs
- **Pros:** Sub-600ms latency (fastest), modular/flexible, great voice quality
- **Cons:** Developer-heavy, pricing can be complex with stacked costs
- **GHL Integration:** Via API/webhooks
- **Best for:** Technical users who want maximum control

### 4. Retell AI
- **What it does:** Voice agents with human-like responsiveness and emotion
- **Pricing:** $0.07/min, HIPAA-compliant option
- **Pros:** Very natural voices, interruptible (feels like real conversation), good UX
- **Cons:** Smaller scale than Bland, mid-tier pricing
- **GHL Integration:** Via API/Zapier
- **Best for:** Quality over quantity — inbound customer service, appointment setting

### 5. Air AI
- **What it does:** Claims fully autonomous AI phone agents for sales
- **Pricing:** Custom/enterprise pricing (not transparent)
- **Pros:** Markets itself as "the world's first AI that can have 10-40 minute phone calls"
- **Cons:** Controversial reviews, some claim overpromised results, opaque pricing
- **GHL Integration:** Limited/unclear
- **Best for:** Skip this one for now — too many red flags

---

## COST ANALYSIS

For ProFluxLabs outbound prospecting (100 calls/day, avg 2 min each):

| Platform | Monthly Cost (est.) |
|---|---|
| Bland AI | ~$540/mo (200 min/day × 30 × $0.09) |
| Synthflow | ~$300-500/mo (depends on plan) |
| Vapi | ~$300-400/mo (varies with model costs) |
| Retell AI | ~$420/mo (200 min/day × 30 × $0.07) |

**Bottom line:** $300-550/mo for 100 AI calls per day. That's cheap if it books even 2-3 demos/month.

---

## LEGAL REALITY — THIS IS THE BIG ONE ⚠️

### FCC Ruling (February 2024)
The FCC unanimously ruled that **AI-generated voice calls are "artificial voices" under the TCPA** (Telephone Consumer Protection Act). This means:

- **AI cold calls to cell phones require PRIOR EXPRESS WRITTEN CONSENT** — the same rules as robocalls
- Calling someone cold with an AI voice = potential TCPA violation
- Penalties: **$500-$1,500 PER CALL** in statutory damages
- The FCC is actively proposing additional rules requiring **in-call disclosure** that AI is being used

### What This Means for Us
- **You CANNOT legally use AI to cold call prospects who haven't opted in**
- This applies to outbound sales calls where the AI is doing the talking
- Even if the AI sounds human, if it's AI-generated, it falls under TCPA
- Some platforms market outbound calling but leave the legal risk to YOU

### The Gray Areas
- **AI-assisted dialing (human talks, AI dials):** Legal — power dialers are fine
- **AI for inbound calls (prospect calls you):** Legal — they initiated contact
- **AI for follow-up with opted-in leads:** Legal — if they gave written consent
- **AI for appointment confirmation/reminders:** Generally legal with proper consent

---

## REALISTIC ASSESSMENT

### What's Viable TODAY ✅
1. **AI for INBOUND calls** — Prospect calls your number, AI answers, qualifies, books appointment. This is 100% legal and the tech works well. Synthflow + GHL is the move here.
2. **AI-powered power dialer** — AI dials the numbers, but YOU (Jason) do the talking. Use tools like Kixie, PhoneBurner, or GHL's built-in dialer.
3. **AI follow-up for warm leads** — Someone fills out a form or texts back? AI can call them to book the appointment. They opted in.
4. **AI voicemail drops** — Some tools let you drop pre-recorded voicemails without the phone ringing (ringless voicemail). Legal gray area but widely used.

### What's NOT Viable Yet ❌
1. **Fully autonomous AI cold calling strangers** — Legal minefield. Don't do it.
2. **AI pretending to be human on cold calls** — Double illegal (TCPA + potential FTC deception issues)

### The Play for ProFluxLabs
**Phase 1 (NOW):** Jason makes cold calls manually using a power dialer. Use AI to leave voicemails, send follow-up texts, and handle inbound calls.

**Phase 2 (3-6 months):** As leads opt in through email/DM outreach, use AI to call warm leads who've engaged. Synthflow or Retell + GHL.

**Phase 3 (Future):** If/when regulations clarify, explore outbound AI calling with proper consent frameworks. The tech is ready — the law isn't.

---

## RECOMMENDED STACK

| Use Case | Tool | Cost |
|---|---|---|
| Manual cold calling (dialer) | GHL Power Dialer or Kixie | $30-95/mo |
| AI inbound call handling | Synthflow + GHL | ~$100-300/mo |
| AI warm lead follow-up | Synthflow or Retell | ~$100-200/mo |
| Voicemail drops | Drop Cowboy or Slybroadcast | $20-50/mo |

**Total for the smart/legal approach: ~$250-650/mo**

---

## TL;DR

The AI voice calling tech is INCREDIBLE right now — Synthflow, Vapi, and Retell can all hold natural conversations. But **the law hasn't caught up.** Using AI to cold call strangers without consent is a TCPA violation with $500-$1,500 per call penalties. 

**The move:** Use AI for inbound + warm follow-up (legal and effective). Cold call manually with a power dialer. Let the regulations evolve, and be ready to flip the switch when they do.

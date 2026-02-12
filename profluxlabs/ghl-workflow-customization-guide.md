# GHL Workflow Customization Guide — Roofer Pro Template
## Copy-Paste Ready for Each Workflow

> **How to use:** Open each workflow → click the action step → paste the message → save.
> Replace `{{contact.first_name}}` and `{{location.name}}` — GHL auto-fills these.

---

## 1. Recipe - Auto Missed Call Text-Back ✅

This one's already built with trigger + steps. Just customize the messages:

### SMS to Lead (click the "SMS to Lead" action):
```
Hey {{contact.first_name}}! Sorry we missed your call — we're probably up on a roof right now 🏠

How can we help? Just reply here and we'll get right back to you, or we'll call you back ASAP.

— {{location.name}}
```

### Add Contact Tag:
Set tag to: `missed-call`

### Assign to User:
Set to the business owner's user account (this is why it has the ⚠️ — needs a user selected)

### Push Notification to Assigned User:
```
🚨 MISSED CALL from {{contact.first_name}} {{contact.last_name}} ({{contact.phone}}) — Auto text-back sent. Call them back!
```

### Internal SMS to Assigned User:
```
Missed call from {{contact.first_name}} {{contact.last_name}} ({{contact.phone}}). Text-back was auto-sent. Call them back when you can!
```

---

## 2. Fast 5-Min Lead Follow-Up (Form Submission)

### Trigger:
Should already be: Form Submitted. You can also add triggers for:
- Contact Created
- Tag Added → `new-lead`

### SMS 1 — Instant (0 delay):
```
Hey {{contact.first_name}}! Thanks for reaching out to {{location.name}}. We got your info and someone from our team will be in touch very soon.

Quick question — are you dealing with a leak or damage, or looking for a new roof? Just reply and we'll get you taken care of fast 🏠
```

### SMS 2 — After 5 min wait:
```
Hey {{contact.first_name}}, just saw your inquiry come through — wanted to personally reach out. Would you like to schedule a free inspection? We can usually get out there within a day or two.

What day works best for you?
```

### SMS 3 — After 1 hour wait:
```
Hi {{contact.first_name}}, just following up! We specialize in roof repairs and replacements, and we'd love to come take a look.

Our inspections are 100% free with no obligation. Want me to check our schedule for you?
```

### SMS 4 — After 1 day wait:
```
Good morning {{contact.first_name}}! Just checking in from {{location.name}}.

We've helped hundreds of homeowners with their roofing needs. I'd hate for you to have an issue that gets worse — want to set up that free inspection?

Takes about 30 minutes and you'll know exactly where your roof stands 👍
```

### SMS 5 — After 3 day wait:
```
{{contact.first_name}}, quick update — we've had a few cancellations this week so we have some openings for free roof inspections.

Want me to grab one of those spots for you before they fill up?
```

### SMS 6 — After 7 day wait (final / breakup):
```
Hey {{contact.first_name}}, this is my last follow-up — I don't want to be a pest! 😄

If you still need roofing help down the road, we're here. Just save this number and text us anytime.

Have a great week!
— {{location.name}}
```

### Exit Conditions (add under Settings):
Stop the workflow when:
- Contact replies to any SMS
- Contact books an appointment
- Tag `contacted` is added
- Contact moves to "Contacted" pipeline stage or beyond

---

## 3. Appointment Confirmation & Reminder Texts

### Trigger:
Appointment Status → Confirmed/New (in any calendar)

### SMS — Booking Confirmation (immediate):
```
Awesome, you're all set {{contact.first_name}}! 🎉

Your free roof inspection is booked:
📅 {{appointment.start_date}}
⏰ {{appointment.start_time}}
📍 {{contact.address1}}

We'll be there right on time. If anything changes, just reply here to reschedule.

— {{location.name}}
```

### SMS — 24 Hours Before:
```
Hey {{contact.first_name}}! Just a reminder — we've got your roof inspection tomorrow at {{appointment.start_time}}.

We're looking forward to it! Anything we should know before we come out?
```

### SMS — 2 Hours Before:
```
Hi {{contact.first_name}}! Our team is getting ready to head your way for your {{appointment.start_time}} inspection. See you soon! 🏠
```

### SMS — 30 Minutes Before (optional):
```
Hey {{contact.first_name}}, we're about 30 minutes out! See you shortly 👍
```

---

## 4. Post-Job Review Request (Customer Feedback)

### Trigger:
- Pipeline Stage Changed → "Won"
- OR Tag Added → `job-completed`

### Wait: 1 day

### SMS 1 — Satisfaction Check:
```
Hey {{contact.first_name}}! It's the team from {{location.name}}.

We just finished up your roof and wanted to check in — how did everything go? Are you happy with the work?

Just reply and let us know! 😊
```

### If Positive Reply → SMS 2 (Google Review Request):
```
That's awesome to hear, {{contact.first_name}}! We really appreciate that 🙏

Would you mind taking 30 seconds to leave us a Google review? It really helps other homeowners find us.

👉 [PASTE GOOGLE REVIEW LINK HERE]

Thank you so much — it means the world to our team!
```

### If No Reply After 2 Days → SMS 3 (Nudge):
```
Hi {{contact.first_name}}! Just checking in on your new roof — hope you're loving it! 🏠

If you've got 30 seconds, we'd really appreciate a quick Google review. It helps us keep serving great homeowners like you.

👉 [PASTE GOOGLE REVIEW LINK HERE]

Thanks! 🙏
```

### If Negative Reply → Internal Notification:
```
⚠️ UNHAPPY CUSTOMER ALERT

{{contact.first_name}} {{contact.last_name}} ({{contact.phone}}) responded negatively to the satisfaction check.

CALL THEM PERSONALLY ASAP to resolve before this becomes a bad review.
```

---

## 5. Missed Appointment Follow-Up (Reschedule)

### Trigger:
Appointment Status → No Show / Cancelled

### SMS 1 — Immediate:
```
Hey {{contact.first_name}}, we noticed we missed you today! No worries at all — things come up.

Would you like to reschedule your roof inspection? We've got openings this week. Just reply with a day that works!
```

### Wait 1 day → SMS 2:
```
Hi {{contact.first_name}}, just following up — we'd still love to get your free roof inspection on the books. It only takes about 30 minutes.

Want me to find a time that works for you?
```

---

## 6. Inactive Leads Re-Engagement

### Trigger:
Contact hasn't replied in 30+ days (use "Stale Opportunities" trigger or manual tag)

### SMS 1:
```
Hey {{contact.first_name}}! It's {{location.name}}. We reached out a while back about your roof — just wanted to check if you still need any help.

Whether it's a repair, replacement, or just a free inspection, we're here when you're ready. Just reply and we'll get you taken care of 👍
```

### Wait 7 days → SMS 2:
```
{{contact.first_name}}, quick heads up — storm season is coming and now's the best time to get your roof checked before any damage hits.

Our inspections are free and take about 30 min. Want us to swing by? 🏠
```

---

## 7. Long-Term Education & Value Follow-Ups

### Trigger:
Contact enters "Follow-Up" pipeline stage

### Month 1 SMS:
```
Hey {{contact.first_name}}! Quick roofing tip from {{location.name}}: Check your gutters this month — clogged gutters can cause water to back up under your shingles and cause leaks.

Need help? We're always just a text away 👍
```

### Month 2 SMS:
```
{{contact.first_name}}, did you know most roof warranties require regular inspections? If it's been more than a year since your last one, we'd be happy to come take a look — free of charge.

Just reply if you'd like to schedule one!
```

### Month 3 SMS:
```
Hey {{contact.first_name}}! Seasonal reminder from {{location.name}} — if you've noticed any missing shingles, water stains on your ceiling, or higher energy bills, your roof might need attention.

We offer free inspections — just text us to book one 🏠
```

---

## 8. Voice AI Flashcard Summary
This is a GHL internal tool — skip customizing for now.

---

## Workflows You Can DELETE (duplicates from the automated build):

Go to Back → Workflow List (outside the Marketing Workflows folder) and delete these 4 empty shells since the pre-built templates above replace them:

- ❌ Missed Call Text-Back (empty shell)
- ❌ New Lead Follow-Up Sequence (empty shell)
- ❌ Appointment Reminder Sequence (empty shell)
- ❌ Review Request Automation (empty shell)

---

## Per-Client Customization Checklist

When deploying to a real client, customize these:
- [ ] Replace `{{location.name}}` test data with client's business name
- [ ] Set "Assign to User" in missed call workflow to client's owner account
- [ ] Paste client's Google Review link in review request workflow
- [ ] Adjust calendar availability to match client's hours
- [ ] Add client's phone number to GHL (Twilio)
- [ ] Connect client's email (SMTP)
- [ ] Set pipeline stage triggers to match the "Roofing Sales Pipeline"
- [ ] Test each workflow with a dummy contact before going live
- [ ] Toggle all workflows from Draft → Publish when ready

---

*Built by ProFluxLabs ⚡*

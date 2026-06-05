# LandMore Calls — Brand & Design System

A reference for generating on-brand assets (ads, social, logos, thumbnails, presentations, anything visual). Pulled directly from the live site's design tokens.

---

## TL;DR — paste this into any image generator

> **Brand:** LandMore Calls — performance-marketing for home-service contractors, by ProFlux Labs LLC.
> **Visual style:** modern editorial × direct-response × industrial. High contrast. Black background with gold accents. Hard 90° edges, generous whitespace, sharp uppercase display typography. Photography is real, candid, warm natural light — never stock-looking.
> **Palette:** charcoal black `#18181A`, gold `#F0A500`, warm white `#FAF8F4`, with semantic red `#C8341B` for warnings and green `#1F8A4C` for confirmations.
> **Fonts:** Oswald (display, uppercase, tight letter-spacing) + DM Sans (body).
> **Tone:** direct, plainspoken, contractor-friendly. No corporate fluff, no hype emojis, no rocket ships.

---

## Color Palette

| Role | Hex | RGB | When to use |
|---|---|---|---|
| **Primary background** | `#18181A` | 24, 24, 26 | Dark sections, hero backgrounds, body bg on most pages |
| **Background shade** | `#111113` | 17, 17, 19 | Slightly darker bg for layered sections / footers |
| **Deep black** | `#0a0a0c` | 10, 10, 12 | Deepest bg layer (phone lock screen, etc.) |
| **Card black** | `#1F1F21` | 31, 31, 33 | Card bg, input bg, elevated surfaces on dark |
| **Border dark** | `#2A2A2C` | 42, 42, 44 | Hairline borders, dividers on dark |
| **Border darker** | `#3A3A3C` | 58, 58, 60 | Stronger borders, ghost button outlines |
| **🟡 Primary accent — Gold** | `#F0A500` | 240, 165, 0 | The brand color. CTAs, highlights, headlines emphasis, logo mark, dataviz highlights |
| **Gold dark (hover)** | `#C88B00` | 200, 139, 0 | CTA hover state, gold gradient endpoints |
| **Gold soft** | `rgba(240,165,0,0.08)` | — | Selected/active background tint |
| **Gold edge** | `rgba(240,165,0,0.35)` | — | Soft gold borders / outlines |
| **Warm white** | `#FAF8F4` | 250, 248, 244 | Primary text on dark, light section bg |
| **Paper** | `#F5F0E8` | 245, 240, 232 | Cream interlude bg, lighter warm tone |
| **Mid gray** | `#F0EDE8` | 240, 237, 232 | Secondary card bg on light sections |
| **Border light** | `#E8E4DE` | 232, 228, 222 | Hairlines on light sections |
| **Muted light** | `#5A5552` | 90, 85, 82 | Body text on light bg |
| **Muted dark** | `#A09A93` | 160, 154, 147 | Body text on dark bg (secondary) |
| **Text dim** | `#7A7570` | 122, 117, 112 | Caption / fine print |
| **Ink soft** | `#3A3631` | 58, 54, 49 | Strong text on cream/light bg |
| **🔴 Red (semantic)** | `#C8341B` | 200, 52, 27 | "Before" / wrong / lost / warning. Never used as brand color, only semantic |
| **🟢 Green (semantic)** | `#1F8A4C` | 31, 138, 76 | "After" / right / won / confirmed. Same rule — semantic only |

**Forbidden:** purple, hot pink, electric blue, neon anything, gradient backgrounds, pastels.

---

## Typography

### Fonts (Google Fonts, free)

- **Oswald** — display / headlines / labels. Weights: 400, 500, 600, 700.
- **DM Sans** — body / paragraphs / UI. Weights: 300, 400, 500, 600. Italic 400 occasionally.

```html
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
```

### Hierarchy

| Element | Font | Weight | Size (desktop) | Style notes |
|---|---|---|---|---|
| H1 hero | Oswald | 700 | 72–120px | **UPPERCASE**, letter-spacing -0.01em, line-height 0.92–1.05 |
| H2 section | Oswald | 700 | 44–60px | **UPPERCASE**, letter-spacing -0.005em |
| H3 sub-section | Oswald | 600 | 22–38px | UPPERCASE or sentence case, line-height 1.1 |
| Eyebrow / tag | Oswald or DM Sans | 500–600 | 11–12px | **UPPERCASE**, letter-spacing 0.14–0.22em, often gold |
| Body paragraph | DM Sans | 400 | 15–17px | line-height 1.6–1.75 |
| Lede (intro paragraph) | DM Sans | 400 | 18–20px | line-height 1.55 |
| Caption / fine | DM Sans | 400 | 11–13px | color: text-dim |
| Number / stat | Oswald | 700 | 28–96px | tabular-nums, often gold |

**Style rule:** display copy is almost always UPPERCASE with tight letter-spacing. Body copy is sentence case. Numbers go big and gold.

---

## Logo

### The mark (32×32 viewBox)

Gold square with black quarter-circle arc + two dots. Visual metaphor: phone signal radiating from a handset, or two endpoints connected by a curve.

SVG:
```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="#F0A500"/>
  <path d="M8 22 C8 14 14 8 22 8" stroke="#18181A" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <circle cx="22" cy="22" r="3.5" fill="#18181A"/>
  <circle cx="8" cy="8" r="3.5" fill="#18181A"/>
</svg>
```

### The wordmark

Two-line lockup, right of the mark:

```
LANDMORE      (Oswald 700, 18px, color: #FAF8F4 on dark / #18181A on light)
CALLS         (Oswald 400, 12px, color: #F0A500, letter-spacing: 0.15em)
```

**Spacing:** mark + 10px gap + wordmark. Vertical center aligned.

### Logo rules

- **DO** use the gold mark on any background. On gold backgrounds, swap the inner arc/dots from black to white.
- **DO** keep mark + wordmark together in the lockup.
- **DO** use the LandMore Calls wordmark in editorial copy — always two words, capitalized "LandMore" or "LANDMORE." Never "Landmore," "Land More," or "LMC" abbreviated.
- **DON'T** add a tagline, glow, gradient, or drop shadow to the mark.
- **DON'T** put the mark inside a circle, rounded square, or other container shape.
- **DON'T** scale the mark below 24px or above its original proportions get pixelated.

---

## Visual personality

| Be… | Don't be… |
|---|---|
| Industrial editorial — Wired meets a contractor magazine | Corporate generic — Salesforce stock |
| Hard 90° corners and sharp shapes | Rounded blob shapes / bubble UI |
| High contrast, dark mode-first | Light/airy SaaS marketing site |
| Real candid photography (contractors mid-job, real phones, real trucks) | Smiling stock models in fake offices |
| Bold typographic statements | Wall-to-wall body copy |
| Charts, numbers, before/after data | Vague growth claims with no proof |
| One accent color (gold) used purposefully | Rainbow palettes, neon glows, gradients |
| Direct copy: "Stop missing calls. Start closing jobs." | Hypey copy: "Unlock your potential 🚀✨" |

### Photography style

- **Subjects:** real concrete coating contractors (40s–60s, salt-of-the-earth), garage floors mid-application, before/after splits, trucks with logos, hands holding phones, calendar screenshots.
- **Lighting:** warm natural daylight, golden hour, garage shop fluorescents (acceptable), never harsh studio.
- **Composition:** mid-shots, candid, mild documentary feel. Slight grain OK.
- **Avoid:** white-background isolated product shots, AI-generic faces with too-perfect skin, suits in corporate boardrooms, anything with "AI receptionist" hands-on-keyboard cliché.

### Voice & tone (for copy)

- **Tone:** direct, plainspoken, slightly skeptical-of-other-agencies. Like talking to a contractor at a job site, not a CEO.
- **Pronouns:** "we" for LandMore Calls, "you" for the reader. Never "our team" or "our experts."
- **Verbs:** active. "We rebuild your ads. You close more jobs." Not "leads will be generated by our system."
- **Numbers:** always specific. "$56K/mo" not "significant revenue." "From #20 to #2" not "improved ranking."
- **Avoid:** "synergy," "leverage," "unlock," "elevate," "robust," "best-in-class," ✨🚀🎯 emojis, "founder coach" cringe.

---

## Component patterns (visual cues for AI to mimic)

- **CTA buttons:** gold (`#F0A500`) bg, black text, Oswald 600 UPPERCASE, letter-spacing 0.08–0.1em, ~18px padding, 0–10px border-radius. Hover → gold-dark.
- **Section eyebrows:** small gold uppercase tracked text (12px Oswald) preceded by a 36px horizontal gold line.
- **Cards:** card-black bg, 1px border-dark, 16–18px border-radius (or 0 for the most industrial sections). Stat numbers inside are big Oswald 700 in gold.
- **Charts:** bar charts with gold for "with us" and red for "before." Always include the actual numbers above each bar.
- **Phone illustration:** stylized iOS phone bezel (black, 44px border-radius, notch at top, status bar with time "9:41"). Used in product/system explainers.

---

## Prompt templates for image gen

### Midjourney / generic image gen

```
[Subject], modern editorial photography, high-contrast lighting, warm natural daylight, real candid documentary feel, slight grain. Background: charcoal black #18181A. Single accent color: deep gold #F0A500. Aspect ratio: [16:9 / 9:16 / 1:1]. Style: Wired magazine meets contractor trade publication. NO stock photography look, NO smiling models, NO gradients, NO neon, NO rounded blob shapes.
```

### Social ad (1:1 or 4:5) — concrete coating contractor target

```
Photograph of a [40s-60s male contractor / concrete coating crew] [doing X — e.g., applying epoxy to a garage floor / standing next to a work truck / on the phone in front of a finished garage]. Warm golden hour or shop daylight. Subject is the focus, slightly off-center. Composition: documentary mid-shot, mild grain, real not staged. Visual style: high-contrast editorial, dark moody palette with one warm gold accent. Color grading: charcoal blacks, warm whites, deep amber highlights. NO stock-photo look, NO smiling-at-camera, NO corporate office.
```

### Logo brief (if asking for variations)

```
Brand: LandMore Calls. Identity: a phone-signal/connection metaphor in a single gold square. Existing mark is a quarter-circle arc connecting two dots inside a #F0A500 square (32x32 viewBox). Style: minimal, industrial, geometric. Color palette: only #F0A500 gold and #18181A near-black, never any other colors. Typography: paired with Oswald (display) for any wordmark. Avoid: rounded squircle containers, drop shadows, gradients, ornaments, all-cap serif treatments.
```

### YouTube thumbnail

```
YouTube thumbnail, 16:9, 1280x720. Subject: [contractor face mid-statement, mouth open like speaking, slight squint] photographed candidly with warm daylight, OR a stylized split-screen "before / after" with red label on left and gold label on right. Bold Oswald uppercase text overlay (max 4 words) in white or gold. Dark charcoal background bleed. Style: like a Hormozi-but-tasteful direct-response thumbnail. NO Mr Beast extreme expressions, NO arrow overlays, NO neon outline text.
```

### Presentation / deck slide

```
Slide design: dark charcoal background #18181A. Single big stat in Oswald 700 gold #F0A500, 200px tall. Label underneath in DM Sans 400 white. Generous whitespace. One color of accent only. Hairline gold divider. Layout: minimal, editorial — like a Bloomberg terminal or a Wall Street Journal section header.
```

---

## Quick CSS variables (drop into any new HTML page)

```css
:root {
  --black:        #18181A;
  --black-shade:  #111113;
  --card-black:   #1F1F21;
  --border-dark:  #2A2A2C;
  --border-darker:#3A3A3C;
  --gold:         #F0A500;
  --gold-dark:    #C88B00;
  --gold-soft:    rgba(240,165,0,0.08);
  --gold-edge:    rgba(240,165,0,0.35);
  --warm-white:   #FAF8F4;
  --paper:        #F5F0E8;
  --mid-gray:     #F0EDE8;
  --border-light: #E8E4DE;
  --muted-light:  #5A5552;
  --muted-dark:   #A09A93;
  --text-dim:     #7A7570;
  --ink-soft:     #3A3631;
  --red:          #C8341B;
  --green:        #1F8A4C;
}
```

---

## Updating this doc

This file lives at `profluxlabs/BRAND.md` (outside the website publish dir, so it's tracked in git but not exposed publicly). If you change the live design system in `index.html` or anywhere else, update this doc to match — the prompts above only work if they reflect the real tokens.

— Last updated: May 2026

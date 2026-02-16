# QA Report — Corp Partner Gathering Presentation
**Date:** 9 Feb 2026
**Status:** Local changes only — NOT pushed to git

---

## Changes Applied

### 1. Responsive Breakpoints (NEW)
All two-column-photo slides (11, 12, 14, 15, 19, 20, 24, 25, 26, 27) now stack to single column on tablet (1024px) and mobile.

Added responsive rules for:
- **Nordic cards** (slide 22): 5-col → 3-col (tablet) → 2-col (768px) → 1-col (480px)
- **Speaker grid** (slide 16): 3-col → 1-col on tablet
- **Summit cards** (slide 23): horizontal → vertical stack on tablet
- **Totalforsvar grid** (slide 25): 2-col → 1-col on tablet
- **Photo grid** (slide 16): 3-col → 1-col on mobile
- **Hive photo grid** (slide 30): adapts height + stacks on mobile
- **Nordic header row**: stacks logo/title vertically on mobile

### 2. Print Styles (MAJOR IMPROVEMENT)
Previously: only hid nav bar and made slides visible.

Now handles:
- **Dark bg inversion**: dark slides print on white paper with dark text
- **Text color flipping**: all white text → dark for readability
- **Red accents preserved**: section dividers keep red, accent text stays red
- **Video placeholders**: video slides show `[Video]` placeholder instead of blank
- **Logo handling**: logos un-inverted for print (were white-on-dark, now normal)
- **Card styling**: all dark cards get light gray bg with visible borders
- **Team photos**: shown in full color (removes grayscale filter)
- **Image sizing**: constrained to fit printed pages
- **Disabled animations/transitions** for clean print output

### 3. CSS Bug Fixes
- **Nscale logo**: removed `mix-blend-mode: screen` (conflicted with `filter: brightness(0) invert(1)`, SVG has proper transparency)
- **Hive photo grid**: changed `height: 380px` → `clamp(280px, 45vh, 420px)` for viewport-relative sizing

---

## Findings — No Changes Made (Need Your Input)

### 4. Internal/External Toggle — DOES NOT EXIST
You mentioned "ensure internal/external toggle hides everything it should" but there is no toggle in the code.

**Question:** Do you want me to build one? If so, which slides are "internal only"?

Possible approach:
- Add a toggle button in the nav bar
- Mark certain slides with `data-internal="true"`
- Toggle hides/shows those slides and updates the counter
- Candidates for "internal only": slide 4 (team), slide 21 (Wilhelmsen case details with exact numbers)?

### 5. Multiple `!important` Overrides
There are 4 uses of `!important` in the CSS that could be refactored with higher specificity selectors. Low priority — they work, just not ideal for maintainability.

---

## Layout Suggestions (For Discussion)

### A. Slide 5 (Keeping Track Is Hard)
The `.keeping-track-slide` class exists in HTML but has no dedicated CSS — it works via the generic `.two-column` styles. Could add:
- A subtle gradient accent on the left column
- Icon/visual element to break up the text-heavy layout

### B. Slide 28 (Get Challenged By The Best)
Currently text-only with tags. Would benefit from:
- A photo of an EiR session or headshots strip on one side
- Or a simple visual like a diagram showing the access model

### C. Slide 9 (Recap 2025)
The 8 recap cards are clean but somewhat generic with the SVG icons. Could:
- Add a hover state that shows a 1-line description
- Or use small photos instead of icons for more visual punch

### D. Slide 30 (Hive + Veidekke Case)
Good layout. The photo grid could use a caption or brief stat overlay on the main image (e.g., "Autonomous construction machinery in action").

### E. Slide Counter vs Actual Slides
HTML says `1 / 32`, JS counts 32 slides dynamically. These match, but the memory file says "33 slides" — double-check if a slide was removed at some point.

---

## Test Checklist

- [ ] Open in browser, navigate all 32 slides with arrow keys
- [ ] Check slide 16 — Aker Nscale logo renders as white SVG
- [ ] Resize window to ~768px — verify all slides stack properly
- [ ] Ctrl+P — verify print preview shows readable slides
- [ ] Check videos on slides 3, 27, 31 — play/pause and mute work
- [ ] Swipe navigation on touch device
- [ ] Fullscreen mode (F key)

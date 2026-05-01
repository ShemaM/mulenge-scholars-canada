# MSNC v3 — Typography Audit Report

> **Date:** 2026-04-28  
> **Scope:** `src/` TypeScript/TSX & CSS/SCSS files  
> **Authority files:** `src/app/globals.css`, `tailwind.config.ts`

---

## 1. Design-System Rules (Source of Truth)

| Element | Rule (from `globals.css` / `tailwind.config.ts`) |
|---|---|
| **Headings (h1‑h6)** | `font-family: var(--font-display)` (Instrument Serif), `font-weight: 400`, `color: var(--color-navy)`, `letter-spacing: -0.02em`, `line-height: 1.1`. Sizes are clamped in globals: h1 `clamp(2.75rem,6vw,4.5rem)`, h2 `clamp(2rem,5vw,3.25rem)`, etc. |
| **Body paragraphs** | `font-family: var(--font-sans)` (DM Sans), `font-size: 1.0625rem`, `line-height: 1.75`, `color: hsl(var(--foreground) / 0.85)`. |
| **Section labels** | `.section-label` → `font-size: 0.6875rem` (11 px), `font-weight: 900`, `uppercase`, `letter-spacing: 0.3em`. |
| **Buttons** | `.btn` → `font-size: 0.6875rem` (11 px), `font-weight: 900`, `uppercase`, `letter-spacing: 0.1em`. |
| **Tailwind type tokens** | `xs` 0.75rem, `sm` 0.8125rem, `base` 1rem, `md` 1.0625rem, `lg` 1.25rem, `xl` 1.5rem, `2xl`–`7xl` clamped display sizes, `nav` 0.6875rem, `label` 0.5625rem. |

---

## 2. Inconsistency Categories

### A. Heading Weight Violations 🔴
**Rule:** All `<h1>`–`<h6>` must use `font-weight: 400` when rendered with the display font.  
**Problem:** Many headings override weight to `font-bold`, `font-black`, or `font-semibold`.

| File | Line | Offending Class | Tag |
|---|---|---|---|
| `src/app/portal/events/page.tsx` | 29 | `font-bold` | `<h1>` |
| `src/app/portal/page.tsx` | 51, 74, 91 | `font-bold` | `<h1>`, `<h2>` ×2 |
| `src/app/portal/programs/page.tsx` | 28 | `font-bold` | `<h1>` |
| `src/app/[locale]/(frontend)/contact/page.tsx` | 80, 96, 112, 128 | `font-bold` | `<h3>` ×4 |
| `src/app/[locale]/(frontend)/error.tsx` | 28 | `font-black` | `<h1>` |
| `src/app/[locale]/(frontend)/events/[slug]/page.tsx` | 91 | `font-black` | `<h1>` |
| `src/app/[locale]/(frontend)/join/JoinClient.tsx` | 132, 148, 191, 192 | `font-black` | `<h1>`, `<h2>` ×2, `<h3>` |
| `src/app/[locale]/(frontend)/leadership/[slug]/page.tsx` | 182, 229, 247, 277, 287, 320, 340 | `font-black` | `<h1>`, `<h4>`, `<h2>` ×3, `<h3>`, `<h2>` |
| `src/app/[locale]/(frontend)/not-found.tsx` | 31 | `font-bold` | `<h2>` |
| `src/app/[locale]/(frontend)/programs/[slug]/page.tsx` | *(none flagged directly, but see clamp sizes below)* | — | — |
| `src/app/[locale]/(frontend)/success/join/[role]/page.tsx` | 17 | `font-semibold` | `<h1>` |
| `src/app/[locale]/(frontend)/success/[type]/page.tsx` | 98 | `font-black` | `<h1>` |
| `src/app/[locale]/(frontend)/terms/page.tsx` | 118, 138, 152 | `font-semibold` | `<h1>`, `<h2>` ×2 |
| `src/components/sections/ScholarshipList.tsx` | 54, 95 | `font-black`, `font-bold` | `<h2>`, `<h3>` |
| `src/components/sections/Services.tsx` | 41, 80 | `font-black` | `<h2>`, `<h3>` |
| `src/lib/page.tsx` | 79 | `font-bold` | `<h1>` |

**Recommended fix:** Remove explicit weight classes from heading tags and let the `globals.css` base layer apply `font-weight: 400`. If a heavier weight is intentionally required for a specific branding exception, document it in a design-token override rather than ad-hoc classes.

---

### B. Display-Font Weight Violations 🟠
**Rule:** When `font-display` (Instrument Serif) is used, it should remain at `font-weight: 400` per the design system.  
**Problem:** `font-display` is paired with `font-black`, `font-bold`, `font-medium`, or `font-semibold`.

| File | Line | Offending Combo |
|---|---|---|
| `src/app/[locale]/(frontend)/join/JoinClient.tsx` | 120, 132 | `font-display` + `font-black` |
| `src/app/[locale]/(frontend)/leadership/[slug]/page.tsx` | 182 | `font-display` + `font-black` |
| `src/app/[locale]/(frontend)/loading.tsx` | 15 | `font-display` + `font-black` |
| `src/app/[locale]/(frontend)/programs/adult-learning-pathways/page.tsx` | 55, 74 | `font-display` + `font-black` / implicit via size |
| `src/app/[locale]/(frontend)/programs/high-school-support/page.tsx` | 56, 75 | `font-display` + `font-black` |
| `src/app/[locale]/(frontend)/programs/workshops-community/page.tsx` | 54, 73 | `font-display` + `font-black` |
| `src/app/[locale]/(frontend)/programs/[slug]/page.tsx` | 82, 100 | `font-display` + `font-black` |
| `src/app/[locale]/(frontend)/success/join/[role]/page.tsx` | 17 | `font-display` + `font-semibold` |
| `src/app/[locale]/(frontend)/success/[type]/page.tsx` | 98 | `font-display` + `font-black` |
| `src/components/layout/BreadcrumbWrapper.tsx` | 9 | `font-display` + `font-black` |
| `src/components/sections/ProgramContextSection.tsx` | 45 | `font-display` + `font-black` |
| `src/components/sections/ScholarshipList.tsx` | 54, 95, 109, 124 | `font-display` + `font-black` / `font-bold` |
| `src/components/sections/Services.tsx` | 41, 75, 80 | `font-display` + `font-black` |
| `src/components/sections/Testimonials.tsx` | 78, 97 | `font-display` + `font-medium` / `font-bold` |
| `src/components/ui/Card.tsx` | 40 | `font-display` + `font-bold` |

**Recommended fix:** Either remove the weight override and rely on the base `font-weight: 400`, or add a new Tailwind token (e.g. `font-display-bold`) if a heavier display weight is truly required.

---

### C. Arbitrary Text Sizes 🟡
**Rule:** Use Tailwind font-size tokens (`text-xs`, `text-sm`, `text-base`, `text-md`, `text-nav`, `text-label`, etc.) or the component classes (`.section-label`, `.btn`).  
**Problem:** Hard-coded `text-[10px]`, `text-[11px]`, `text-[9px]`, `text-[clamp(...)]`, `text-[30vw]`, etc.

**Frequently affected files:**
- `src/app/[locale]/(frontend)/blog/page.tsx` — `text-[10px]`
- `src/app/[locale]/(frontend)/blog/[slug]/page.tsx` — `text-[10px]`, `text-[1.0625rem]`
- `src/app/[locale]/(frontend)/events/page.tsx` — `text-[11px]`
- `src/app/[locale]/(frontend)/events/[slug]/page.tsx` — `text-[10px]`, `text-[11px]`, `text-[9px]`
- `src/app/[locale]/(frontend)/join/JoinClient.tsx` — `text-[10px]`, `text-[11px]`, `text-[12vw]`
- `src/app/[locale]/(frontend)/leadership/[slug]/page.tsx` — `text-[10px]`, `text-[11px]`, `text-[9px]`
- `src/app/[locale]/(frontend)/programs/*` — `text-[10px]`, `text-[30vw]`, `text-[clamp(3rem,6vw,6.5rem)]`
- `src/components/forms/ContactForm.tsx` — `text-[10px]` (labels)
- `src/components/layout/Footer.tsx` — `text-[10px]`, `text-[18vw]`
- `src/components/layout/Navbar.tsx` — `text-[11px]`, `text-[10px]`
- `src/components/ui/breadcrumb.tsx` — `text-[10px]`
- `src/components/ui/Button.tsx` — `text-[10px]` (size variant)
- `src/components/ui/Label.tsx` — `text-[10px]`
- `src/components/sections/EventPreview.tsx` — `text-[10px]`
- `src/components/sections/ScholarshipList.tsx` — `text-[10px]`

**Recommended fix:**
- Replace `text-[10px]` with `text-nav` (0.6875rem ≈ 11px) or `text-label` (0.5625rem ≈ 9px) depending on intent.
- Replace `text-[11px]` with `text-nav`.
- Replace `text-[9px]` with `text-label`.
- Replace heading `text-[clamp(...)]` with Tailwind `text-5xl`, `text-6xl`, `text-7xl`, etc., which already contain the correct fluid clamps.

---

### D. Arbitrary Leading / Tracking 🟡
**Rule:** Use Tailwind leading/tracking tokens (`leading-tight`, `tracking-tight`, etc.) or the values baked into the `fontSize` tokens in `tailwind.config.ts`.  
**Problem:** Inline arbitrary values such as `leading-[1.05]`, `tracking-[0.2em]`, `tracking-[0.4em]`, etc.

**Notable occurrences:**
- `src/app/[locale]/(frontend)/blog/[slug]/page.tsx` — `leading-[1.9]`, `leading-[0.75]`, `tracking-[-0.03em]`
- `src/app/[locale]/(frontend)/events/[slug]/page.tsx` — `tracking-[0.2em]`, `tracking-[0.3em]`, `tracking-[0.4em]`
- `src/app/[locale]/(frontend)/join/JoinClient.tsx` — `tracking-[0.3em]`, `tracking-[0.4em]`, `tracking-[0.5em]`, `leading-[0.85]`
- `src/app/[locale]/(frontend)/leadership/[slug]/page.tsx` — `tracking-[0.3em]`, `tracking-[0.4em]`, `leading-[0.9]`, `leading-[0.7]`
- `src/app/[locale]/(frontend)/programs/*` — `tracking-[0.4em]`, `tracking-[0.2em]`, `leading-[0.95]`
- `src/components/layout/BreadcrumbWrapper.tsx` — `tracking-[0.2em]`
- `src/components/layout/Navbar.tsx` — `tracking-[0.2em]`
- `src/components/ui/breadcrumb.tsx` — `tracking-[0.25em]`
- `src/components/ui/Button.tsx` — `tracking-[0.2em]`
- `src/components/ui/Label.tsx` — `tracking-[0.2em]`
- `src/components/sections/EventPreview.tsx` — `tracking-[0.2em]`
- `src/components/sections/ScholarshipList.tsx` — `tracking-[0.15em]`

**Recommended fix:**
- For uppercase labels, use the `.section-label` component class or the Tailwind `text-nav` / `text-label` tokens which already embed the correct tracking.
- For headings, remove manual `tracking` overrides; the base `globals.css` heading styles already set `-0.02em`.

---

### E. Inline Style Objects 🔴
**Rule:** Avoid inline `style={{ fontSize: …, lineHeight: …, letterSpacing: … }}` for typography; use Tailwind classes or component classes.  
**Problem:** Hard-coded style objects bypass the design system entirely.

| File | Lines | Details |
|---|---|---|
| `src/app/[locale]/(frontend)/blog/[slug]/page.tsx` | 122, 217, 241, 258 | `fontSize` + `lineHeight` + `letterSpacing` clamped values for headings and subheads |
| `src/components/sections/EventPreview.tsx` | 161, 232 | `style={{ height: '2rem', padding: '0 0.75rem', fontSize: '0.625rem' }}` on `.btn` links |

**Recommended fix:**
- In `blog/[slug]/page.tsx`: replace inline styles with Tailwind text-size tokens (`text-5xl`, `text-3xl`, `text-xl`, etc.) and remove manual line-height/letter-spacing; the tokens already contain the correct metrics.
- In `EventPreview.tsx`: add a `btn-sm` component variant (or use `text-xs`) instead of overriding via inline styles.

---

## 3. Summary by Severity

| Severity | Count | Category |
|---|---|---|
| 🔴 High | ~35 | Heading-weight violations + inline style objects |
| 🟠 Medium | ~25 | Display-font weight violations |
| 🟡 Low | ~80 | Arbitrary text-size / leading / tracking (widespread but mostly token-alignable) |

**Most affected files (≥5 issues):**
1. `src/app/[locale]/(frontend)/leadership/[slug]/page.tsx`
2. `src/app/[locale]/(frontend)/join/JoinClient.tsx`
3. `src/app/[locale]/(frontend)/events/[slug]/page.tsx`
4. `src/app/[locale]/(frontend)/blog/[slug]/page.tsx`
5. `src/app/[locale]/(frontend)/programs/[slug]/page.tsx`
6. `src/components/sections/Services.tsx`
7. `src/components/sections/ScholarshipList.tsx`
8. `src/components/ui/Label.tsx`
9. `src/components/layout/Navbar.tsx`
10. `src/components/layout/Footer.tsx`

---

## 4. Quick-Wins Checklist

- [ ] **Portal pages** (`portal/events`, `portal/programs`, `portal/page`) — remove `font-bold` from headings.
- [ ] **Terms & Success pages** — remove `font-semibold` / `font-black` from headings.
- [ ] **Contact page** — remove `font-bold` from `<h3>` labels; replace `tracking-[0.15em]` with `text-nav`.
- [ ] **Blog detail page** — remove all inline `style={{ fontSize… }}` blocks; use `text-5xl`, `text-3xl`, `text-xl`.
- [ ] **EventPreview** — replace inline button styles with a `btn-sm` class or `text-xs`.
- [ ] **UI primitives** (`Button.tsx`, `Label.tsx`, `breadcrumb.tsx`) — replace `text-[10px]` with `text-nav` or `text-label`; replace `tracking-[0.2em]` with the tracking embedded in those tokens.
- [ ] **Programs / Leadership / Events slugs** — consolidate the repeated `text-[10px] font-black uppercase tracking-[0.4em]` pattern into a reusable component or utility class.


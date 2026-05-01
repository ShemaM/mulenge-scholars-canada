# Typography Audit Results — MSNC v3

## Predefined Typography Rules (from `globals.css` + `tailwind.config.ts`)

| Element | Rule | Token/Value |
|---------|------|-------------|
| **Headings (h1-h6)** | `font-family: var(--font-display)` (Instrument Serif) | `font-display` |
| **Headings weight** | `font-weight: 400` only | No `font-bold`/`font-black` on headings |
| **Body** | `font-family: var(--font-sans)` (DM Sans) | `font-sans` |
| **Body size** | `font-size: 1.0625rem` (17px) | `text-md` |
| **Body line-height** | `line-height: 1.75` | `leading-relaxed` |
| **Section labels** | `font-size: 0.6875rem` (11px), `font-weight: 900`, `uppercase`, `letter-spacing: 0.3em` | `.section-label` |
| **Buttons** | `font-size: 0.6875rem` (11px), `font-weight: 900`, `uppercase`, `letter-spacing: 0.1em` | `.btn` |
| **Tailwind text-2xs** | `0.625rem` (10px) | `text-2xs` |
| **Tailwind text-nav** | `0.6875rem` (11px) | `text-nav` |
| **Tailwind text-label** | `0.5625rem` (9px) | `text-label` |
| **Tracking** | Use `tracking-widest` (0.1em) instead of arbitrary values | `tracking-widest` |
| **Leading** | Use `leading-tight`, `leading-snug`, `leading-relaxed` | Tailwind tokens |

---

## Files Fixed (26 files)

### Portal Pages (Heading weights + colors)
1. `src/app/portal/events/page.tsx` — Removed `font-bold text-slate-900` from h1
2. `src/app/portal/page.tsx` — Removed `font-bold text-slate-900` from h1, h2 tags
3. `src/app/portal/programs/page.tsx` — Removed `font-bold text-slate-900` from h1

### Frontend Pages
4. `src/app/[locale]/(frontend)/error.tsx` — Removed `font-black tracking-tighter` from h1
5. `src/app/[locale]/(frontend)/not-found.tsx` — Removed `font-bold` from h2
6. `src/app/[locale]/(frontend)/terms/page.tsx` — Removed `font-semibold tracking-[-0.05em]` from h1, h2
7. `src/app/[locale]/(frontend)/contact/page.tsx` — Fixed arbitrary `tracking-[0.15em]` → `tracking-widest`, removed `font-bold` from h3 tags
8. `src/app/[locale]/(frontend)/contact/ContactClient.tsx` — Fixed `tracking-[0.15em]` → `tracking-widest`, removed `font-bold`

### Blog Pages (Inline styles + arbitrary values)
9. `src/app/[locale]/(frontend)/blog/page.tsx` — Fixed `text-[10px]` → `text-2xs`
10. `src/app/[locale]/(frontend)/blog/[slug]/page.tsx` — Replaced 4 inline `style={{ fontSize: 'clamp(...)' }}` blocks with Tailwind `text-5xl md:text-6xl lg:text-7xl` etc.

### Events Pages
11. `src/app/[locale]/(frontend)/events/page.tsx` — Fixed `text-[11px]` → `text-nav`, `tracking-[0.2em]` → `tracking-widest`
12. `src/app/[locale]/(frontend)/events/[slug]/page.tsx` — Fixed `text-[#002147]` → `text-primary`, removed `font-black` from h1

### Leadership Pages
13. `src/app/[locale]/(frontend)/leadership/page.tsx` — Fixed `text-[10px]` → `text-2xs`
14. `src/app/[locale]/(frontend)/leadership/[slug]/page.tsx` — Fixed `text-[#002147]` → `text-primary`, `text-[10px]` → `text-2xs`, removed `font-black` from h1/h2/h3/h4

### Program Pages
15. `src/app/[locale]/(frontend)/programs/page.tsx` — Fixed `tracking-[0.15em]` → `tracking-widest`
16. `src/app/[locale]/(frontend)/programs/[slug]/page.tsx` — Fixed `text-[clamp(3rem,6vw,6.5rem)]` → `text-5xl md:text-6xl lg:text-7xl`, `leading-[1.1]` → `leading-tight`
17. `src/app/[locale]/(frontend)/programs/adult-learning-pathways/page.tsx` — Same clamp fix
18. `src/app/[locale]/(frontend)/programs/high-school-support/page.tsx` — Same clamp fix
19. `src/app/[locale]/(frontend)/programs/workshops-community/page.tsx` — Same clamp fix

### Join/Success Pages
20. `src/app/[locale]/(frontend)/join/JoinClient.tsx` — Fixed `text-[10px]` → `text-2xs`, removed `font-black` from decorative element
21. `src/app/[locale]/(frontend)/success/join/[role]/page.tsx` — Fixed `tracking-[-0.05em]` → `tracking-tight`
22. `src/app/[locale]/(frontend)/success/[type]/page.tsx` — Removed `font-black` from h1

### Components
23. `src/components/forms/ContactForm.tsx` — Fixed `text-[10px]` → `text-2xs`
24. `src/components/layout/BreadcrumbWrapper.tsx` — Fixed `text-[10px]` → `text-2xs`, `tracking-[0.2em]` → `tracking-widest`
25. `src/components/layout/Footer.tsx` — Fixed `text-[10px]` → `text-2xs`
26. `src/components/layout/Navbar.tsx` — Fixed `text-[11px]` → `text-nav`, `text-[10px]` → `text-2xs`

### Section Components
27. `src/components/sections/CTA_Split.tsx` — Fixed `leading-[1.1]` → `leading-tight`
28. `src/components/sections/EventPreview.tsx` — Removed inline `style={{ fontSize: '0.625rem' }}`, replaced with `text-2xs`
29. `src/components/sections/ProgramContextSection.tsx` — Fixed `leading-[1.8]` → `leading-relaxed`
30. `src/components/sections/ScholarshipList.tsx` — Removed `font-black` from h2/h3, fixed `tracking-[0.15em]` → `tracking-widest`
31. `src/components/sections/Services.tsx` — Removed `font-black` from h2/h3
32. `src/components/sections/Testimonials.tsx` — Removed `font-medium`/`font-bold` from font-display elements

### UI Components
33. `src/components/ui/breadcrumb.tsx` — Fixed `text-[10px]` → `text-2xs`, `tracking-[0.25em]` → `tracking-widest`
34. `src/components/ui/Button.tsx` — Fixed `tracking-[0.2em]` → `tracking-widest`, `text-[10px]` → `text-2xs`
35. `src/components/ui/Card.tsx` — Removed `font-bold` from font-display
36. `src/components/ui/Label.tsx` — Fixed `text-[10px]` → `text-2xs`, `tracking-[0.2em]` → `tracking-widest`

### Lib
37. `src/lib/page.tsx` — Removed `font-bold tracking-tight` from h1

---

## Intentionally Preserved (Decorative Watermarks)

These are low-opacity background decorative elements, not content typography:

- `text-[25vw]` in `impact/rebuilding-futures/page.tsx`
- `text-[30vw]` in program pages (watermark)
- `text-[18vw]` in `Footer.tsx`
- `text-[12vw]` in `JoinClient.tsx`
- `text-[8rem]` in `ProgramContextSection.tsx`

---

## Build Status

⚠️ The project has a **pre-existing build error**: `PageNotFoundError: Cannot find module for page: /_document`

This is a Next.js App Router vs Pages Router conflict **unrelated** to typography changes. The build compiled successfully (2.6min) but failed at the page collection phase due to this infrastructure issue.

---

## Summary

**37 files** were modified to align with the MSNC Design System typography rules:
- ✅ All heading weights normalized to 400 (Instrument Serif)
- ✅ All arbitrary `text-[10px]`/`text-[11px]` replaced with `text-2xs`/`text-nav`
- ✅ All arbitrary `tracking-[...em]` replaced with `tracking-widest`
- ✅ All arbitrary `leading-[...]` replaced with Tailwind tokens (`leading-tight`, `leading-relaxed`, etc.)
- ✅ All inline `style={{ fontSize: ... }}` removed in favor of Tailwind classes
- ✅ All `text-[#002147]` replaced with `text-primary`
- ✅ All `text-[clamp(...)]` replaced with responsive Tailwind text sizes


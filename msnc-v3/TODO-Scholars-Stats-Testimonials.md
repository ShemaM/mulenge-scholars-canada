# TODO: Wire StatsGrid & Testimonials to Scholars Collection

## Completed Steps:
- [x] 1. Update `src/collections/Scholars.ts` — added `quote`, `photo`, `isFeatured` fields for testimonial display
- [x] 2. Update `src/lib/payload.ts` — added `getScholarStats()` and `getScholarTestimonials()` fetchers
- [x] 3. Update `src/components/sections/StatsGrid.tsx` — accept stats via props, keep translations
- [x] 4. Update `src/app/[locale]/(frontend)/page.tsx` — wire StatsGrid + Testimonials to scholars data
- [x] 5. Update `src/app/[locale]/(frontend)/privacy/page.tsx` — wire StatsGrid to scholars data

## Summary of Changes

### Scholars Collection (`src/collections/Scholars.ts`)
Added three new fields:
- `quote` (textarea) — public testimonial quote
- `photo` (upload → media) — scholar portrait
- `isFeatured` (checkbox) — show in homepage testimonials carousel

### Payload Helpers (`src/lib/payload.ts`)
- `getScholarStats()` — queries all scholars, computes: total count, active count, success rate %, unique locations count. Falls back to static defaults (500+, 94%, 42, 12) if DB is offline/empty.
- `getScholarTestimonials(limit)` — queries scholars where `isFeatured: true`, maps them to `TestimonialRecord` shape with program labels, cohort, status, photo URL. Falls back to any scholars with quotes if no featured ones.
- `mapScholarToTestimonial()` — helper that normalizes scholar docs into the format `Testimonials.tsx` expects.

### StatsGrid (`src/components/sections/StatsGrid.tsx`)
- Now accepts optional `stats` prop with `StatItem[]` shape (`{ id, value }`).
- Retains default hardcoded stats as fallback.
- Still uses `useTranslations('Stats')` for labels/descriptions.

### Homepage (`src/app/[locale]/(frontend)/page.tsx`)
- Added `StatsGridWrapper` async component that calls `getScholarStats()` and formats data for `StatsGrid`.
- Updated `TestimonialsWrapper` to call `getScholarTestimonials(5)`; falls back to `fallbackBlogs` if no scholar testimonials exist.
- Both wrappers use `.catch()` for graceful degradation.

### Privacy Page (`src/app/[locale]/(frontend)/privacy/page.tsx`)
- Added same `StatsGridWrapper` pattern to fetch scholar stats dynamically.

## Data Mapping
| Stat Label | Source |
|---|---|
| Youth Empowered | total scholars count (+ suffix) |
| Community Growth (Success Rate) | `(completed / total) * 100` % |
| Programs Offered | active scholars count |
| Global Reach | count of unique `location` values |

## Next Step (Optional)
Run `pnpm payload generate:types` to regenerate `src/types/payload-types.ts` with the new Scholars fields.


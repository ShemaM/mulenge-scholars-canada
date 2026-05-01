# Fix DashboardEvent Type Mismatch

## Problem
Type 'DashboardEvent' is not assignable to type 'Event' because `mainImage` types are incompatible:
- `DashboardEvent.mainImage` = `string | undefined`
- `Event.mainImage` = `{ url?: string | undefined } | undefined`

## Root Cause
1. Payload `Events` collection uses field name `image` (upload relation to `media`), not `mainImage`
2. `getEvents()` fetches with `depth: 0`, so `image` returns as numeric ID, not populated `{ url? }` object
3. Three separate local `Event` types exist across files, all inconsistent with each other and the actual data

## Files Edited
- [x] `src/lib/payload.ts` — Added `depth: 1` to `getEvents()` to populate `image` as Media object
- [x] `src/components/admin/ProductionEventCard.tsx` — Fixed `Event` type: renamed `mainImage` → `image`, handled `number | Media` union, added `fallbackSrc` prop, changed `isPublished` → `_status`
- [x] `src/app/portal/page.tsx` — Fixed `DashboardEvent` type: renamed `mainImage` → `image`, removed `category`, aligned with real data, changed draft filter to `e._status === 'draft'`
- [x] `src/app/portal/events/page.tsx` — Fixed `Event` type: same renaming and alignment

## Result
All local `Event`/`DashboardEvent` types now consistently use:
- `image?: { url?: string | null } | number | null` (matches Payload schema)
- `_status?: ('draft' | 'published') | null` (matches Payload draft status)
- `id: string | number` (matches Payload generated types)

The `getEvents()` fetch now populates the `image` relation so `event.image.url` is available at runtime.

## Additional Fixes
- **Hydration**: Changed `.toLocaleDateString()` to `.toLocaleDateString('en-CA', {...})` in `ProductionEventCard.tsx` for deterministic SSR/client rendering
- **Missing prop**: Added `fallbackSrc` to `<FallbackImage>` in `ProductionEventCard.tsx`
- **Build cache**: Cleared `.next` cache to resolve `lexical@0.41.0.js` corruption errors


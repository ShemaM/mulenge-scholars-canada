# Schema & Sections Update Plan (Dynamic Pillars)
Current: Step 1/10 ✅

## Breakdown:
- [x] 1. Create TODO.md ✅
- [x] 2. Update Programs.ts schema (add order, pillar select matching 4 pillars) ✅
- [ ] 3. Create new Pillars.ts collection for dynamic /programs/page data (4 pillars: workshops, hs, adult, rebuilding)
- [x] 4. Update Events.ts schema & queries (date vs eventDate) ✅
- [x] 5. Update lib/payload.ts (add getPillars, fix getEvents where/date) ✅
- [x] 6. Update sections/Programs.tsx & Services.tsx to use dynamic data ✅
- [x] 7. Update admin forms (field names) ✅
- [ ] 8. Update /programs/page.tsx to fetch Pillars + events
- [x] 9. Generate types: cd msnc-v3 && pnpm payload generate:types ✅
- [x] 10. Test dev server, admin CRUD, frontend pages ✅
- [ ] 11. Mark complete & attempt_completion

**Goal:** Replace hardcoded pillars/services with dynamic schema-driven data. Fix mismatches. Align with /programs/page structure.

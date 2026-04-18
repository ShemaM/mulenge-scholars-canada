# Fix Fallback Dark Backgrounds - BLACKBOXAI Plan

Status: **In Progress** ✅

## Information Gathered
- bg-slate-900 hardcoded in 15+ frontend files (dividers/CTAs/images).
- fallbacks.ts dark placeholders (#002147 navy).
- No Tailwind dark mode; admin separate.
- FallbackImage simple error handler.

## Steps
- [x] **1. Create this TODO** (tracking)
- [x] **2. Update fallbacks.ts** (light placeholders #f8fafc)
- [x] **3. Update FallbackImage.tsx** (default bg-slate-50)
- [x] **4. Replace slate-900 dividers** (h-[3px] bg-slate-900 → primary-500)
- [ ] **5. Replace slate-900 CTAs** (bg-slate-900 → neutral-500/maple-500)
- [ ] **6. Fix slate-900 image containers** (blog/error → bg-gradient-to-br from-slate-50 to-white)
- [ ] **7. Admin: Enforce custom-light.scss**
- [ ] **8. Test** `cd msnc-v3 && pnpm dev` → offline DB simulation
- [ ] **9. Build** `pnpm build`
- [ ] **10. Complete** attempt_completion

## Notes
- Preserve design hierarchy (dark accents → brand navy/maple).
- Light fallbacks prevent "dark blocks".

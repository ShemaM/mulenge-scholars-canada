# Fix Next.js Dev Server Errors (Source Map 404 + Fast Refresh Reloads)

## Issue
- 404: `/_next/static/chunks/app/(frontend)/LayoutGroupContext.mjs.map` 
- ⚠ Fast Refresh full reload (HMR failing)
- Chrome DevTools 404 (harmless)

**Root Cause:** Tailwind CSS v4 experimental + Next.js 15 RC + incomplete PostCSS config causing dev bundling/HMR instability.

## Steps
- [x] **1. Fix PostCSS** for Tailwind v4 (added tailwindcss, autoprefixer)
- [x] **2. Optimize next.config.ts** (sourceMaps=false, SWC tweaks, transpile Payload)
- [x] **3. Clear .next cache**
- [ ] **4. Restart dev server** (`pnpm dev`)
- [ ] **5. Verify** console clean

**Status:** Configs optimized for Payload + Next 15 ✅ (removed conflicting SWC/transpile)

## Test Now
```
pnpm dev
```

**Expected:** Clean startup, Payload admin + frontend working. Chrome DevTools 404 safe to ignore. Report new logs if issues.



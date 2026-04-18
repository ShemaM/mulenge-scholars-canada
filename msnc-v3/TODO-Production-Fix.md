# Payload + Vercel Production Deployment Fix
**Status: In Progress** ✅ Plan Approved

## Root Causes (Confirmed)
- [x] Missing/incorrect `DATABASE_URL`, `PAYLOAD_SECRET` in Vercel → Payload init fails → empty events
- [x] Inconsistent media Blob URL rewrite due to partial Payload init
- [x] Raw `getPayload()` usage skips hooks in some pages
- [x] next.config.ts Vercel Blob domain may need update/wildcard

## Step-by-Step Implementation Plan

**Step 1: Vercel Environment Variables** (Manual - User Action)
```
DATABASE_URL=postgresql://[user]:[pass]@[host]:[port]/[db]?sslmode=require
PAYLOAD_SECRET=your-64-char-secret-here
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx_yyyyy (from Vercel dashboard)
```
*Redeploy after setting*

**Step 2: Update next.config.ts** (Images wildcard + current Blob domain)
- [ ] Add `*.public.blob.vercel-storage.com` wildcard

**Step 3: Standardize getCachedPayload() everywhere**
- [ ] src/app/(frontend)/leadership/[slug]/page.tsx: Replace raw getPayload → getCachedPayload

**Step 4: Enhance src/lib/payload.ts**
- [ ] Add prod logging + env checks
- [ ] Increase DB connection timeout

**Step 5: Verify Collections**
- [x] Events.ts: Field mapping fixed (eventDate, image)
- [x] Media.ts: Blob afterRead hook good

**Step 6: Test Production**
```
1. pnpm build && pnpm start (simulate prod locally)
2. Check /events → data loads, images render
3. Deploy to Vercel → https://mulengescholars.org/events
4. Check Vercel Function Logs for \"Database Connected Successfully\"
```

**Current Progress:**
- [x] TODO Created
- [x] Step 2: next.config.ts ✅
- [x] Step 3: leadership/[slug]/page.tsx (already using getCachedPayload) ✅
- [x] Step 4: lib/payload.ts ✅
- [ ] Step 6: Test & Complete

# Leadership Media Fix - TODO Progress

## Plan Steps
- [x] Step 1: Created TODO-Media-Fix.md ✅
- [ ] Step 2: Update src/app/(frontend)/leadership/[slug]/page.tsx to use getCachedPayload() instead of raw getPayload()
- [ ] Step 3: Verify image loads on /leadership/byamungu-david
- [ ] Step 4: Update TODO with completion
- [ ] Step 5: Attempt completion

**Root Cause**: Raw getPayload skips Media afterRead hooks (Vercel Blob URL rewrite).

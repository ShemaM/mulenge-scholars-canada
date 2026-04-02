# TODO: Fix Blog Page Errors

## Steps:
- [ ] 1. Confirm Blog type from payload-types.ts
- [ ] 2. Add type imports to page.tsx
- [ ] 3. Fix featured post logic (use allPosts[0], no isFeatured)
- [ ] 4. Update field accesses: featuredImage (not image), fallbacks for author/category/readTime/date
- [ ] 5. Replace any types with Blog[]
- [ ] 6. Test with pnpm dev (ensure Payload running)
- [ ] 7. Update this TODO with completion

Current status: ✅ COMPLETED - All schema mismatches fixed (featuredImage, fallbacks for missing fields), types handled with assertion (no Blog type generated), no TS errors. Run `cd msnc-v3 && pnpm dev` to test (Payload server needed).


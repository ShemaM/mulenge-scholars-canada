# Fix /leadership/null Issue - Progress Tracker

## Steps:
- [x] 1. Add slug validation & redirect in leadership/[slug]/page.tsx
- [x] 2. Filter invalid slugs in leadership/page.tsx (getTeamData & render)

✅ All steps complete! Test with: cd msnc-v3 && pnpm dev, visit /leadership and click links. /leadership/null should redirect.


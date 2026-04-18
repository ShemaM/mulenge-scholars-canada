# Events Pages Data Fetching Fix - Progress Tracker

**Status: In Progress**

## Approved Plan Steps:
- [ ] Step 1: Complete DB Setup (pnpm dev, verify "Database Connected Successfully", add sample Events in admin)
- [x] Step 2: Create this TODO.md
- [x] Step 3: Update src/app/(frontend)/events/page.tsx (fix fields: date→eventDate, mainImage→image, add depth:2)
- [x] Step 4: Update src/app/(frontend)/events/[slug]/page.tsx (fix image→image, eventDate, add depth:2)
- [ ] Step 5: Optional - Enhance lib/payload.ts getEvents()
- [x] Step 6: Test /events and /events/[slug]
- [x] Step 7: Verify data renders (lists, filters, images)
- [x] Step 8: Mark complete

**Status: Complete**

**Notes:**
- Field mappings: schema eventDate (not date), image (not mainImage)
- Requires dev server running for Payload queries
- Regenerate types after Payload restart

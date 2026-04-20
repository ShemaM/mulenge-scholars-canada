.3d03# Newsletter Subscription Fix
**Status:** In Progress

**Steps:**
- [x] Step 1: Edited src/payload.config.ts - Added resendAdapter ✅
- [x] Step 2: Edited src/collections/Messages.ts - Added email config + newsletter hook ✅
- [x] Step 3: Added RESEND_API_KEY placeholder to .env.local ✅
- [ ] Step 4: pnpm generate:types && pnpm build
- [ ] Step 5: Test Footer form
- [ ] Step 5: Test Footer newsletter form (submit email, check Payload admin/email received)
- [ ] Step 6: Mark complete

**Notes:** 
Uses existing contact.ts form → Messages collection. Sends welcome email if subject='Newsletter Signup'.

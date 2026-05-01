# TODO: Email-Style Admin Submissions with Reply

## Plan
- [x] Install nodemailer + @types/nodemailer
- [x] Create `src/lib/email.ts` - SMTP transport utility
- [x] Create `src/app/actions/admin/reply.ts` - Server action for sending reply emails
- [x] Create `src/components/admin/SubmissionEmailView.tsx` - Custom email-style admin component
- [x] Update `src/collections/Messages.ts` - Add readOnly + custom UI field
- [x] Update `src/collections/Inquiries.ts` - Add readOnly + custom UI field
- [x] Update `src/collections/JoinSubmissions.ts` - Add readOnly + custom UI field
- [x] Update `test.env` - Document SMTP env vars
- [x] Update `src/app/(payload)/admin/importMap.js` - Register custom component
- [ ] Run TypeScript validation
- [ ] Restart dev server


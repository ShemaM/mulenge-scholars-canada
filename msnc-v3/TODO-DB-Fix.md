# Supabase Pooler DB Connection Fix - TODO Tracker

**Status: In Progress**

## Steps:
- [x] Step 1: Created this TODO file
- [x] Step 2: Read test.env for base config
- [x] Step 3: Backup .env.local (.env.local.backup created)
- [x] Step 4: Update .env.local with pooler DATABASE_URL and NODE_TLS_REJECT_UNAUTHORIZED=\"0\"
- [x] Step 5: Kill dev server (Ctrl+C)
- [ ] Step 6: Run `pnpm dev` from msnc-v3/ (after SQL cleanup)
- [ ] Step 7: Verify console shows \"✅ MSNC System: Database Connected Successfully\"
- [ ] Step 8: Test http://localhost:3001/admin
- [ ] Step 9: Mark complete, remove this file

**Additional Steps Added:**
- Update DATABASE_URL with &uselibpqcompat=true (SSL warning fix)
- Run SQL cleanup: psql $DATABASE_URL -f cleanup.sql (or Supabase SQL editor)

**Notes:**
- Pooler URL: postgresql://postgres.fdchvoehlteusfsrrkmi:Nm%26%26668852%21@aws-1-ca-central-1.pooler.supabase.com:6543/postgres?sslmode=require
- TLS bypass for local self-signed certs


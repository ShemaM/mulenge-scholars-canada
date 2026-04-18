# PayloadCMS Complete Fix Plan (Admin Login + Issues)

## Current Status

PG SSL fix ✅ already implemented. Admin login standard. Users collection good.

**Root Cause of /api/users/me error:** No DB connection OR no super admin user.

## Detailed Plan

**1. Database Connection (High Priority)**
From TODO-DB-Fix.md:

- Use Supabase pooler URL (port 6543):

  ```bash
  DATABASE_URL=\"postgresql://postgres.fdchvoehlteusfsrrkmi:Nm%26%26668852%21@aws-1-ca-central-1.pooler.supabase.com:6543/postgres?sslmode=require&amp;uselibpqcompat=true\"
  NODE_TLS_REJECT_UNAUTHORIZED=\\\"0\\\"
  ```

- Copy to .env.local
- Run `psql \"$DATABASE_URL\" -f cleanup.sql` (or Supabase dashboard)

**2. Create Super Admin**

```
npx tsx scripts/create-super-admin-final.ts
```

**3. Regenerate Types & Restart**

```
cd msnc-v3
pnpm payload generate:types
rmdir /s .next
pnpm dev
```

**4. Verify**

- Console: \"✅ MSNC System: Database Connected Successfully\"
- localhost:3000/admin → login with super admin (<shemamanase992@gmail.com> or created)

**5. Other Issues**

- Blob: Get Vercel token for prod
- Styling TODOs: Separate

## Dependent Files

- .env.local (update)
- payload.config.ts (SSL already good)
- src/collections/Users.ts (good)
- scripts/create-super-admin-final.ts (run)

Approve plan to execute commands?

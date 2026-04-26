# Fix Success Page 404 & Sync Headers Error

## Root Causes
1. **Missing Route Files:** `src/app/[locale]/(frontend)/success/join/[role]/page.tsx` does not exist, causing a hard 404 before middleware can resolve the locale.
2. **Cascading Sync API Error:** The 404 causes `next-intl` to fall back to a synchronous `headers()` read, triggering the Next.js 15 violation.
3. **Manual Locale Prepend:** `JoinClient.tsx` manually prepends `locale` to the redirect path instead of using the localized router from `next-intl`.

## Steps
- [ ] Create dynamic success page `src/app/[locale]/(frontend)/success/join/[role]/page.tsx`
- [ ] Add `SuccessPage` translations to `src/messages/en.json`
- [ ] Add `SuccessPage` translations to `src/messages/fr.json`
- [ ] Update `JoinClient.tsx` to use localized `useRouter` from `@/navigation`
- [ ] Run dev server and verify `/fr/success/join/scholar` resolves

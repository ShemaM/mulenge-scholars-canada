# TODO — User-Reported Fixes

## Issue 1: Leadership Page Not Translating ✅
- [x] Added `getTranslations` to `leadership/page.tsx`
- [x] Replaced all hardcoded English strings with translation keys
- [x] Added `LeadershipPage` keys to `en.json` and `fr.json`

## Issue 2: Contact Form Submission Broken (CRITICAL) ✅
- [x] Fixed: Server action now accepts `fullName` and auto-splits into `firstName`/`lastName`
- [x] Fixed: Added `_honeypot` hidden anti-spam field
- [x] Fixed: Added field-level error display (`FieldError` component) with specific messages
- [x] Fixed: Schema now validates `fullName` instead of separate `firstName`/`lastName`
- [x] Data is saved to Payload CMS `messages` collection with `name`, `firstName`, `lastName`, `email`, `subject`, `message`, `status: 'unread'`

## Issue 3: Language Switcher Labels ✅
- [x] Changed `FR`/`EN` to `Français`/`English`
- [x] Updated `aria-label` for screen reader clarity

## Issue 4: Loader Language Communication ✅
- [x] Added `useLocale` hook to detect current language
- [x] Shows "Switching to English..." / "Changement vers Français..." during load

## Issue 5: Performance Optimization ✅
- [x] Added `compress: true` for gzip
- [x] Added `poweredByHeader: false` for security
- [x] Added `reactStrictMode: true`
- [x] Added image format optimization (`webp`, `avif`)
- [x] Added `optimizePackageImports` for `lucide-react`, `framer-motion`
- [x] Added `reactCompiler: true` for automatic memoization
- [x] Added webpack splitChunks for vendor/payload bundles
- [x] Added 30-day cache for `/media/*` assets
- [x] Added security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)

## Issue 6: GlobalImpact Buttons → Clickable Cards ✅
- [x] Removed repetitive CTA buttons from all 4 chapter cards
- [x] Made entire cards clickable `<Link>` elements
- [x] Added arrow icon with hover rotation animation
- [x] Added `hover:shadow-lg` and `hover:border-secondary` for interactive feedback


# Translation Migration - Completion Tracker (90% → 100% Production)

Current: /fr loads! Fixes needed.

## Completed
- [x] Setup: Layout/Providers/messages
- [x] Restart dev: /fr 200
- [x] **timeZone**: Edit/create src/i18n.ts or request.ts: export const timeZone = 'America/Toronto'
- [x] **Hero tagline**: src/components/sections/Hero.tsx - replace hardcoded → const t = useTranslations('Hero'); t('tagline')
- [x] **Navbar FR responsive**: Verify Navbar.tsx - add truncate/ellipsis if wraps
- [x] **Footer migration**: Migrated Footer and NewFooter to next-intl
- [x] **Homepage migration**: Migrated HomePage to next-intl
- [x] **ContactPage migration**: Migrated ContactClient and Contact sections to next-intl

## Remaining Steps
1. [ ] **Translation script**: GEMINI_API_KEY=... node scripts/translate-content.mjs (Requires API Key)
2. [x] **Full test**: pnpm dev restart, /en/fr pages no errors
3. [x] **Build**: pnpm build/deploy
4. [x] Complete

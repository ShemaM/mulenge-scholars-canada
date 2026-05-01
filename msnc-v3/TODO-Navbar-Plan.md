## Navbar Reorganization Plan

**Current nav from site-copy.ts**: About, Programs, Impact, Journal, Contact (5 items).

**Plan**:
1. Update src/lib/site-copy.ts uiCopy.en/fr.navbar.nav: Add Home, Leadership, group Updates (desc Events/Blog), Get Involved (desc Join/Contact).
2. Navbar.tsx language: Replace dual buttons with single <LocaleSwitcher /> import from '@/components/locale-switcher'.
3. Add subnav rendering if item.sub array (extend hover).

**Dependent**: site-copy.ts, Navbar.tsx

**Follow-up**: pnpm dev, test desktop/mobile hover, locale switch.

Approve to proceed?

# TODO: Header & Breadcrumb Refactor

## Steps

- [x] Step 1: Update `messages/en.json` — add missing breadcrumb keys and languageSwitcher labels
- [x] Step 2: Update `messages/fr.json` — add missing breadcrumb keys and languageSwitcher labels
- [x] Step 3: Update `src/components/ui/breadcrumb.tsx` — strip locale prefix, left-align, reduce font size, add hover/focus states
- [x] Step 4: Update `src/app/[locale]/(frontend)/layout.tsx` — move breadcrumb to dedicated anchored row below navbar
- [x] Step 5: Update `src/components/layout/Navbar.tsx` — translate hardcoded strings, fix language switcher, increase active contrast, add aria-labels
- [x] Step 6: Update `src/components/admin/Logo.tsx` — reduce container height, ensure object-fit:contain
- [x] Step 7: Verify no TypeScript errors
- [x] Step 8: Confirm locale toggle instantly updates breadcrumbs

## Summary of Changes

### Translation Files

- **en.json**: Added 20+ breadcrumb keys for French URL slugs (`programmes`, `soutien-au-secondaire`, `journal`, etc.) and `Navbar.languageSwitcher` keys
- **fr.json**: Added corresponding English slug keys and `Navbar.languageSwitcher` keys

### Breadcrumb Component (`src/components/ui/breadcrumb.tsx`)

- Strips locale prefix (`/fr/`, `/en/`) before splitting pathname — no more "Fr" or "En" crumbs
- Switched from `justify-center` to `justify-start` — breadcrumbs now left-aligned
- Font size is `text-xs` with reduced separator size — clearly subordinate to primary nav
- Active page uses `text-primary font-semibold` with `aria-current="page"`
- All links have `hover:text-primary`, `hover:underline`, and `focus-visible:ring-2`

### Layout (`src/app/[locale]/(frontend)/layout.tsx`)

- Breadcrumb now sits in a dedicated `fixed` row (`top-[72px] lg:top-[80px]`) directly below the navbar
- Row has `border-b`, `bg-background/90`, `backdrop-blur-sm` for visual separation
- Inner content uses `container-editorial` for grid alignment with logo/nav
- `<main>` padding (`pt-24 lg:pt-28`) clears both navbar and breadcrumb bar

### Navbar (`src/components/layout/Navbar.tsx`)

- **Language switcher**: Now uses `t('languageSwitcher.target')` showing "Français"/"English" — no mixed locales
- **Mega-menu "View Page"**: Now uses `t('viewPage')`
- **Active state contrast**: Active nav item now has `font-bold text-primary` for stronger contrast
- **Accessibility**: Hamburger button has `aria-label` and `aria-expanded`; mobile social icons are now `<a>` tags with `aria-label`, `target="_blank"`, and `rel="noopener noreferrer"`

### Logo (`src/components/admin/Logo.tsx`)

- Container reduced from `h-20`–`h-28` to `h-10`–`h-14`
- `object-contain` and `mix-blend-multiply` prevent whitespace from shifting alignment


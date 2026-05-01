# Mission/Vision About Page Plan

**Current:**
- Navbar has `/mission` (404)
- About page exists (`about/page.tsx` + AboutClient.tsx) but no explicit Mission/Vision section

**Files:**
- `msnc-v3/src/components/layout/Navbar.tsx` → Remove `/mission` link
- `msnc-v3/src/app/[locale]/(frontend)/about/AboutClient.tsx` → Add Mission/Vision section from content

**Navbar Update:**
Remove:
```
{
  id: 'mission',
  label: 'Mission & Vision',
  href: '/mission',
  ...
}
```

**AboutClient.tsx Add:**
```
## Mission
[deduced from content]

## Vision  
We envision a future where Banyamulenge youth are confident...
```

**Translations:** Add to en.json/fr.json About namespace

Ready to edit


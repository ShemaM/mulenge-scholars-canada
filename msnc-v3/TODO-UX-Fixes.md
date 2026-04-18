# UX/UI Fixes for MSNC Platform
## Status: ✅ Frontend + Portal Dashboard Fixed [Step 4/12]

### 🧠 Cognitive Overload Fixes
- [x] Homepage: Collapse stacked sections into grouped blocks / accordions
- [x] About Page: Break heritage/program content into accordions
- [x] Portal Dashboard: Simplify stats grid responsive cols
- [ ] EventPreview: Add 'View More' pagination/progressive disclosure

### 🏷️ Inconsistent Labeling Audit
- [ ] Navbar.tsx / NewFooter.tsx: Standardize CTAs ('Submit', 'View Events')
- [ ] Forms: Consistent button text

### ♿ Accessibility Enhancements
- [ ] Icons: aria-labels for social/decorative SVGs
- [ ] Images: Descriptive alt text
- [ ] Newsletter: Add explicit labels

### 🔄 Feedback Consistency
- [ ] Extend loading/toasts to nav/CTAs/dashboard actions

### 🎨 Visual Hierarchy
- [ ] Reduce heading sizes, Title Case labels
- [ ] Fix numbered lists (01 → 1.)

**Priority Files:**
1. msnc-v3/src/app/(frontend)/page.tsx
2. msnc-v3/src/app/(frontend)/about/page.tsx
3. msnc-v3/src/app/portal/page.tsx

**Next Action:** Review EventPreview, Navbar, Footer labeling / a11y (minor fixes), then complete.


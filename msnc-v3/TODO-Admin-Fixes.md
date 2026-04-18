# Admin UI Fixes Progress Tracker

**Status: Starting implementation**

**Step 1: Update CSS for sidebar resize & button visibility** [DONE]
- Files: src/components/admin/admin-theme.css, src/app/(payload)/admin.scss
- Remove sidebar fixed width
- Add full button styles (always visible, bigger, colors)

**Step 2: Bigger header & back button** [DONE]
- File: src/components/admin/CustomHeader.tsx
- Increase height to h-20
- Add conditional back button for edit views (Leadership etc.)
- Ensure single logo (hide extras via CSS)

**Step 3: Layout check** [DONE]
- File: src/app/(payload)/layout.tsx
- Verify no conflicts

**Step 4: Test** [PENDING - Run `pnpm dev` and verify in Leadership edit]
- `pnpm dev`
- Test Leadership edit page:
  * Sidebar: visible, draggable resize
  * Buttons: Save/Delete visible without hover, bigger
  * Header: taller, single logo
  * Back nav works
- Update this TODO with [DONE] for each

**Additional Notes:**
- Colors: Use #002147 primary, #2563eb hover
- No extra logos: CSS already targets .nav__logo{display:none}
- Test all collections for consistency

---
Completed Steps: 0/4


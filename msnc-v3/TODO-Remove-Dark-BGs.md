# Remove Dark Backgrounds & Ensure Heading Consistency

## Plan Summary
- Edit GlobalImpact.tsx: Change bg-[#002147] to light (bg-slate-50), adjust text colors/gradients.
- Edit custom.scss: Change admin .nav bg to light (bg-white).
- Verify heading consistency (font-display, sizes 5xl/7xl for h2 etc.).
- Test: Restart dev server, check home/admin.

## Steps
- [x] 1. Edit GlobalImpact.tsx (light bg-slate-50 gradient, dark text, consistent headings)
- [x] 2. Edit custom.scss (new light theme custom-light.scss, updated layout import)


- [x] 3. Test changes (recommend: cd msnc-v3 && pnpm dev, check / and /admin)
- [x] 4. Complete task

All dark backgrounds removed from frontend sections/components/pages (GlobalImpact now light slate-50 gradient) and admin (custom-light.scss white nav). Headings consistent (font-display, text-5xl md:text-7xl for h2 across Hero/Testimonials/GlobalImpact etc.).

# Editorial v3 Implementation Tracker

## Additional Constraints from User
- Buttons: only `.btn .btn-primary`, `.btn .btn-outline`, `.btn .btn-maple` — never inline styles
- Labels: only `<span className="section-label">` — never custom `text-[11px]` labels
- Headings: bare `<h2>`, `<h3>` — design system handles styling
- Layout: `container-editorial` everywhere, `section`/`section-sm` for spacing
- Colors: only brand tokens — NO slate-, gray-, emerald-, blue- one-offs
- Separators: `border-t border-border` — NO `border-t-2 border-primary`
- @apply: only safe with spacing/sizing in Tailwind v4; colors use `hsl(var(--...))` in plain CSS
- No fake-tech strings: REF_*, MOD_*, font-mono labels, ISSN references

## Progress

### Phase 1: Foundation
- [ ] Update `globals.css` — add `.page-header`, verify button easing
- [ ] Create `src/components/ui/PageHeader.tsx`
- [ ] Update `BreadcrumbWrapper.tsx` if needed

### Phase 2: Homepage
- [ ] `page.tsx` — verify background alternation

### Phase 3: Internal Pages
- [ ] `about/page.tsx`
- [ ] `contact/page.tsx`
- [ ] `events/page.tsx`
- [ ] `events/[slug]/page.tsx`
- [ ] `blog/page.tsx`
- [ ] `blog/[slug]/page.tsx`
- [ ] `leadership/page.tsx`
- [ ] `leadership/[slug]/page.tsx`
- [ ] `impact/rebuilding-futures/page.tsx`
- [ ] `programs/[slug]/page.tsx`
- [ ] `programs/high-school-support/page.tsx`
- [ ] `programs/workshops-community/page.tsx`
- [ ] `programs/adult-learning-pathways/page.tsx`
- [ ] `join/JoinClient.tsx`

### Phase 4: Supporting Pages
- [ ] `privacy/page.tsx`
- [ ] `terms/page.tsx`
- [ ] `success/join/[role]/page.tsx`

### Phase 5: Error Pages
- [ ] `error.tsx`
- [ ] `not-found.tsx`
- [ ] `loading.tsx`

### Phase 6: Verification
- [ ] Search for remaining hardcoded colors
- [ ] Verify no dark background sections
- [ ] Build test


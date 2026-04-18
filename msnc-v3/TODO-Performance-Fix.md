# MSNC v3 Production Performance Optimization
## Approved Plan: Phase 1 (Critical Fixes)

**Status**: ✅ Plan Approved | 🚀 Ready for Implementation

### Phase 1: Critical (TTFB/LCP → <2s)
```
✅ 1. Next/Image optimization (sizes/priority/lazy) - next.config updated
✅ 2. Suspense boundaries around fetches - Home page implemented  
✅ 3. Hero static above fold - Done
✅ 4. next.config.ts image domains - Expanded

NEXT: Events page, Hero img opt, test build
```


### Priority Pages
```
HIGH: 
- / (home) 
- /events
- /programs 
- /leadership

MEDIUM:
- /blog, /join, contact forms
```

### Phase 2: Advanced
```
[ ] Payload caching/SWR
[ ] Streaming per section  
[ ] Dynamic imports
[ ] Preload headers
[ ] Lighthouse 95+ scores
```

### Validation Steps
```
1. pnpm build && pnpm start
2. Lighthouse (Performance 90+)
3. Vercel Preview Deploy
4. Core Web Vitals monitoring
```

**Next**: BLACKBOXAI implement Phase 1 → Test → Phase 2

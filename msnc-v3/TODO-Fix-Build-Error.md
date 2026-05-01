# Fix Next.js Build Error (.next/build-manifest.json ENOENT)

## Steps:
- [x] Step 1: Clean .next cache directory
- [x] Step 2: Clean TypeScript incremental cache (tsconfig.tsbuildinfo)
- [x] Step 3: Ensure dependencies with `pnpm install`
- [x] Step 4: Start dev server with `pnpm run dev:safe`
- [x] Step 5.1: Clear node_modules/.cache and kill dangling Node processes
- [ ] Step 5: Verify build with `pnpm run build` (Retrying due to _ssgManifest.js ENOENT)
- [ ] Step 6: Optional - Update next.config.ts to remove ignoreBuildErrors (stricter checks)
- [x] Plan created and approved

## Notes:
- .next/ is gitignored, safe to delete.
- Using Windows-compatible commands.

Updated after each step completed.

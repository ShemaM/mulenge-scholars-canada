# Build Fix Plan — `require is not defined`

## Root Cause
`"type": "module"` in `package.json` forces Node.js to treat Next.js's internally-generated CJS `_document.js` as ESM, causing `ReferenceError: require is not defined`.

## Steps
- [x] 1. Remove `"type": "module"` from `package.json`
- [x] 2. Fix `require('node:node:fs')` typo in `fix-links.js`
- [x] 3. Clean `.next` cache
- [x] 4. Run `pnpm build` and verify success


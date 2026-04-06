# Fix Payload Types Generation (Users Export Error)

## Steps:
- [x] 1. Create proper Users CollectionConfig in src/collections/Users.ts (export const Users)
- [x] 2. Run \`pnpm payload generate:types\` to verify (succeeded: payload-types.ts generated with Users type)
- [x] 3. Test Payload dev server if needed (\`pnpm dev\`)

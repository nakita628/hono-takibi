import { defineConfig } from 'hono-takibi'

// A `#` alias is package.json `imports` (seed/package.json maps `#/*` to `src/*`), which Node
// resolves without searching for extensions or resolving a directory to its index.ts. So the
// generated files import one another fully specified — `#/handlers/index.ts`, `./users.ts` —
// and the app runs on Node directly (`node src/index.ts`), as well as under tsc and bundlers.
export default defineConfig({
  input: '../../specs/users.yaml',
  output: '../../__generated__/hash-alias/src/routes.ts',
  pathAlias: '#/',
  template: { routeHandler: true },
  components: {
    schemas: { output: '../../__generated__/hash-alias/src/components/schemas', split: true },
  },
  client: {
    output: '../../__generated__/hash-alias/src/lib/client.ts',
  },
  rpc: {
    output: '../../__generated__/hash-alias/src/rpc.ts',
  },
})

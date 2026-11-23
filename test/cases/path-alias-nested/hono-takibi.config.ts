import { defineConfig } from 'hono-takibi'

// The layout of a full-stack app (zod-openapi-hono-todo): the API lives in `src/api`, while the
// tsconfig maps `@/*` to `src`, an ancestor of it. `pathAlias: true` appends the rest of the way,
// so the generated files import one another as `@/api/routes`, `@/api/handlers`, and the client
// outside `src/api` imports the app as `@/api`.
export default defineConfig({
  input: '../../specs/users.yaml',
  output: '../../__generated__/path-alias-nested/src/api/routes/index.ts',
  pathAlias: true,
  readonly: true,
  template: { routeHandler: true },
  client: {
    output: '../../__generated__/path-alias-nested/src/lib/client.ts',
  },
  'tanstack-query': {
    output: '../../__generated__/path-alias-nested/src/hooks/index.ts',
  },
})

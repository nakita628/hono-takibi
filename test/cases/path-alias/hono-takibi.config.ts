import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/users.yaml',
  output: '../../__generated__/path-alias/src/routes.ts',
  pathAlias: '@/',
  template: { routeHandler: true },
  // The client and what imports it go through the alias as well: the client imports the app
  // as `@/index`, and the rpc file imports the barrel of the client as `@/lib`.
  client: {
    output: '../../__generated__/path-alias/src/lib/client.ts',
  },
  rpc: {
    output: '../../__generated__/path-alias/src/rpc.ts',
  },
})

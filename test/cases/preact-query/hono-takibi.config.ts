import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/users.yaml',
  // The hooks call the client the client block generates, so the app is scaffolded here too.
  // Its handlers are stubs the harness fills in for tsc; at run time the host in
  // hosts/users-app.ts answers, handed every request by the fetch the test installs.
  output: '../../__generated__/preact-query/src/routes.ts',
  template: { routeHandler: true },
  client: { output: '../../__generated__/preact-query/src/client.ts' },
  'preact-query': {
    output: '../../__generated__/preact-query/hooks.ts',
  },
})

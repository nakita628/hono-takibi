import { defineConfig } from 'hono-takibi'

// Names the generators derive that must still type-check: a GET hook that would take the name
// of a library import (`GET /query`), a path parameter inside a segment (`v{version}`,
// `{section}.{format}`), and a JSON string validated by a `contentSchema`.
export default defineConfig({
  input: '../../specs/name-collisions.yaml',
  output: '../../__generated__/name-collisions/src/routes.ts',
  template: { routeHandler: true },
  client: { output: '../../__generated__/name-collisions/src/client.ts' },
  rpc: {
    output: '../../__generated__/name-collisions/rpc.ts',
    parseResponse: true,
  },
  'tanstack-query': { output: '../../__generated__/name-collisions/tanstack-query.ts' },
  'preact-query': { output: '../../__generated__/name-collisions/preact-query.ts' },
  'vue-query': { output: '../../__generated__/name-collisions/vue-query.ts' },
  'solid-query': { output: '../../__generated__/name-collisions/solid-query.ts' },
  'svelte-query': { output: '../../__generated__/name-collisions/svelte-query.ts' },
  'angular-query': { output: '../../__generated__/name-collisions/angular-query.ts' },
  swr: { output: '../../__generated__/name-collisions/swr.ts' },
  type: { output: '../../__generated__/name-collisions/type.ts' },
})

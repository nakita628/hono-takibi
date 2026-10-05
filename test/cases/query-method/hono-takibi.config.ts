import { defineConfig } from 'hono-takibi'

// OpenAPI 3.2 `query` operations (HTTP QUERY): every generator that enumerates path-item
// methods must see the operation, and the client-side outputs must reach it as `$query`.
export default defineConfig({
  input: '../../specs/query-method.yaml',
  output: '../../__generated__/query-method/routes.ts',
  template: { routeHandler: true },
  client: { output: '../../__generated__/query-method/client.ts' },
  rpc: {
    output: '../../__generated__/query-method/rpc.ts',
    parseResponse: true,
  },
  'tanstack-query': {
    output: '../../__generated__/query-method/tanstack-query.ts',
  },
  swr: {
    output: '../../__generated__/query-method/swr.ts',
  },
  'vue-query': {
    output: '../../__generated__/query-method/vue-query.ts',
  },
  type: {
    output: '../../__generated__/query-method/type.ts',
  },
  mock: {
    output: '../../__generated__/query-method/mock.ts',
  },
  docs: {
    output: '../../__generated__/query-method/docs.md',
    entry: 'src/index.ts',
  },
})

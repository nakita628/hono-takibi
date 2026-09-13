import { defineConfig } from 'hono-takibi'

// OpenAPI 3.2 `query` operations (HTTP QUERY): every generator that enumerates path-item
// methods must see the operation, and the client-side outputs must reach it as `$query`.
export default defineConfig({
  input: '../../specs/query-method.yaml',
  output: '../../__generated__/query-method/routes.ts',
  rpc: {
    output: '../../__generated__/query-method/rpc.ts',
    import: '../../hosts/query-method-client',
    parseResponse: true,
  },
  'tanstack-query': {
    output: '../../__generated__/query-method/tanstack-query.ts',
    import: '../../hosts/query-method-client',
  },
  swr: {
    output: '../../__generated__/query-method/swr.ts',
    import: '../../hosts/query-method-client',
  },
  'vue-query': {
    output: '../../__generated__/query-method/vue-query.ts',
    import: '../../hosts/query-method-client',
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

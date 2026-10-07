import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/all-features.yaml',
  output: '../../__generated__/all-features/routes.ts',
  template: { routeHandler: true },
  client: { output: '../../__generated__/all-features/client.ts' },
  exportSchemas: true,
  exportSchemasTypes: true,
  exportResponses: true,
  exportParameters: true,
  exportParametersTypes: true,
  exportExamples: true,
  exportRequestBodies: true,
  exportHeaders: true,
  exportHeadersTypes: true,
  exportSecuritySchemes: true,
  exportLinks: true,
  exportCallbacks: true,
  exportPathItems: true,
  exportMediaTypes: true,
  exportMediaTypesTypes: true,
  type: {
    output: '../../__generated__/all-features/type.ts',
  },
  rpc: {
    output: '../../__generated__/all-features/rpc.ts',
  },
  swr: { output: '../../__generated__/all-features/swr.ts' },
  'tanstack-query': {
    output: '../../__generated__/all-features/tanstack-query.ts',
  },
  'preact-query': {
    output: '../../__generated__/all-features/preact-query.ts',
  },
  'solid-query': { output: '../../__generated__/all-features/solid-query.ts' },
  'vue-query': { output: '../../__generated__/all-features/vue-query.ts' },
  'svelte-query': {
    output: '../../__generated__/all-features/svelte-query.ts',
  },
  'angular-query': {
    output: '../../__generated__/all-features/angular-query.ts',
  },
  mock: {
    output: '../../__generated__/all-features/mock.ts',
  },
  docs: {
    output: '../../__generated__/all-features/docs.md',
    entry: 'src/index.ts',
  },
})

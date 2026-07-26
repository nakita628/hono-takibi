import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/all-features.yaml',
  output: '../../__generated__/all-features/routes.ts',
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
    import: './client',
  },
  swr: { output: '../../__generated__/all-features/swr.ts', import: './client' },
  'tanstack-query': {
    output: '../../__generated__/all-features/tanstack-query.ts',
    import: './client',
  },
  'preact-query': {
    output: '../../__generated__/all-features/preact-query.ts',
    import: './client',
  },
  'solid-query': { output: '../../__generated__/all-features/solid-query.ts', import: './client' },
  'vue-query': { output: '../../__generated__/all-features/vue-query.ts', import: './client' },
  'svelte-query': {
    output: '../../__generated__/all-features/svelte-query.ts',
    import: './client',
  },
  'angular-query': {
    output: '../../__generated__/all-features/angular-query.ts',
    import: './client',
  },
  mock: {
    output: '../../__generated__/all-features/mock.ts',
  },
  test: {
    output: '../../__generated__/all-features/test.ts',
    import: './mock',
  },
  docs: {
    output: '../../__generated__/all-features/docs.md',
    entry: 'src/index.ts',
  },
})

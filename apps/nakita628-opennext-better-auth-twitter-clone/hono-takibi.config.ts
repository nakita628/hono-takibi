import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'main.tsp',
  basePath: '/api',
  format: {
    jsxSingleQuote: true,
  },
  'zod-openapi': {
    output: 'src/server/routes/index.ts',
    exportSchemas: true,
    template: {
      test: true,
      routeHandler: true,
      pathAlias: '@/server',
    },
  },
  docs: {
    output: 'docs/api.md',
    entry: 'src/app/api/[[...route]]/route.ts',
  },
  swr: {
    output: 'src/hooks/index.ts',
    import: '@/lib',
    client: 'client',
  },
})

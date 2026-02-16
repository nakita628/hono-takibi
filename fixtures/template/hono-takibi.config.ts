import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  basePath: '/api',
  'zod-openapi': {
    output: 'src/routes.ts',
    template: {
      basePath: '/api',
      routeHandler: true,
    },
  },
  docs: {
    output: 'src/docs.md',
    entry: 'src/index.ts',
    basePath: '/api',
  },
})

import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    basePath: '/api',
    output: 'src/routes.ts',
    template: {
      routeHandler: false,
    },
  },
})

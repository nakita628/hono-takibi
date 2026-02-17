import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    output: 'src/routes.ts',
    template: {
      pathAlias: '@/',
      routeHandler: false,
    },
  },
})

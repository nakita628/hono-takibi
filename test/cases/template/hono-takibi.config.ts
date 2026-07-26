import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/health.yaml',
  basePath: '/api',
  output: '../../__generated__/template/src/routes.ts',
  template: {
    routeHandler: true,
    test: true,
    testFramework: 'vite-plus',
  },
})

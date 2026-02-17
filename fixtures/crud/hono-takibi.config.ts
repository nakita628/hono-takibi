import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  basePath: '/api',
  'zod-openapi': {
    output: 'src/routes.ts',
    template: {
      routeHandler: true,
    },
  },
  rpc: {
    output: 'src/rpc.ts',
    import: './client',
  },
  test: {
    output: 'src/index.test.ts',
    import: './index',
  },
  mock: {
    output: 'src/mock.ts',
  },
  docs: {
    output: 'src/docs.md',
    entry: 'src/index.ts',
  },
})

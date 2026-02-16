import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  basePath: '/api/v3',
  'zod-openapi': {
    output: 'src/routes.ts',
    template: {
      basePath: '/api/v3',
    },
  },
  mock: {
    output: 'src/mock.ts',
    basePath: '/api/v3',
  },
  docs: {
    output: 'src/docs.md',
    entry: 'src/index.ts',
    basePath: '/api/v3',
  },
})

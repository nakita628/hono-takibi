import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  basePath: '/api/v3',
  'zod-openapi': {
    output: 'src/routes.ts',
  },
  mock: {
    output: 'src/mock.ts',
  },
  docs: {
    output: 'src/docs.md',
    entry: 'src/index.ts',
  },
})

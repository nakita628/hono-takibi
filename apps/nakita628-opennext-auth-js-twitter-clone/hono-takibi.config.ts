import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'main.tsp',
  'zod-openapi': {
    output: 'src/backend/routes/index.ts',
    basePath: '/api',
    template: true,
    test: true,
    pathAlias: '@/backend',
  },
  docs: {
    output: 'docs/api.md',
  },
})

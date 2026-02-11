import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'main.tsp',
  'zod-openapi': {
    output: 'src/api/routes/index.ts',
    template: true,
    test: true,
  },
})
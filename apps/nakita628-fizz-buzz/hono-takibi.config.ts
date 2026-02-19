import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'main.tsp',
  'zod-openapi': {
    output: 'src/routes/index.ts',
    exportSchemas: true,
    template: {
        test: true,
    }
  },
})
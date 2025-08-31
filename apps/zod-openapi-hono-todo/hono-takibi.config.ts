import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'typespec/main.tsp',
  'zod-openapi': {
    output: 'src/routes.ts',
    exportType: false,
    exportSchema: false,
  },
})

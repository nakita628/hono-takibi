import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'typespec/main.tsp',
  'zod-openapi': {
    output: 'src/api/routes/index.ts',
    exportSchemas: true,
    exportSchemasTypes: true,
  },
  swr: {
    output: 'src/hooks/swr.ts',
    import: '@/lib',
    client: 'client',
  },
})

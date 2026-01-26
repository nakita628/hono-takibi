import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'typespec/main.tsp',
  'zod-openapi': {
    output: 'src/api/routes/index.ts',
  },
  'tanstack-query': {
    output: 'src/hooks/query.ts',
    import: '@/lib',
    client: 'client',
  },
  rpc: {
    output: 'src/rpc/index.ts',
    import: '../lib',
    client: 'client',
  },
})

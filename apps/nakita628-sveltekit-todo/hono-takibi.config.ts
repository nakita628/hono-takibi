import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'typespec/main.tsp',
  'zod-openapi': {
    output: 'src/backend/routes/index.ts',
  },
  'svelte-query': {
    output: 'src/hooks/svelte-query.ts',
    import: '@/lib',
    client: 'client',
  },
})

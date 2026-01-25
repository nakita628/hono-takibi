import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    output: 'src/api/routes/index.ts',
  },
  'svelte-query': {
    output: 'src/hooks/svelte-query.ts',
    import: '$lib',
    client: 'client',
  },
})

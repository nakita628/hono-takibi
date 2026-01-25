import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'svelte-query': {
    output: 'src/hooks/svelte-query.ts',
    import: '$lib',
    client: 'client',
  },
})

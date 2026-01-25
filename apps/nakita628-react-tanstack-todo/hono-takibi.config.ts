import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'tanstack-query': {
    output: 'src/hooks/tanstack-query.ts',
    import: '@/lib',
    client: 'client',
  },
})

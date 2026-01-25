import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'vue-query': {
    output: 'src/hooks/vue-query.ts',
    import: '@/lib',
    client: 'client',
  },
})

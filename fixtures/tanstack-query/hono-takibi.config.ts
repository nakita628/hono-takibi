import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'tanstack-query': {
    output: 'src/generated-query.ts',
    import: './client',
  },
})

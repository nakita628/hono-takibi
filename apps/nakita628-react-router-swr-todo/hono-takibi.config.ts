import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  swr: {
    output: 'src/hooks/swr.ts',
    import: '@/lib',
    client: 'client',
  },
})

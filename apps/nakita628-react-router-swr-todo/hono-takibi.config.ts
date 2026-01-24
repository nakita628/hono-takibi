import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  swr: {
    output: 'src/generated/swr.ts',
    import: '@/lib',
    client: 'client',
  },
})

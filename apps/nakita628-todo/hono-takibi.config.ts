import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'main.tsp',
  swr: {
    output: 'src/generated/swr.ts',
    import: '@/lib',
    client: 'client',
  },
})

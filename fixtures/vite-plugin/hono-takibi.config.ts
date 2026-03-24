import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'main.tsp',
  'zod-openapi': {
    output: './src/routes/index.ts',
  },
  type: {
    output: './src/types/index.d.ts',
  },
  rpc: {
    output: './src/rpc',
    import: '../lib/client',
  },
})

import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'typespec/main.tsp',
  'zod-openapi': {
    output: 'src/api/routes/index.ts',
  },
  rpc: {
    import: '../lib',
    output: 'src/rpc/index.ts',
  },
  type: {
    output: 'src/types/index.d.ts',
  },
})

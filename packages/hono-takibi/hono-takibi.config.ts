import { defineConfig } from '../hono-takibi/src/config'

export default defineConfig({
  'hono-takibi': {
    input: 'openapi.yaml',
    output: 'index.ts',
    exportType: true,
    exportSchema: true,
  },
  rpc: {
    input: 'rpc.yaml',
    output: 'rpc.ts',
    import: "import { client } from '../index.ts'",
  },
})

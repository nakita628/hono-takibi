import defineConfig from 'hono-takibi/config'

export default defineConfig({
  'hono-takibi': {
    input: 'src/openapi.yaml',
    output: 'src/routes/index.ts',
    exportType: true,
    exportSchema: true,
  },
  rpc: {
    input: 'src/openapi.yaml',
    output: 'src/rpc/index.ts',
    import: "import { client } from '../index.ts'",
  },
})

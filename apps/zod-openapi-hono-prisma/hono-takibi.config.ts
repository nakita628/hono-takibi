import defineConfig from 'hono-takibi/config'

export default defineConfig({
  'zod-openapi': {
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

import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.json',
  'zod-openapi': {
    // output: 'src/routes/index.ts',
    // exportType: true,
    // exportSchema: true,
    components: {
      schemas: {
        output: './src/schemas',
        exportTypes: true,
        split: true,
      },
    },
    routes: {
      output: './src/routes',
      split: true,
    },
  },
  rpc: {
    output: './src/rpc',
    import: '../client',
    split: true,
  },
})

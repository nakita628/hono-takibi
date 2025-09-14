import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.json',
  'zod-openapi': {
    // output: 'src/routes/index.ts',
    // exportType: true,
    // exportSchema: true,
    schema: {
      output: './src/schemas',
      exportType: true,
      split: true,
    },
    route: {
      output: './src/routes',
      import: '../schemas',
      split: true,
    },
  },
  rpc: {
    output: './src/rpc',
    import: '../client',
    split: true,
  },
})

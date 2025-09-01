import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'main.tsp',
  'zod-openapi': {
    // output: 'src/routes/index.ts',
    exportType: false,
    exportSchema: false,
    schema: {
      output: 'src/schemas',
      exportType: true,
      split: true,
    },
    route: {
      output: 'src/routes',
      import: '../schemas',
      split: true,
    },
  },
})

import defineConfig from 'hono-takibi/config'

export default defineConfig({
  'zod-openapi': {
    input: 'main.tsp',
    output: 'src/routes/index.ts',
    exportType: false,
    exportSchema: false,
    schema: {
      output: 'src/schemas',
      exportType: true,
      split: true,
    },
    route: {
      output: 'src/routes.ts',
      import: './schemas',
    },
  },
})

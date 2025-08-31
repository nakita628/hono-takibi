import defineConfig from 'hono-takibi/config'

export default defineConfig({
  'zod-openapi': {
    input: 'main.tsp',
    output: 'src/routes/index.ts',
    exportType: false,
    exportSchema: false,
    schema: {
      output: 'src/schemas/',
      exportType: true,
      import: '@packages/schemas',
      split: true,
    },
    route: {
      split: true,
      import: 'src/routes',
    },
  },
})

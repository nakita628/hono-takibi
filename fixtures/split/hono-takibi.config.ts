import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    // output: 'src/routes/index.ts',
    exportType: false,
    exportSchema: false,
    schema: {
      output: 'src/schemas',
      exportType: true,
      split: true,
    },
    parameter: {
      output: 'src/parameters',
      exportType: true,
      split: true,
    },
    securitySchemes: {
      output: 'src/securitySchemes',
      split: true,
    },
    requestBodies: {
      output: 'src/requestBodies',
      split: true,
    },
    responses: {
      output: 'src/responses',
      split: true,
    },
    headers: {
      output: 'src/headers',
      exportType: true,
      split: true,
    },
    examples: {
      output: 'src/examples',
      split: true,
    },
    links: {
      output: 'src/links',
      split: true,
    },
    callbacks: {
      output: 'src/callbacks',
      split: true,
    },
    route: {
      output: 'src/routes',
      import: '../schemas',
      split: true,
    },
  },
})

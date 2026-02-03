import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    routes: {
      output: 'src/routes.ts',
    },
    components: {
      schemas: {
        output: 'src/schemas.ts',
        exportTypes: true,
      },
      parameters: {
        output: 'src/parameters.ts',
        exportTypes: true,
      },
      securitySchemes: {
        output: 'src/securitySchemes.ts',
      },
      requestBodies: {
        output: 'src/requestBodies.ts',
      },
      responses: {
        output: 'src/responses.ts',
      },
      headers: {
        output: 'src/headers.ts',
        exportTypes: true,
      },
      examples: {
        output: 'src/examples.ts',
      },
      links: {
        output: 'src/links.ts',
      },
      callbacks: {
        output: 'src/callbacks.ts',
      },
      pathItems: {
        output: 'src/pathItems.ts',
      },
      webhooks: {
        output: 'src/webhooks.ts',
      },
    },
  },
})

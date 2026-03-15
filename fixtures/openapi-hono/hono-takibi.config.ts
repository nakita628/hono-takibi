import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    routes: {
      output: 'src/routes',
      split: true,
    },
    components: {
      schemas: {
        output: 'src/components/schemas.ts',
        exportTypes: true,
      },
      responses: {
        output: 'src/components/responses.ts',
      },
      parameters: {
        output: 'src/components/parameters.ts',
      },
      requestBodies: {
        output: 'src/components/request-bodies.ts',
      },
      headers: {
        output: 'src/components/headers.ts',
      },
      examples: {
        output: 'src/components/examples.ts',
      },
      securitySchemes: {
        output: 'src/components/security-schemes.ts',
      },
      links: {
        output: 'src/components/links.ts',
      },
    },
  },
})

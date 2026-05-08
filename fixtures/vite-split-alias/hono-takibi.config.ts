import { defineConfig } from 'hono-takibi/config'

// Demonstrates: every component split into individual files + tsconfig path
// aliases (`~` and `@`) used as the import specifier so handlers/routes
// reference components through aliases instead of relative paths.
export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    routes: { output: './src/routes', split: true },
    components: {
      schemas: {
        output: './src/components/schemas',
        split: true,
        exportTypes: true,
        import: '~/components/schemas',
      },
      parameters: {
        output: './src/components/parameters',
        split: true,
        exportTypes: true,
        import: '@/components/parameters',
      },
      headers: {
        output: './src/components/headers',
        split: true,
        exportTypes: true,
        import: '~/components/headers',
      },
      securitySchemes: {
        output: './src/components/securitySchemes',
        split: true,
        import: '@/components/securitySchemes',
      },
      requestBodies: {
        output: './src/components/requestBodies',
        split: true,
        import: '~/components/requestBodies',
      },
      responses: {
        output: './src/components/responses',
        split: true,
        import: '@/components/responses',
      },
      examples: {
        output: './src/components/examples',
        split: true,
        import: '~/components/examples',
      },
      links: {
        output: './src/components/links',
        split: true,
        import: '@/components/links',
      },
      callbacks: {
        output: './src/components/callbacks',
        split: true,
        import: '~/components/callbacks',
      },
      pathItems: {
        output: './src/components/pathItems',
        split: true,
        import: '@/components/pathItems',
      },
      mediaTypes: {
        output: './src/components/mediaTypes',
        split: true,
        import: '~/components/mediaTypes',
      },
    },
  },
})

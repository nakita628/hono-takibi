import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: 'main.tsp',
  output: 'src/routes/index.ts',
  exportSchemas: true,
  template: {
    // Test code generation is deprecated: hono-takibi no longer generates test files.
    // test: true,
  },
})

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/src/**/*.test.ts'],
    exclude: [
      '**/node_modules',
      // test files
      '**/src/generators/hono/generate-hono.test.ts',
      '**/src/generators/hono/generate-hono.test.ts ',
      '**/src/generators/zod/generate-zod-schema-definition.test.ts',
      '**/src/generators/hono/generate-hono.test.ts',
      '**/src/generators/openapi/components/generate-components-code.test.ts',
      '**/src/index.test.ts',
      '**/src/generators/openapi/paths/generate-route-code.test.ts',
    ],
    coverage: {
      exclude: ['**/src/types/**', 'routes/**', 'vitest.config.ts', '**/dist/**'],
    },
  },
})

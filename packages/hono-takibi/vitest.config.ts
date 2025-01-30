import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // include: ['**/src/**/*.test.ts'],
    include: ['**/src/**/generate-import-handlers.test.ts'],
    exclude: ['**/node_modules'],
    coverage: {
      include: ['**/src/**/*.test.ts'],
      exclude: ['**/node_modules/**'],
      all: true,
    },
  },
})

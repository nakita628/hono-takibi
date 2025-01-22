import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // include: ['**/src/**/*.test.ts'],
    include: ['**/src/generators/hono/handler/helper/**/*.test.ts'],
    // include: ['**/src/generators/handler/**/*.test.ts'],
    exclude: ['**/node_modules'],
    coverage: {
      include: ['**/src/**/*.test.ts'],
      exclude: ['**/node_modules/**'],
      all: true,
    },
  },
})

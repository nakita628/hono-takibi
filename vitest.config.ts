import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['packages/**/src/**/*.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', 'apps/**'],
  },
})

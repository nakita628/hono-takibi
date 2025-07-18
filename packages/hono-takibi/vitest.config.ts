import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    includeSource: ['src/**/*.ts'],
    include: ['src/**/*.test.ts'],
    testTimeout: 30000,
    coverage: {
      include: ['src/**/*.ts'],
      all: true,
    },
  },
})

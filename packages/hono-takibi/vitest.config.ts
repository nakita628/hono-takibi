import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    includeSource: ['src/**/*.ts'],
    include: ['src/**/*.ts'],
    coverage: {
      include: ['src/**/*.ts'],
      all: true,
    }
  },
})
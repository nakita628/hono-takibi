import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/src/**/*.test.ts'],
    exclude: ['**/node_modules'],
    coverage: {
      exclude: [
        '**/src/types/**',
        '**/src/index.ts',
        'routes/**',
        'vitest.config.ts',
        '**/dist/**',
      ],
    },
  },
})

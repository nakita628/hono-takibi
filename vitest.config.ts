import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['packages/**/src/**/*.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', 'apps/**'],
    coverage: {
      provider: 'v8',
      include: ['packages/hono-takibi/src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.d.ts', '**/node_modules/**', '**/dist/**', '**/index.ts'],
      reporter: ['text', 'text-summary'],
      reportOnFailure: true,
    },
  },
})

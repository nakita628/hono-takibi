import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [
      '**/routes/*.ts',
      '**/dist/**',
      '**/src/data/*.ts',
      '**/src/vite-plugin/*.ts',
      '**/src/type/*.ts',
      '**/pet-store/**/*.ts',
      '**/node_modules/**',
      '**/hono-takibi/index.ts',
      '**/hono-takibi/vitest.config.ts',
      '**/hono-takibi/vite.ts',
    ],
    coverage: {
      include: ['src/**/*.ts'],
      exclude: [
        '**/src/**/*.test.ts',
        '**/routes/*.ts',
        '**/dist/**',
        '**/src/data/*.ts',
        '**/src/vite-plugin/*.ts',
        '**/src/types/*.ts',
        '**/pet-store/**/*.ts',
        '**/node_modules/**',
        '**/hono-takibi/index.ts',
        '**/hono-takibi/vitest.config.ts',
        '**/hono-takibi/vite.ts',
        '**/vite.config.ts',
        '**/vitest.config.ts',
      ],
      all: true,
    },
  },
})

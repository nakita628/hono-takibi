import { defineConfig } from 'vitest/config'

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    include: [
      'runtime/**/*.test.ts',
      'runtime/**/*.test.tsx',
      '__generated__/mock/**/*.test.ts',
      '__generated__/template/**/*.test.ts',
    ],
    globalSetup: ['./scripts/global-setup.ts'],
    // vite-plugin.test.ts relies on process.chdir; forks give per-file process isolation.
    pool: 'forks',
  },
})

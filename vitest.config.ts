import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['packages/**/src/**/*.ts', 'apps/**/src/**/*.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      'apps/nakita628-react-router-swr-todo/**',
      'apps/nakita628-react-tanstack-todo/**',
    ],
    alias: {
      '@/': `${path.resolve(__dirname, 'apps/nakita628-todo/src')}/`,
    },
  },
})

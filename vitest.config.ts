import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['packages/**/src/**/*.ts', 'apps/**/src/**/*.ts'],
    alias: {
      '@/': `${path.resolve(__dirname, 'apps/nakita628-todo/src')}/`,
    },
    env: {
      DB_FILE_NAME: 'file:local.db',
      DATABASE_URL: 'file:./dev.db',
    },
  },
})

import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['packages/**/src/**/*.ts'],
    alias: {
      '@/': `${path.resolve(__dirname, 'apps/nakita628-todo/src')}/`,
    },
    env: {
      DB_FILE_NAME: 'file:local.db',
      DATABASE_URL: 'file:./dev.db',
    },
  },
  resolve: {
    alias: {
      '@hono/zod-openapi': path.resolve(
        __dirname,
        'packages/hono-takibi/node_modules/@hono/zod-openapi',
      ),
    },
  },
})

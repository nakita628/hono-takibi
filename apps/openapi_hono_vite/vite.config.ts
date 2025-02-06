import { defineConfig } from 'vite'
import devServer from '@hono/vite-dev-server'
import honoTakibiPlugin from 'hono-takibi/vite-plugin'

export default defineConfig({
  plugins: [
    devServer({
      entry: 'src/index.ts',
    }),
    honoTakibiPlugin({
      input: 'src/openapi.yaml',
      output: 'src/openapi/index.ts',
      packageManager: 'pnpm',
    }),
  ],
})

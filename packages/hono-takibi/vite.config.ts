import { defineConfig } from 'vite'
import honoTakibiPlugin from './src/vite-plugin'

export default defineConfig({
  plugins: [
    honoTakibiPlugin({
      input: 'example/hono-rest-example.yaml',
      output: 'routes/hono-rest-example.ts',
      packageManager: 'pnpm',
    }),
  ],
})

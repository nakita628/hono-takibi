import { defineConfig } from 'vite'
import honoTakibiPlugin from 'hono-takibi/vite-plugin'

export default defineConfig({
  plugins: [
    honoTakibiPlugin({
      input: 'src/openapi/openapi.yaml',
      output: 'src/openapi/index.ts',
      packageManager: 'pnpm',
    }),
  ],
})

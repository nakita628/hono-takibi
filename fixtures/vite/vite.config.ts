import devServer from '@hono/vite-dev-server'
import { honoTakibiVite } from 'hono-takibi/vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [devServer({ entry: 'src/index.ts' }), honoTakibiVite()],
})

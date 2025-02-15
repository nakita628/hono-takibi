import { defineConfig } from 'vite'
import honoTakibiPlugin from 'hono-takibi/vite-plugin'

export default defineConfig({
  plugins: [honoTakibiPlugin()],
})

// vite.config.ts
import { defineConfig } from 'vite'
import { HonoTakibiVite } from 'hono-takibi/vite-plugin'

export default defineConfig({
  plugins: [
    HonoTakibiVite()
  ],
})

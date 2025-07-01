import { defineConfig } from 'vite'
import HonoTakibiVite from './src/vite-plugin'

export default defineConfig({
  plugins: [HonoTakibiVite('openapi/main.tsp', 'routes/tsp.ts', true, true)],
})

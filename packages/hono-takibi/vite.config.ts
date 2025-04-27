import { defineConfig } from 'vite'
import HonoTakibiVite from './src/vite-plugin'

export default defineConfig({
  plugins: [HonoTakibiVite()],
})

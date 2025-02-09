import { defineConfig } from 'vite'
import honoTakibiPlugin from './src/vite-plugin'

export default defineConfig({
  plugins: [honoTakibiPlugin()],
})

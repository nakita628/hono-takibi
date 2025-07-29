import { defineConfig } from 'vite'
import HonoTakibiVite from './src/vite-plugin'

export default defineConfig({
  plugins: [
    HonoTakibiVite({
      input: 'openapi/typespec.tsp',
      output: 'routes/typespec.ts',
      exportType: true,
      exportSchema: true,
    }),
  ],
})

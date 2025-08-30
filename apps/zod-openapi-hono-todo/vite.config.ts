import devServer from '@hono/vite-dev-server'
import HonoTakibiVite from 'hono-takibi/vite-plugin'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    devServer({ entry: 'src/index.tsx' }),
    HonoTakibiVite({
      input: 'typespec/main.tsp',
      output: 'src/routes/index.ts',
      exportType: false,
      exportSchema: false,
    }),
  ],
})

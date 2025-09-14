import devServer from '@hono/vite-dev-server'
import { honoTakibiVite } from 'hono-takibi/vite-plugin'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    devServer({ entry: 'src/index.ts' }),
    honoTakibiVite(),
  ],
})

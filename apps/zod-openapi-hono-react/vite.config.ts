import devServer from '@hono/vite-dev-server'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import HonoTakibiVite from 'hono-takibi/vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    plugins: [
      devServer({
        entry: 'src/index.tsx',
      }),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
      HonoTakibiVite({
        input: 'main.tsp',
        output: 'routes/index.ts',
      }),
    ],
  }
})

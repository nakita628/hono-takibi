import build from '@hono/vite-build/cloudflare-workers'
import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: './src/main.tsx',
          output: {
            entryFileNames: 'static/main.js',
          },
        },
      },
    }
  }
  return {
    ssr: {
      external: ['react', 'react-dom'],
    },
    plugins: [
      build({
        outputDir: 'server-build',
      }),
      devServer({
        entry: 'src/index.tsx',
      }),
    ],
  }
})

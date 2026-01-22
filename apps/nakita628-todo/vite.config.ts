import build from '@hono/vite-build/cloudflare-workers'
import devServer from '@hono/vite-dev-server'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [tsconfigPaths(), tailwindcss()],
      build: {
        rollupOptions: {
          input: './src/main.tsx',
          output: {
            entryFileNames: 'static/main.js',
            assetFileNames: 'static/main.css',
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
      tsconfigPaths(),
      tailwindcss(),
      build({
        outputDir: 'server-build',
      }),
      devServer({
        entry: 'src/index.tsx',
      }),
    ],
  }
})

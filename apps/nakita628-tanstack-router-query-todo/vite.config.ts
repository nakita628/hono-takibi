import build from '@hono/vite-build/cloudflare-workers'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [
        tailwindcss(),
        tsconfigPaths(),
      ],
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
      build({
        outputDir: 'server-build',
      }),
      devServer({
        adapter,
        entry: 'src/index.tsx',
      }),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      tailwindcss(),
      tsconfigPaths(),
    ],
  }
})

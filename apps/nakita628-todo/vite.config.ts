import devServer from '@hono/vite-dev-server'
import { honoTakibiVite } from 'hono-takibi/vite-plugin'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [tsconfigPaths()],
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
    plugins: [tsconfigPaths(), devServer({ entry: 'src/index.ts' }), honoTakibiVite()],
  }
})

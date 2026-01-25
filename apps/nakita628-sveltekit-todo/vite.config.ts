import build from '@hono/vite-build/cloudflare-workers'
import devServer from '@hono/vite-dev-server'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// export default defineConfig({
//   plugins: [sveltekit(), tailwindcss()],
//   server: {
//     proxy: {
//       '/api': 'http://localhost:8789',
//     },
//   },
// })

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [tsconfigPaths(), tailwindcss(), sveltekit()],
      // build: {
      //   rollupOptions: {
      //     input: './src/main.tsx',
      //     output: {
      //       entryFileNames: 'static/main.js',
      //       assetFileNames: 'static/main.css',
      //     },
      //   },
      // },
    }
  }
  return {
    ssr: {
      external: ['react', 'react-dom'],
    },
    plugins: [
      sveltekit(),
      tsconfigPaths(),
      tailwindcss(),
      build({
        outputDir: 'server-build',
      }),
      // devServer({
      //   entry: 'src/index.tsx',
      // }),
    ],
  }
})

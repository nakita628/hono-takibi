import { defineConfig } from 'vite'
import devServer from '@hono/vite-dev-server'
import honoTakibiPlugin from 'hono-takibi/vite-plugin'

export default defineConfig({
  plugins: [
    devServer({
      entry: 'src/index.ts',
    }),
    honoTakibiPlugin({
      input: 'src/openapi.yaml',
      output: 'src/route.ts',
      schema: {
        name: 'PascalCase',
        export: false,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    }),
  ],
})

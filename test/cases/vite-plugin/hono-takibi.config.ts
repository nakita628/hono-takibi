import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: '../../specs/vite-plugin.tsp',
  output: '../../__generated__/vite-plugin/routes.ts',
})

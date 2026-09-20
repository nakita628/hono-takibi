import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: './openapi.yaml',
  output: './__generated__/routes.ts',
})

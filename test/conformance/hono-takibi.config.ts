import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: './openapi.json',
  output: './__generated__/routes.ts',
})

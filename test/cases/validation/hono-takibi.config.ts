import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/coercion.yaml',
  output: '../../__generated__/validation/routes.ts',
})

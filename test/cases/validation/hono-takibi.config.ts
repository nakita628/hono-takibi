import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: '../../specs/coercion.yaml',
  output: '../../__generated__/validation/routes.ts',
})

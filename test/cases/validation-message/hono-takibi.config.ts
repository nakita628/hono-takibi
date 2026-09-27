import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/validation-message.yaml',
  output: '../../__generated__/validation-message/routes.ts',
})

import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/x-vendor-messages.yaml',
  output: '../../__generated__/x-vendor-messages/generated.ts',
})

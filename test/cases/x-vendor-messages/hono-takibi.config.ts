import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: '../../specs/x-vendor-messages.yaml',
  output: '../../__generated__/x-vendor-messages/generated.ts',
})

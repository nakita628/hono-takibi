import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/readme.yaml',
  output: '../../__generated__/readme/generated.ts',
})

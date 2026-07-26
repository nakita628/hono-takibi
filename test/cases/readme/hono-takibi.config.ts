import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: '../../specs/readme.yaml',
  output: '../../__generated__/readme/generated.ts',
})

import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/x-transforms.yaml',
  output: '../../__generated__/x-transforms/generated.ts',
})

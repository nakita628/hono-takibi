import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: '../../specs/x-transforms.yaml',
  output: '../../__generated__/x-transforms/generated.ts',
})

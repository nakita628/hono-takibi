import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/typespec-validation.yaml',
  output: '../../__generated__/typespec-validation/generated.ts',
})

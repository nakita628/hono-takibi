import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: '../../specs/typespec-validation.yaml',
  output: '../../__generated__/typespec-validation/generated.ts',
})

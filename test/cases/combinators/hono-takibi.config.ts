import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/combinators.yaml',
  output: '../../__generated__/combinators/generated.ts',
})

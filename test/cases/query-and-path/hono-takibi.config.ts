import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: '../../specs/query-and-path.yaml',
  output: '../../__generated__/query-and-path/generated.ts',
})

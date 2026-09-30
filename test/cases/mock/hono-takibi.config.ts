import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/mock.yaml',
  mock: {
    output: '../../__generated__/mock/mock.ts',
  },
})

import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/mock-edge.yaml',
  mock: {
    output: '../../__generated__/mock-seed/mock.ts',
    locale: 'ja',
    seed: 42,
  },
})

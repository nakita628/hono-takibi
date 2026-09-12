import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/mock-edge.yaml',
  mock: {
    output: '../../__generated__/mock-edge/mock.ts',
    useExamples: 'all',
    arrayMin: 5,
  },
})

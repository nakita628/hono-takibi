import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/mock.yaml',
  mock: {
    output: '../../__generated__/mock/mock.ts',
  },
  test: {
    output: '../../__generated__/mock/mock.test.ts',
    import: './mock',
    testFramework: 'vite-plus',
  },
})

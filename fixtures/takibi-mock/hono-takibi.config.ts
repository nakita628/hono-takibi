import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  mock: {
    output: 'src/mock.ts',
  },
  test: {
    output: 'src/mock.test.ts',
    import: './mock',
  },
})

import { defineConfig } from 'hono-takibi/config'

export default defineConfig({
  input: 'openapi.yaml',
  'zod-openapi': {
    output: 'src/routes.ts',
    template: true,
  },
  test: {
    output: 'src/index.test.ts',
    import: './index',
  },
  docs: {
    output: 'src/docs.md',
    entry: 'src/index.ts',
  },
})

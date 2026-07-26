import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/crud.yaml',
  basePath: '/api',
  output: '../../__generated__/crud/src/routes.ts',
  template: {
    routeHandler: true,
  },
  rpc: {
    output: '../../__generated__/crud/src/rpc.ts',
    import: './client',
  },
  test: {
    output: '../../__generated__/crud/src/index.test.ts',
    import: './index',
  },
  mock: {
    output: '../../__generated__/crud/src/mock.ts',
  },
  docs: {
    output: '../../__generated__/crud/src/docs.md',
    entry: 'src/index.ts',
  },
})

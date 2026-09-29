import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/crud.yaml',
  basePath: '/api',
  output: '../../__generated__/crud/src/routes.ts',
  template: {
    routeHandler: true,
  },
  client: {
    output: '../../__generated__/crud/src/client.ts',
    baseUrl: 'http://localhost:3000',
  },
  rpc: {
    output: '../../__generated__/crud/src/rpc.ts',
  },
  mock: {
    output: '../../__generated__/crud/src/mock.ts',
  },
  docs: {
    output: '../../__generated__/crud/src/docs.md',
    entry: 'src/index.ts',
  },
})

import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/client-split.yaml',
  basePath: '/api',
  output: '../../__generated__/client-credentials/src/routes.ts',
  template: {
    routeHandler: true,
    split: true,
  },
  client: {
    output: '../../__generated__/client-credentials/src/client.ts',
    credentials: 'include',
  },
  rpc: {
    output: '../../__generated__/client-credentials/src/rpc.ts',
    parseResponse: true,
  },
})

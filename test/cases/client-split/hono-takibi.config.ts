import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/client-split.yaml',
  basePath: '/api',
  output: '../../__generated__/client-split/src/routes.ts',
  template: {
    routeHandler: true,
    split: true,
  },
  client: {
    output: '../../__generated__/client-split/src/client.ts',
  },
  rpc: {
    output: '../../__generated__/client-split/src/rpc.ts',
    parseResponse: true,
  },
  'tanstack-query': {
    output: '../../__generated__/client-split/src/hooks/query.ts',
  },
})

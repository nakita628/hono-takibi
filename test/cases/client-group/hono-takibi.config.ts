import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/client-group.yaml',
  basePath: '/api',
  output: '../../__generated__/client-group/src/routes.ts',
  template: {
    routeHandler: true,
    split: true,
  },
  client: {
    output: '../../__generated__/client-group/src/client.ts',
  },
  rpc: {
    output: '../../__generated__/client-group/src/rpc.ts',
    parseResponse: true,
  },
  'tanstack-query': {
    output: '../../__generated__/client-group/src/hooks/query.ts',
  },
})

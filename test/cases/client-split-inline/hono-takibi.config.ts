import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/client-split.yaml',
  basePath: '/api',
  output: '../../__generated__/client-split-inline/src/routes.ts',
  template: {
    split: true,
  },
  client: {
    output: '../../__generated__/client-split-inline/src/client.ts',
  },
  rpc: {
    output: '../../__generated__/client-split-inline/src/rpc.ts',
    parseResponse: true,
  },
})

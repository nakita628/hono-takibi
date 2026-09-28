import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/client-split.yaml',
  basePath: '/api',
  output: '../../__generated__/client-split-define/src/index.ts',
  template: {
    define: true,
    split: true,
  },
  client: {
    output: '../../__generated__/client-split-define/src/client.ts',
  },
  rpc: {
    output: '../../__generated__/client-split-define/src/rpc.ts',
    parseResponse: true,
  },
})

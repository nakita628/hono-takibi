import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/client-split.yaml',
  output: '../../__generated__/client-import/src/routes.ts',
  template: {
    routeHandler: true,
    split: true,
  },
  client: {
    output: '../../__generated__/client-import/src/client.ts',
    baseUrl: { env: 'CLIENT_IMPORT_API_URL', import: './env' },
  },
  rpc: {
    output: '../../__generated__/client-import/src/rpc.ts',
    parseResponse: true,
  },
})

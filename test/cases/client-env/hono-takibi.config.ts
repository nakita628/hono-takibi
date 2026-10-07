import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/client-split.yaml',
  basePath: '/api',
  output: '../../__generated__/client-env/src/routes.ts',
  template: {
    routeHandler: true,
    split: true,
  },
  client: {
    // Not an `index.ts`, and the `index.ts` beside it is nobody's: the client is
    // re-exported by a barrel there, which `rpc` imports it through.
    output: '../../__generated__/client-env/src/lib/client.ts',
    baseUrl: { env: 'CLIENT_ENV_API_URL', source: 'process.env' },
  },
  rpc: {
    output: '../../__generated__/client-env/src/rpc.ts',
    parseResponse: true,
  },
})

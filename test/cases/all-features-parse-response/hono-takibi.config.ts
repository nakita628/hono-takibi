import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/all-features.yaml',
  output: '../../__generated__/all-features-parse-response/routes.ts',
  template: { routeHandler: true },
  client: { output: '../../__generated__/all-features-parse-response/client.ts' },
  rpc: {
    output: '../../__generated__/all-features-parse-response/rpc.ts',
    parseResponse: true,
  },
})

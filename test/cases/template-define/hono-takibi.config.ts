import { defineConfig } from 'hono-takibi'

// `define: true`: route and handler live together in `routes/`, derived next to the app
// entry, and the components in `components/`.
export default defineConfig({
  input: '../../specs/health.yaml',
  basePath: '/api',
  output: '../../__generated__/template-define/src/index.ts',
  template: { define: true },
  client: { output: '../../__generated__/template-define/src/lib/client.ts' },
  rpc: { output: '../../__generated__/template-define/src/rpc.ts' },
})

import { defineConfig } from 'hono-takibi'

// The default scaffold (`routeHandler: false`): each handler file is a sub-router the app
// mounts. The routes are a split directory, so the app entry and the handlers land beside
// it and import it by its barrel; the client imports the app, rpc imports the client.
export default defineConfig({
  input: '../../specs/health.yaml',
  basePath: '/api',
  routes: { output: '../../__generated__/template-inline/src/routes', split: true },
  template: { routeHandler: false },
  client: { output: '../../__generated__/template-inline/src/lib/client.ts' },
  rpc: { output: '../../__generated__/template-inline/src/rpc.ts' },
})

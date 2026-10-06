import { defineConfig } from 'hono-takibi'

// `routeHandler: true`: the handlers export `RouteHandler`s and the app entry registers
// them. The routes are a split directory, imported by its barrel from the handlers and the
// app entry.
export default defineConfig({
  input: '../../specs/health.yaml',
  basePath: '/api',
  routes: { output: '../../__generated__/template-route-handler/src/routes', split: true },
  template: { routeHandler: true },
  client: { output: '../../__generated__/template-route-handler/src/lib/client.ts' },
  rpc: { output: '../../__generated__/template-route-handler/src/rpc.ts' },
})

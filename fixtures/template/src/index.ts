import { fileURLToPath } from 'node:url'
import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'
import { Scalar } from '@scalar/hono-api-reference'
import {
  getHealthIdRoute,
  getHealthRoute,
  getHealthTestRoute,
  postHealthTest2Route,
} from './routes'
import {
  getHealthIdRouteHandler,
  getHealthRouteHandler,
  getHealthTestRouteHandler,
  postHealthTest2RouteHandler,
} from './handlers'

const app = new OpenAPIHono()

export const api = app
  .openapi(getHealthRoute, getHealthRouteHandler)
  .openapi(getHealthTestRoute, getHealthTestRouteHandler)
  .openapi(postHealthTest2Route, postHealthTest2RouteHandler)
  .openapi(getHealthIdRoute, getHealthIdRouteHandler)

app
  .doc31('/doc', {
    openapi: '3.1.0',
    info: { title: 'Minimal API', version: '1.0.0' },
  })
  .get('/scalar', Scalar({ url: '/doc' }))

export default app

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = 3000
  console.log(`Server is running on http://localhost:${port}`)
  serve({
    fetch: app.fetch,
    port,
  })
}

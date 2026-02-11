import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRouteHandler, getHealthTestRouteHandler } from './handlers'
import { getHealthRoute, getHealthTestRoute } from './routes'

const app = new OpenAPIHono().basePath('/api')

export const api = app
  .openapi(getHealthRoute, getHealthRouteHandler)
  .openapi(getHealthTestRoute, getHealthTestRouteHandler)

export default app

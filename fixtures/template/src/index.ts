import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getHealthTestRoute } from './routes'
import { getHealthRouteHandler, getHealthTestRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app
  .openapi(getHealthRoute, getHealthRouteHandler)
  .openapi(getHealthTestRoute, getHealthTestRouteHandler)

export default app

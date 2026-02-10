import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRouteHandler } from './handlers'
import { getHealthRoute } from './routes'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export type AppType = typeof api

export default app

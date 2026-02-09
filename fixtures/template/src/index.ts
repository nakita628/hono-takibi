import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'
import { getHealthRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export type AppType = typeof api

export default app

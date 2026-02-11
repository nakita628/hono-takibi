import type { RouteHandler } from '@hono/zod-openapi'
import type { getHealthRoute, getHealthTestRoute } from '../routes'

export const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {
  return c.json({ status: 'ok' }, 200)
}

export const getHealthTestRouteHandler: RouteHandler<typeof getHealthTestRoute> = async (c) => {
  return c.json({ status: 'ok' }, 200)
}

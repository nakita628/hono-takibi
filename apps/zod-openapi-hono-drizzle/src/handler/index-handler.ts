import type { RouteHandler } from '@hono/zod-openapi'
import type { getRoute } from '../route.ts'

export const getRouteHandler: RouteHandler<typeof getRoute> = async (c) => {
  return c.json({ message: 'Hono🔥 Drizzle' })
}

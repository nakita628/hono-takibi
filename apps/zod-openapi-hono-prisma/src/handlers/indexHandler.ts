import type { RouteHandler } from '@hono/zod-openapi'
import type { getIndexRoute } from '../routes'

export const getIndexRouteHandler: RouteHandler<typeof getIndexRoute> = async (c) => {
  return c.json({ message: 'Hono🔥' }, 200)
}

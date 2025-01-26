import type { RouteHandler } from '@hono/zod-openapi'
import type { getRoute } from '../openapi'

export const getHandler: RouteHandler<typeof getRoute> = async (c) => {
  return c.json({ message: 'Hono🔥' }, 200)
}

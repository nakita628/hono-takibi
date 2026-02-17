import type { RouteHandler } from '@hono/zod-openapi'
import type { getRoute } from '../routes'

export const getRouteHandler: RouteHandler<typeof getRoute> = async (c) => {
  return c.json({ message: 'Crude CRUD API is running' }, 200)
}

import type { RouteHandler } from '@hono/zod-openapi'
import type { deleteFollowRoute, postFollowRoute } from '@/backend/routes'

export const deleteFollowRouteHandler: RouteHandler<typeof deleteFollowRoute> = async (c) => {
  return c.json({ message: 'Not implemented' }, 500)
}

export const postFollowRouteHandler: RouteHandler<typeof postFollowRoute> = async (c) => {
  return c.json({ message: 'Not implemented' }, 500)
}

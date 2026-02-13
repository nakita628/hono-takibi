import type { RouteHandler } from '@hono/zod-openapi'
import type { getNotificationsUserIdRoute, postNotificationsRoute } from '@/backend/routes'

export const getNotificationsUserIdRouteHandler: RouteHandler<
  typeof getNotificationsUserIdRoute
> = async (c) => {
  return c.json({ message: 'Not implemented' }, 500)
}

export const postNotificationsRouteHandler: RouteHandler<typeof postNotificationsRoute> = async (
  c,
) => {
  return c.json({ message: 'Not implemented' }, 500)
}

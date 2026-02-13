import type { RouteHandler } from '@hono/zod-openapi'
import type { deleteLikeRoute, postLikeRoute } from '@/backend/routes'

export const deleteLikeRouteHandler: RouteHandler<typeof deleteLikeRoute> = async (c) => {
  return c.json({ message: 'Not implemented' }, 500)
}

export const postLikeRouteHandler: RouteHandler<typeof postLikeRoute> = async (c) => {
  return c.json({ message: 'Not implemented' }, 500)
}

import type { RouteHandler } from '@hono/zod-openapi'
import type { getPostsPostIdRoute, getPostsRoute, postPostsRoute } from '@/backend/routes'

export const getPostsRouteHandler: RouteHandler<typeof getPostsRoute> = async (c) => {
  return c.json([], 200)
}

export const postPostsRouteHandler: RouteHandler<typeof postPostsRoute> = async (c) => {
  return c.json({ message: 'Not implemented' }, 500)
}

export const getPostsPostIdRouteHandler: RouteHandler<typeof getPostsPostIdRoute> = async (c) => {
  return c.json({ message: 'Not implemented' }, 500)
}

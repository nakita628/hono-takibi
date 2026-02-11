import type { RouteHandler } from '@hono/zod-openapi'
import type { getPostsPostIdRoute, getPostsRoute, postPostsRoute } from '@/backend/routes'

export const getPostsRouteHandler: RouteHandler<typeof getPostsRoute> = async (c) => {}

export const postPostsRouteHandler: RouteHandler<typeof postPostsRoute> = async (c) => {}

export const getPostsPostIdRouteHandler: RouteHandler<typeof getPostsPostIdRoute> = async (c) => {}

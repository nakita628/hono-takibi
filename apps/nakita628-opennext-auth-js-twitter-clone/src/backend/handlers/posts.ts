import type { RouteHandler } from '@hono/zod-openapi'
import type { getPostsRoute, postPostsRoute, getPostsPostIdRoute } from '@/backend/routes'

export const getPostsRouteHandler: RouteHandler<typeof getPostsRoute> = async (c) => {}

export const postPostsRouteHandler: RouteHandler<typeof postPostsRoute> = async (c) => {}

export const getPostsPostIdRouteHandler: RouteHandler<typeof getPostsPostIdRoute> = async (c) => {}

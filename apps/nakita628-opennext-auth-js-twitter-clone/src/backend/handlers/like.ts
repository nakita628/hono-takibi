import type { RouteHandler } from '@hono/zod-openapi'
import type { deleteLikeRoute, postLikeRoute } from '@/backend/routes'

export const deleteLikeRouteHandler: RouteHandler<typeof deleteLikeRoute> = async (c) => {}

export const postLikeRouteHandler: RouteHandler<typeof postLikeRoute> = async (c) => {}

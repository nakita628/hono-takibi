import type { RouteHandler } from '@hono/zod-openapi'
import type { getUsersRoute, getUsersUserIdRoute } from '@/backend/routes'

export const getUsersUserIdRouteHandler: RouteHandler<typeof getUsersUserIdRoute> = async (c) => {}

export const getUsersRouteHandler: RouteHandler<typeof getUsersRoute> = async (c) => {}

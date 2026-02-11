import type { RouteHandler } from '@hono/zod-openapi'
import type { postCommentsRoute } from '@/backend/routes'

export const postCommentsRouteHandler: RouteHandler<typeof postCommentsRoute> = async (c) => {}

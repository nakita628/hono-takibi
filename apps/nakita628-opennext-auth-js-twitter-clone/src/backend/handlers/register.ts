import type { RouteHandler } from '@hono/zod-openapi'
import type { postRegisterRoute } from '@/backend/routes'

export const postRegisterRouteHandler: RouteHandler<typeof postRegisterRoute> = async (c) => {}

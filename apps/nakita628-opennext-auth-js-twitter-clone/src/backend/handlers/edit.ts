import type { RouteHandler } from '@hono/zod-openapi'
import type { patchEditRoute } from '@/backend/routes'

export const patchEditRouteHandler: RouteHandler<typeof patchEditRoute> = async (c) => {}

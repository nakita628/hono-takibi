import type { RouteHandler } from '@hono/zod-openapi'
import type { getHonoRoute } from '../route.ts'

export const getHonoRouteHandler: RouteHandler<typeof getHonoRoute> = async (c) => {}

import type { RouteHandler } from '@hono/zod-openapi'
import type { getHonoXRoute } from '../route.ts'

export const getHonoXRouteHandler: RouteHandler<typeof getHonoXRoute> = async (c) => {}

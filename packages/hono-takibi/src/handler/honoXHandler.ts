import type { RouteHandler } from '@hono/zod-openapi'
import type { getHonoXRoute } from '../zod-openapi-hono.ts'

export const getHonoXRouteHandler: RouteHandler<typeof getHonoXRoute> = async (c) => {}

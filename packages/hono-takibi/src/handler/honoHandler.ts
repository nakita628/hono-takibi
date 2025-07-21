import type { RouteHandler } from '@hono/zod-openapi'
import type { getHonoRoute } from '../zod-openapi-hono.ts'

export const getHonoRouteHandler: RouteHandler<typeof getHonoRoute> = async (c) => {}

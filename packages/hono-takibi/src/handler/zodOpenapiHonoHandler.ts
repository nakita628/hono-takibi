import type { RouteHandler } from '@hono/zod-openapi'
import type { getZodOpenapiHonoRoute } from '../zod-openapi-hono.ts'

export const getZodOpenapiHonoRouteHandler: RouteHandler<typeof getZodOpenapiHonoRoute> = async (
  c,
) => {}

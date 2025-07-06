import type { RouteHandler } from '@hono/zod-openapi'
import type { getZodOpenapiHonoRoute } from '../route.ts'

export const getZodOpenapiHonoRouteHandler: RouteHandler<typeof getZodOpenapiHonoRoute> = async (
  c,
) => {}

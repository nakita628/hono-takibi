import type { RouteHandler } from '@hono/zod-openapi'

import type { getDbCountsRoute } from '../routes'

export const getDbCountsRouteHandler: RouteHandler<typeof getDbCountsRoute> = async (c) => {
  return c.json({ rows: 42 }, 200)
}

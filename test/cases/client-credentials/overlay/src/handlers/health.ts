import type { RouteHandler } from '@hono/zod-openapi'

import type { getHealthRoute } from '../routes'

export const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {
  return c.json({ status: 'up' }, 200)
}

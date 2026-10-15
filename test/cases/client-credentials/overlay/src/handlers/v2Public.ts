import type { RouteHandler } from '@hono/zod-openapi'

import type { getV2PublicPingRoute } from '../routes'

export const getV2PublicPingRouteHandler: RouteHandler<typeof getV2PublicPingRoute> = async (c) => {
  return c.json({ ok: true }, 200)
}

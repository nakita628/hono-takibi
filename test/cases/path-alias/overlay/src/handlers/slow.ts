import type { RouteHandler } from '@hono/zod-openapi'

import type { getSlowRoute } from '@/routes'

export const getSlowRouteHandler: RouteHandler<typeof getSlowRoute> = async (c) => {
  return c.json({ ok: true }, 200)
}

import type { RouteHandler } from '@hono/zod-openapi'

import type { getSchemaRoute } from '../routes'

export const getSchemaRouteHandler: RouteHandler<typeof getSchemaRoute> = async (c) => {
  return c.json({ models: 3 }, 200)
}

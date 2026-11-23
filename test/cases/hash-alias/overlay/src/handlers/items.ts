import type { RouteHandler } from '@hono/zod-openapi'

import type { getItemsRoute } from '#/routes.ts'

export const getItemsRouteHandler: RouteHandler<typeof getItemsRoute> = async (c) => {
  return c.json({ items: ['a', 'b'], nextPage: 1 }, 200)
}

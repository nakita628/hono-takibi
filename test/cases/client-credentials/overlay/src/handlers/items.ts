import type { RouteHandler } from '@hono/zod-openapi'

import type { getItemsRoute, postItemsIdSharesRoute } from '../routes'

export const getItemsRouteHandler: RouteHandler<typeof getItemsRoute> = async (c) => {
  const { limit } = c.req.valid('query')
  return c.json(
    [
      { id: 1, title: 'first' },
      { id: 2, title: 'second' },
    ].slice(0, limit ?? 2),
    200,
  )
}

export const postItemsIdSharesRouteHandler: RouteHandler<typeof postItemsIdSharesRoute> = async (
  c,
) => {
  const { id } = c.req.valid('param')
  return c.json({ id, title: 'shared' }, 201)
}

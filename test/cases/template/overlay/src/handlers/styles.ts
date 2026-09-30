import type { RouteHandler } from '@hono/zod-openapi'

import type { getStylesLabelIdRoute, getStylesMatrixIdsRoute, getStylesQueryRoute } from '../routes'

export const getStylesLabelIdRouteHandler: RouteHandler<typeof getStylesLabelIdRoute> = async (
  c,
) => {
  return c.json({ status: 'ok' }, 200)
}

export const getStylesMatrixIdsRouteHandler: RouteHandler<typeof getStylesMatrixIdsRoute> = async (
  c,
) => {
  return c.json({ status: 'ok' }, 200)
}

export const getStylesQueryRouteHandler: RouteHandler<typeof getStylesQueryRoute> = async (c) => {
  return c.json({ status: 'ok' }, 200)
}

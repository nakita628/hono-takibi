import type { RouteHandler } from '@hono/zod-openapi'

import type { getVaultsRoute, postVaultsRoute, getVaultsIdRoute } from '../routes'

export const getVaultsRouteHandler: RouteHandler<typeof getVaultsRoute> = async (c) => {
  return c.json([{ id: 1, name: 'personal' }], 200)
}

export const postVaultsRouteHandler: RouteHandler<typeof postVaultsRoute> = async (c) => {
  const { name } = c.req.valid('json')
  return c.json({ id: 2, name }, 201)
}

export const getVaultsIdRouteHandler: RouteHandler<typeof getVaultsIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  return c.json({ id, name: 'personal' }, 200)
}

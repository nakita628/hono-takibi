import type { RouteHandler } from '@hono/zod-openapi'

import type { deleteUsersIdRoute, getUsersIdRoute, getUsersRoute, postUsersRoute } from '@/routes'

export const getUsersRouteHandler: RouteHandler<typeof getUsersRoute> = async (c) => {
  return c.json([{ id: '1', name: 'Alice' }], 200)
}

export const postUsersRouteHandler: RouteHandler<typeof postUsersRoute> = async (c) => {
  const { name } = c.req.valid('json')
  return c.json({ id: '99', name }, 201)
}

export const getUsersIdRouteHandler: RouteHandler<typeof getUsersIdRoute> = async (c) => {
  const { id } = c.req.valid('param')
  return c.json({ id, name: 'Alice' }, 200)
}

export const deleteUsersIdRouteHandler: RouteHandler<typeof deleteUsersIdRoute> = async (c) => {
  return c.body(null, 204)
}

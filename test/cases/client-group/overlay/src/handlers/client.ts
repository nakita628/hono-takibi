import type { RouteHandler } from '@hono/zod-openapi'

import type { getClientRoute, postClientRunRoute } from '../routes'

export const getClientRouteHandler: RouteHandler<typeof getClientRoute> = async (c) => {
  return c.json({ models: ['User', 'Post'] }, 200)
}

export const postClientRunRouteHandler: RouteHandler<typeof postClientRunRoute> = async (c) => {
  const { code } = c.req.valid('json')
  return c.json({ result: `ran ${code}` }, 200)
}

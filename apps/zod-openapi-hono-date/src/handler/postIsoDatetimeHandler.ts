import type { RouteHandler } from '@hono/zod-openapi'
import type { postIsoDateRoute, postIsoDatetimeRoute } from '../route'

export const postIsoDateHandler: RouteHandler<typeof postIsoDateRoute> = async (c) => {
  const { iso_date } = c.req.valid('json')
  return c.json({ date: iso_date }, 200)
}

export const postIsoDatetimeHandler: RouteHandler<typeof postIsoDatetimeRoute> = async (c) => {
  const { iso_datetime } = c.req.valid('json')
  return c.json({ datetime: iso_datetime }, 200)
}

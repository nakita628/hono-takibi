import type { RouteHandler } from '@hono/zod-openapi'
import type { dateRoute, postIsoDateRoute, postIsoDatetimeRoute } from '../route'

export const postIsoDateHandler: RouteHandler<typeof postIsoDateRoute> = async (c) => {
  const { iso_date } = c.req.valid('json')
  return c.json({ iso_date: iso_date }, 200)
}

export const postIsoDatetimeHandler: RouteHandler<typeof postIsoDatetimeRoute> = async (c) => {
  const { iso_datetime } = c.req.valid('json')
  return c.json({ iso_datetime: iso_datetime }, 200)
}

export const dateHandler: RouteHandler<typeof dateRoute> = async (c) => {
  const { date } = c.req.valid('json')
  return c.json({ date: date }, 200)
}

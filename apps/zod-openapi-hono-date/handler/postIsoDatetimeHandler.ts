import type { RouteHandler } from '@hono/zod-openapi'
import type { postIsoDatetime } from '../route'

export const postIsoDatetimeHandler: RouteHandler<typeof postIsoDatetime> = async (c) => {
  const { iso_datetime } = c.req.valid('json')
  return c.json({ datetime: iso_datetime }, 200)
}
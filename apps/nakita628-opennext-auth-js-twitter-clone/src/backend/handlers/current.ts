import type { RouteHandler } from '@hono/zod-openapi'
import type { getCurrentRoute } from '@/backend/routes'

export const getCurrentRouteHandler: RouteHandler<typeof getCurrentRoute> = async (c) => {
  return c.json({ message: 'Not implemented' }, 500)
}

import type { RouteHandler } from '@hono/zod-openapi'
import type { getHealthRoute } from '../routes'

/**
 *
 * @param c
 * @returns
 */
export const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {
  return c.json({ status: 'ok' }, 200)
}

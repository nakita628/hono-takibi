import type { ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /hono-x
 *
 * HonoX
 *
 * Simple ping for HonoX
 */
export async function getHonoX(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['hono-x'].$get(args, options)
}

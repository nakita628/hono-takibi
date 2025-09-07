import { client } from '../client'

/**
 * HonoX
 *
 * Simple ping for HonoX
 *
 * GET /hono-x
 */
export async function getHonoX() {
  return await client['hono-x'].$get()
}

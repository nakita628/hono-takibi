import { client } from '../client'

/**
 * GET /hono-x
 *
 * HonoX
 *
 * Simple ping for HonoX
 */
export async function getHonoX() {
  return await client['hono-x'].$get()
}

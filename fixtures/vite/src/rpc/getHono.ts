import { client } from '../client'

/**
 * Hono
 *
 * Simple ping for Hono
 *
 * GET /hono
 */
export async function getHono() {
  return await client.hono.$get()
}

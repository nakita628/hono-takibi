import { client } from '../client'

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export async function getHono() {
  return await client.hono.$get()
}

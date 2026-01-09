import type { ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export async function getHono(options?: ClientRequestOptions) {
  return await client.hono.$get(undefined, options)
}

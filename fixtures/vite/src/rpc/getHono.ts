import type { ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export async function getHono(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.hono.$get(args, options)
}

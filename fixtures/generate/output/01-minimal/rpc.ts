import type { ClientRequestOptions } from 'hono/client'
import { client } from './client'

/**
 * GET /health
 */
export async function getHealth(options?: ClientRequestOptions) {
  return await client.health.$get(undefined, options)
}

import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/openapi-string'

/**
 * GET /string
 *
 * zod string
 *
 * zod string
 */
export async function getString(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.string.$get(args, options)
}

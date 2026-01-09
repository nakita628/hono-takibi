import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/openapi-number'

/**
 * GET /number
 *
 * zod number
 *
 * zod number
 */
export async function getNumber(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.number.$get(args, options)
}

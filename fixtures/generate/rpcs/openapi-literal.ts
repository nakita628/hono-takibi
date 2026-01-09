import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/openapi-literal'

/**
 * GET /primitive
 *
 * zod primitive
 *
 * zod primitive
 */
export async function getPrimitive(args?: { options?: ClientRequestOptions }) {
  return await client.primitive.$get(args)
}

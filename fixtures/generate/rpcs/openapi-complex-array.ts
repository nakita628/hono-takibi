import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/openapi-complex-array'

/**
 * GET /array
 *
 * zod array
 *
 * zod array
 */
export async function getArray(args?: { options?: ClientRequestOptions }) {
  return await client.array.$get(args)
}

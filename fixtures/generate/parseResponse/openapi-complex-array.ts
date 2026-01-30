import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-complex-array'

/**
 * GET /array
 *
 * zod array
 *
 * zod array
 */
export async function getArray(options?: ClientRequestOptions) {
  return await parseResponse(client.array.$get(undefined, options))
}

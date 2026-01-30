import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-literal'

/**
 * GET /primitive
 *
 * zod primitive
 *
 * zod primitive
 */
export async function getPrimitive(options?: ClientRequestOptions) {
  return await parseResponse(client.primitive.$get(undefined, options))
}

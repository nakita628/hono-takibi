import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-string'

/**
 * GET /string
 *
 * zod string
 *
 * zod string
 */
export async function getString(options?: ClientRequestOptions) {
  return await parseResponse(client.string.$get(undefined, options))
}

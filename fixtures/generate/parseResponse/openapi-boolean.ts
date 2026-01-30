import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-boolean'

/**
 * GET /boolean
 *
 * zod boolean
 *
 * zod boolean
 */
export async function getBoolean(options?: ClientRequestOptions) {
  return await parseResponse(client.boolean.$get(undefined, options))
}

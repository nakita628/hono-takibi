import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/openapi-boolean'

/**
 * GET /boolean
 *
 * zod boolean
 *
 * zod boolean
 */
export async function getBoolean(options?: ClientRequestOptions) {
  return await client.boolean.$get(undefined, options)
}

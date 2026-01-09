import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/openapi-boolean'

/**
 * GET /boolean
 *
 * zod boolean
 *
 * zod boolean
 */
export async function getBoolean(args?: { options?: ClientRequestOptions }) {
  return await client.boolean.$get(args)
}

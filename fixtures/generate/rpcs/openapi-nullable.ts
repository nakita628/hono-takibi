import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/openapi-nullable'

/**
 * GET /nullable
 *
 * zod nullable
 *
 * zod nullable
 */
export async function getNullable(options?: ClientRequestOptions) {
  return await client.nullable.$get(undefined, options)
}

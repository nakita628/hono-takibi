import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/openapi-nullable'

/**
 * GET /nullable
 *
 * zod nullable
 *
 * zod nullable
 */
export async function getNullable(options?: ClientRequestOptions) {
  return await parseResponse(client.nullable.$get(undefined, options))
}

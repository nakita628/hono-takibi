import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/self'

/**
 * GET /categories
 */
export async function getCategories(options?: ClientRequestOptions) {
  return await parseResponse(client.categories.$get(undefined, options))
}

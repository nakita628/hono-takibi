import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/self'

/**
 * GET /categories
 */
export async function getCategories(args?: { options?: ClientRequestOptions }) {
  return await client.categories.$get(args)
}

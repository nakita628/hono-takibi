import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/abcde'

/**
 * GET /example
 *
 * Get example data
 */
export async function getExample(options?: ClientRequestOptions) {
  return await client.example.$get(undefined, options)
}

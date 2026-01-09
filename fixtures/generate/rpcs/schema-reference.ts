import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/schema-reference'

/**
 * GET /example
 *
 * Sample Endpoint
 */
export async function getExample(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.example.$get(args, options)
}

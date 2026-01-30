import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/schema-reference'

/**
 * GET /example
 *
 * Sample Endpoint
 */
export async function getExample(options?: ClientRequestOptions) {
  return await parseResponse(client.example.$get(undefined, options))
}

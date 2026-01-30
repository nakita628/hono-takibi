import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-schema-reference'

/**
 * GET /test
 *
 * Test endpoint for comprehensive schema references
 */
export async function getTest(options?: ClientRequestOptions) {
  return await parseResponse(client.test.$get(undefined, options))
}

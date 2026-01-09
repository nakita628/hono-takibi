import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/complex-schema-reference-random'

/**
 * GET /test
 *
 * Test endpoint for comprehensive schema references
 */
export async function getTest(options?: ClientRequestOptions) {
  return await client.test.$get(undefined, options)
}

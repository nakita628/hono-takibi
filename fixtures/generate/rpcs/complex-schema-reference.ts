import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/complex-schema-reference'

/**
 * GET /test
 *
 * Test endpoint for comprehensive schema references
 */
export async function getTest(args?: { options?: ClientRequestOptions }) {
  return await client.test.$get(args)
}

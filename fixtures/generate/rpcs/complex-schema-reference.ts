import { client } from '../clients/complex-schema-reference'

/**
 * GET /test
 *
 * Test endpoint for comprehensive schema references
 */
export async function getTest() {
  return await client.test.$get()
}

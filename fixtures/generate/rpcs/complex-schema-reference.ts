import { client } from '../index.ts'

/**
 * Test endpoint for comprehensive schema references
 *
 * GET /test
 */
export async function getTest() {
  return await client.test.$get()
}

import { client } from '../index.ts'

/**
 * Sample Endpoint
 *
 * GET /example
 */
export async function getExample() {
  return await client.example.$get()
}

import { client } from '../index.ts'

/**
 * GET /example
 *
 * Sample Endpoint
 */
export async function getExample() {
  return await client.example.$get()
}

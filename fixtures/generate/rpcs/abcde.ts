import { client } from '../index.ts'

/**
 * Get example data
 *
 * GET /example
 */
export async function getExample() {
  return await client.example.$get()
}

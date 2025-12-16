import { client } from '../index.ts'

/**
 * GET /example
 *
 * Get example data
 */
export async function getExample() {
  return await client.example.$get()
}

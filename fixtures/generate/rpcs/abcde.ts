import { client } from '../clients/abcde'

/**
 * GET /example
 *
 * Get example data
 */
export async function getExample() {
  return await client.example.$get()
}

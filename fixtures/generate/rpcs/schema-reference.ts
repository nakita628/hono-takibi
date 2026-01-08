import { client } from '../clients/schema-reference'

/**
 * GET /example
 *
 * Sample Endpoint
 */
export async function getExample() {
  return await client.example.$get()
}

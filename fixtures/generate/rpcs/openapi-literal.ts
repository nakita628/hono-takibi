import { client } from '../clients/openapi-literal'

/**
 * GET /primitive
 *
 * zod primitive
 *
 * zod primitive
 */
export async function getPrimitive() {
  return await client.primitive.$get()
}

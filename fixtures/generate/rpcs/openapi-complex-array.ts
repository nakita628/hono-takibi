import { client } from '../clients/openapi-complex-array'

/**
 * GET /array
 *
 * zod array
 *
 * zod array
 */
export async function getArray() {
  return await client.array.$get()
}

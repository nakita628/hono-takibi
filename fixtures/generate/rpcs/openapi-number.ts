import { client } from '../clients/openapi-number'

/**
 * GET /number
 *
 * zod number
 *
 * zod number
 */
export async function getNumber() {
  return await client.number.$get()
}

import { client } from '../clients/openapi-string'

/**
 * GET /string
 *
 * zod string
 *
 * zod string
 */
export async function getString() {
  return await client.string.$get()
}

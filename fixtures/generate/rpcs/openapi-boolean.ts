import { client } from '../clients/openapi-boolean'

/**
 * GET /boolean
 *
 * zod boolean
 *
 * zod boolean
 */
export async function getBoolean() {
  return await client.boolean.$get()
}

import { client } from '../clients/openapi-nullable'

/**
 * GET /nullable
 *
 * zod nullable
 *
 * zod nullable
 */
export async function getNullable() {
  return await client.nullable.$get()
}

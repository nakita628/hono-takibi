import { client } from '../index.ts'

/**
 * zod primitive
 *
 * zod primitive
 *
 * GET /primitive
 */
export async function getPrimitive() {
  return await client.primitive.$get()
}

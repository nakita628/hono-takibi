import { client } from '../index.ts'

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

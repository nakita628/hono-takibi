import { client } from '../index.ts'

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

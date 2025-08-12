import { client } from '../index.ts'

/**
 * zod array
 *
 * zod array
 *
 * GET /array
 */
export async function getArray() {
  return await client.array.$get()
}

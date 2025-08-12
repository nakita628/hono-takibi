import { client } from '../index.ts'

/**
 * zod number
 *
 * zod number
 *
 * GET /number
 */
export async function getNumber() {
  return await client.number.$get()
}

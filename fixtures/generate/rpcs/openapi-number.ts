import { client } from '../index.ts'

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

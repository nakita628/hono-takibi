import { client } from '../index.ts'

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

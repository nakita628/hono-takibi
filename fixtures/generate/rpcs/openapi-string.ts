import { client } from '../index.ts'

/**
 * zod string
 *
 * zod string
 *
 * GET /string
 */
export async function getString() {
  return await client.string.$get()
}

import { client } from '../index.ts'

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

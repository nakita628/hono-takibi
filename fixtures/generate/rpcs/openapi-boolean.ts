import { client } from '../index.ts'

/**
 * zod boolean
 *
 * zod boolean
 *
 * GET /boolean
 */
export async function getBoolean() {
  return await client.boolean.$get()
}

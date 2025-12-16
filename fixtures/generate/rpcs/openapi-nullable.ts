import { client } from '../index.ts'

/**
 * GET /nullable
 *
 * zod nullable
 *
 * zod nullable
 */
export async function getNullable() {
  return await client.nullable.$get()
}

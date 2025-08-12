import { client } from '../index.ts'

/**
 * zod nullable
 *
 * zod nullable
 *
 * GET /nullable
 */
export async function getNullable() {
  return await client.nullable.$get()
}

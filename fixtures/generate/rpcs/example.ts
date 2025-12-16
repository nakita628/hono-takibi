import { client } from '../index.ts'

/**
 * GET /sample
 *
 * Returns a payload exercising every custom format, constraint, and nullable case
 */
export async function getSample() {
  return await client.sample.$get()
}

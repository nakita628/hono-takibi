import { client } from '../index.ts'

/**
 * Returns a payload exercising every custom format, constraint, and nullable case
 *
 * GET /sample
 */
export async function getSample() {
  return await client.sample.$get()
}

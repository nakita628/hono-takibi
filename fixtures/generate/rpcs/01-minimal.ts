import { client } from '../index.ts'

/**
 * GET /health
 */
export async function getHealth() {
  return await client.health.$get()
}

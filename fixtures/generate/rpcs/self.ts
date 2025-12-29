import { client } from '../index.ts'

/**
 * GET /categories
 */
export async function getCategories() {
  return await client.categories.$get()
}

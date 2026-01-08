import { client } from '../clients/self'

/**
 * GET /categories
 */
export async function getCategories() {
  return await client.categories.$get()
}

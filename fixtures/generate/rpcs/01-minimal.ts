import { client } from '../clients/01-minimal'

/**
 * GET /health
 */
export async function getHealth() {
  return await client.health.$get()
}

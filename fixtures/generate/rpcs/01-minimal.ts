import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/01-minimal'

/**
 * GET /health
 */
export async function getHealth(args?: { options?: ClientRequestOptions }) {
  return await client.health.$get(args)
}

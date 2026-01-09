import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/example'

/**
 * GET /sample
 *
 * Returns a payload exercising every custom format, constraint, and nullable case
 */
export async function getSample(args?: { options?: ClientRequestOptions }) {
  return await client.sample.$get(args)
}

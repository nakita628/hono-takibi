import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/example'

/**
 * GET /sample
 *
 * Returns a payload exercising every custom format, constraint, and nullable case
 */
export async function getSample(options?: ClientRequestOptions) {
  return await parseResponse(client.sample.$get(undefined, options))
}

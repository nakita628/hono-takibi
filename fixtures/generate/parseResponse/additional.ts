import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/additional'

/**
 * GET /passthrough
 *
 * zod passthrough
 *
 * zod passthrough
 */
export async function getPassthrough(options?: ClientRequestOptions) {
  return await parseResponse(client.passthrough.$get(undefined, options))
}

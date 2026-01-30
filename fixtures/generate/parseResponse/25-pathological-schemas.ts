import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/25-pathological-schemas'

/**
 * POST /pathological
 */
export async function postPathological(
  args: InferRequestType<typeof client.pathological.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.pathological.$post(args, options))
}

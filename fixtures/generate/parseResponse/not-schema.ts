import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/not-schema'

/**
 * POST /validate
 */
export async function postValidate(
  args: InferRequestType<typeof client.validate.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.validate.$post(args, options))
}

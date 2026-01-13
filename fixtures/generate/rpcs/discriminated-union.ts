import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/discriminated-union'

/**
 * POST /messages
 */
export async function postMessages(
  args: InferRequestType<typeof client.messages.$post>,
  options?: ClientRequestOptions,
) {
  return await client.messages.$post(args, options)
}

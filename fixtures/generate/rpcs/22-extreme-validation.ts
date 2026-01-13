import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/22-extreme-validation'

/**
 * POST /validate
 */
export async function postValidate(
  args: InferRequestType<typeof client.validate.$post>,
  options?: ClientRequestOptions,
) {
  return await client.validate.$post(args, options)
}

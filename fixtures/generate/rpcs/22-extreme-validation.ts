import type { InferRequestType } from 'hono/client'
import { client } from '../clients/22-extreme-validation'

/**
 * POST /validate
 */
export async function postValidate(arg: InferRequestType<typeof client.validate.$post>) {
  return await client.validate.$post(arg)
}

import type { InferRequestType } from 'hono/client'
import { client } from '../clients/discriminated-union'

/**
 * POST /messages
 */
export async function postMessages(arg: InferRequestType<typeof client.messages.$post>) {
  return await client.messages.$post(arg)
}

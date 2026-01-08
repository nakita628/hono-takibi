import type { InferRequestType } from 'hono/client'
import { client } from '../clients/25-pathological-schemas'

/**
 * POST /pathological
 */
export async function postPathological(arg: InferRequestType<typeof client.pathological.$post>) {
  return await client.pathological.$post(arg)
}

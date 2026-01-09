import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/discriminated-union'

/**
 * POST /messages
 */
export async function postMessages(args: {
  json:
    | { type: 'text'; text: string }
    | { type: 'image'; url: string }
    | { type: 'video'; url: string; duration: number }
  options?: ClientRequestOptions
}) {
  return await client.messages.$post(args)
}

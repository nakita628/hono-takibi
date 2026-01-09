import { client } from '../clients/discriminated-union'

/**
 * POST /messages
 */
export async function postMessages(arg: {
  json:
    | { type: 'text'; text: string }
    | { type: 'image'; url: string }
    | { type: 'video'; url: string; duration: number }
}) {
  return await client.messages.$post(arg)
}

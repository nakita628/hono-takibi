import { client } from '../clients/discriminated-union'

/**
 * POST /messages
 */
export async function postMessages(
  body:
    | { type: string; text: string }
    | { type: string; url: string }
    | { type: string; url: string; duration: number },
) {
  return await client.messages.$post({ json: body })
}

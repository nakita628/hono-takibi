import useSWRMutation from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discriminated-union'

/**
 * POST /messages
 */
export function usePostMessages(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /messages',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.messages.$post> }) =>
      parseResponse(client.messages.$post(arg, options?.client)),
  )
}

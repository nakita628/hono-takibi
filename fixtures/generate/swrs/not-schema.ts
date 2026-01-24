import useSWRMutation from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/not-schema'

/**
 * POST /validate
 */
export function usePostValidate(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /validate',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.validate.$post> }) =>
      parseResponse(client.validate.$post(arg, options?.client)),
  )
}

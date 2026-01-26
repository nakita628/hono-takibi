import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discriminated-union'

/**
 * POST /messages
 */
export function usePostMessages(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.messages.$post>,
    Error,
    string,
    InferRequestType<typeof client.messages.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /messages',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.messages.$post> }) =>
      parseResponse(client.messages.$post(arg, clientOptions)),
    mutationOptions,
  )
}

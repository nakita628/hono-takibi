import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/discriminated-union'

/**
 * POST /messages
 */
export function usePostMessages(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.messages.$post>,
    Error,
    string,
    InferRequestType<typeof client.messages.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.messages.$post>,
    Error,
    string,
    InferRequestType<typeof client.messages.$post>
  >(
    'POST /messages',
    async (_, { arg }) => parseResponse(client.messages.$post(arg, options?.client)),
    options?.swr,
  )
}

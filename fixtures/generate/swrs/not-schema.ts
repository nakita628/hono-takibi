import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/not-schema'

/**
 * POST /validate
 */
export function usePostValidate(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.validate.$post>,
    Error,
    string,
    InferRequestType<typeof client.validate.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.validate.$post>,
    Error,
    string,
    InferRequestType<typeof client.validate.$post>
  >(
    'POST /validate',
    async (_, { arg }) => parseResponse(client.validate.$post(arg, options?.client)),
    options?.swr,
  )
}

import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/25-pathological-schemas'

/**
 * POST /pathological
 */
export function usePostPathological(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.pathological.$post>,
    Error,
    string,
    InferRequestType<typeof client.pathological.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.pathological.$post>,
    Error,
    string,
    InferRequestType<typeof client.pathological.$post>
  >(
    'POST /pathological',
    async (_, { arg }) => parseResponse(client.pathological.$post(arg, options?.client)),
    options?.swr,
  )
}

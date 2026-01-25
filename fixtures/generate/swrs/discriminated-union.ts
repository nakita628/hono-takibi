import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
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
      parseResponse(client.messages.$post(arg, options?.client)),
    mutationOptions,
  )
}

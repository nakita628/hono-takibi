import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/not-schema'

/**
 * POST /validate
 */
export function usePostValidate(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.validate.$post>,
    Error,
    string,
    InferRequestType<typeof client.validate.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /validate',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.validate.$post> }) =>
      parseResponse(client.validate.$post(arg, clientOptions)),
    mutationOptions,
  )
}

import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/25-pathological-schemas'

/**
 * POST /pathological
 */
export function usePostPathological(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.pathological.$post>,
    Error,
    string,
    InferRequestType<typeof client.pathological.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /pathological',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.pathological.$post> }) =>
      parseResponse(client.pathological.$post(arg, options?.client)),
    mutationOptions,
  )
}

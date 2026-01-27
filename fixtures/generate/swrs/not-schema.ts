import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key } from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/not-schema'

/**
 * Generates SWR mutation key for POST /validate
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostValidateMutationKey() {
  return ['validate', 'POST', '/validate'] as const
}

/**
 * POST /validate
 */
export function usePostValidate(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.validate.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.validate.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostValidateMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.validate.$post> }) =>
        parseResponse(client.validate.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

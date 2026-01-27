import type { Key } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/22-extreme-validation'

/**
 * Generates SWR mutation key for POST /validate
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostValidateMutationKey() {
  return ['POST', '/validate'] as const
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

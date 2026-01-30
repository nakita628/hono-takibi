import type { Key } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/25-pathological-schemas'

/**
 * Generates SWR mutation key for POST /pathological
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPathologicalMutationKey() {
  return ['pathological', 'POST', '/pathological'] as const
}

/**
 * POST /pathological
 */
export function usePostPathological(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pathological.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.pathological.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPathologicalMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.pathological.$post> }) =>
        parseResponse(client.pathological.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

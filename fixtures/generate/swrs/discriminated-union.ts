import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key } from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/discriminated-union'

/**
 * Generates SWR mutation key for POST /messages
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMessagesMutationKey() {
  return ['messages', 'POST', '/messages'] as const
}

/**
 * POST /messages
 */
export function usePostMessages(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.messages.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.messages.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMessagesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.messages.$post> }) =>
        parseResponse(client.messages.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

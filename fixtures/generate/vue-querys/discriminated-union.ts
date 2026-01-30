import { useMutation } from '@tanstack/vue-query'
import type { UseMutationOptions } from '@tanstack/vue-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discriminated-union'

/**
 * Generates Vue Query mutation key for POST /messages
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMessagesMutationKey() {
  return ['messages', 'POST', '/messages'] as const
}

/**
 * Returns Vue Query mutation options for POST /messages
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMessagesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMessagesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.messages.$post>) =>
    parseResponse(client.messages.$post(args, clientOptions)),
})

/**
 * POST /messages
 */
export function usePostMessages(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.messages.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.messages.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostMessagesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

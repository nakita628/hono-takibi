import type { CreateMutationOptions } from '@tanstack/svelte-query'
import { createMutation } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discriminated-union'

/**
 * Generates Svelte Query mutation key for POST /messages
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMessagesMutationKey() {
  return ['messages', 'POST', '/messages'] as const
}

/**
 * Returns Svelte Query mutation options for POST /messages
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
export function createPostMessages(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.messages.$post>>>>>,
      Error,
      InferRequestType<typeof client.messages.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMessagesMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

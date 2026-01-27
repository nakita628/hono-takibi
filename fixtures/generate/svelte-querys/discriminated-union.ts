import { createMutation } from '@tanstack/svelte-query'
import type { CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discriminated-union'

/**
 * Generates Svelte Query mutation key for POST /messages
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostMessagesMutationKey() {
  return ['POST', '/messages'] as const
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
export function createPostMessages(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.messages.$post>>>>>,
    Error,
    InferRequestType<typeof client.messages.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.messages.$post>) =>
      parseResponse(client.messages.$post(args, clientOptions)),
  }))
}

import { createMutation } from '@tanstack/svelte-query'
import type { CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/22-extreme-validation'

/**
 * Generates Svelte Query mutation key for POST /validate
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostValidateMutationKey() {
  return ['POST', '/validate'] as const
}

/**
 * Returns Svelte Query mutation options for POST /validate
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostValidateMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostValidateMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.validate.$post>) =>
    parseResponse(client.validate.$post(args, clientOptions)),
})

/**
 * POST /validate
 */
export function createPostValidate(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.validate.$post>>>>>,
    Error,
    InferRequestType<typeof client.validate.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.validate.$post>) =>
      parseResponse(client.validate.$post(args, clientOptions)),
  }))
}

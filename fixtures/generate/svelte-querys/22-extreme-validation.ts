import type { CreateMutationOptions } from '@tanstack/svelte-query'
import { createMutation } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/22-extreme-validation'

/**
 * Generates Svelte Query mutation key for POST /validate
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostValidateMutationKey() {
  return ['validate', 'POST', '/validate'] as const
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
export function createPostValidate(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.validate.$post>>>>>,
      Error,
      InferRequestType<typeof client.validate.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostValidateMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

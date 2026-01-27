import type { CreateMutationOptions } from '@tanstack/svelte-query'
import { createMutation } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/25-pathological-schemas'

/**
 * Generates Svelte Query mutation key for POST /pathological
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPathologicalMutationKey() {
  return ['pathological', 'POST', '/pathological'] as const
}

/**
 * Returns Svelte Query mutation options for POST /pathological
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPathologicalMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostPathologicalMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.pathological.$post>) =>
    parseResponse(client.pathological.$post(args, clientOptions)),
})

/**
 * POST /pathological
 */
export function createPostPathological(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pathological.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.pathological.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostPathologicalMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

import { useMutation } from '@tanstack/vue-query'
import type { UseMutationOptions } from '@tanstack/vue-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/25-pathological-schemas'

/**
 * Generates Vue Query mutation key for POST /pathological
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostPathologicalMutationKey() {
  return ['POST', '/pathological'] as const
}

/**
 * Returns Vue Query mutation options for POST /pathological
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
export function usePostPathological(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pathological.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.pathological.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.pathological.$post>) =>
      parseResponse(client.pathological.$post(args, clientOptions)),
  })
}

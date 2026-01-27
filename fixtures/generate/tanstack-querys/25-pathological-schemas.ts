import { useMutation } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/25-pathological-schemas'

/**
 * Generates TanStack Query mutation key for POST /pathological
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPathologicalMutationKey() {
  return ['pathological', 'POST', '/pathological'] as const
}

/**
 * Returns TanStack Query mutation options for POST /pathological
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
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pathological.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.pathological.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostPathologicalMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

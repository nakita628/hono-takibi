import { useMutation } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/22-extreme-validation'

/**
 * Generates TanStack Query mutation key for POST /validate
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostValidateMutationKey() {
  return ['POST', '/validate'] as const
}

/**
 * Returns TanStack Query mutation options for POST /validate
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
export function usePostValidate(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.validate.$post>>>>>,
    Error,
    InferRequestType<typeof client.validate.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.validate.$post>) =>
      parseResponse(client.validate.$post(args, clientOptions)),
  })
}

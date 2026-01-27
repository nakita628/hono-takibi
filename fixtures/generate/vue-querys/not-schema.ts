import { useMutation } from '@tanstack/vue-query'
import type { UseMutationOptions } from '@tanstack/vue-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/not-schema'

/**
 * Generates Vue Query mutation key for POST /validate
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostValidateMutationKey() {
  return ['validate', 'POST', '/validate'] as const
}

/**
 * Returns Vue Query mutation options for POST /validate
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
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.validate.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.validate.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostValidateMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

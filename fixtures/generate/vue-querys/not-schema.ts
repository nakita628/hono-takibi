import type { QueryClient, UseMutationOptions } from '@tanstack/vue-query'
import { useMutation } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/not-schema'

/**
 * POST /validate
 */
export function usePostValidate(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.validate.$post> | undefined,
      Error,
      InferRequestType<typeof client.validate.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.validate.$post> | undefined,
    Error,
    InferRequestType<typeof client.validate.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.validate.$post(args, options?.client)),
    },
    queryClient,
  )
}

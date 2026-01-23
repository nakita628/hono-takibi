import type { QueryClient, UseMutationOptions } from '@tanstack/vue-query'
import { useMutation } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discriminated-union'

/**
 * POST /messages
 */
export function usePostMessages(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.messages.$post> | undefined,
      Error,
      InferRequestType<typeof client.messages.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.messages.$post> | undefined,
    Error,
    InferRequestType<typeof client.messages.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.messages.$post(args, options?.client)),
    },
    queryClient,
  )
}

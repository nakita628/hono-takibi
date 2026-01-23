import { useMutation } from '@tanstack/react-query'
import type { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
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

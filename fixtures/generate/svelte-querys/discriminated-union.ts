import { createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discriminated-union'

/**
 * POST /messages
 */
export function createPostMessages(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.messages.$post> | undefined,
      Error,
      InferRequestType<typeof client.messages.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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

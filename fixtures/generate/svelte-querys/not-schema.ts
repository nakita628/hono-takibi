import { createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/not-schema'

/**
 * POST /validate
 */
export function createPostValidate(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.validate.$post> | undefined,
      Error,
      InferRequestType<typeof client.validate.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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

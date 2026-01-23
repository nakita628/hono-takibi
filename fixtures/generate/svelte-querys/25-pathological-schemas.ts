import { createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/25-pathological-schemas'

/**
 * POST /pathological
 */
export function createPostPathological(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.pathological.$post> | undefined,
      Error,
      InferRequestType<typeof client.pathological.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.pathological.$post> | undefined,
    Error,
    InferRequestType<typeof client.pathological.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.pathological.$post(args, options?.client)),
    },
    queryClient,
  )
}

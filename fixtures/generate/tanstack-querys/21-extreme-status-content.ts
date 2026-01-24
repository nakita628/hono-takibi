import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/21-extreme-status-content'

/**
 * GET /extreme-responses
 */
export function useGetExtremeResponses(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['extreme-responses']['$get']>,
      Error,
      InferResponseType<(typeof client)['extreme-responses']['$get']>,
      readonly ['/extreme-responses']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetExtremeResponsesQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['extreme-responses'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /extreme-responses
 */
export function getGetExtremeResponsesQueryKey() {
  return ['/extreme-responses'] as const
}

/**
 * POST /multipart-variations
 */
export function usePostMultipartVariations(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client)['multipart-variations']['$post']>,
      ) => parseResponse(client['multipart-variations'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /charset-variations
 */
export function usePostCharsetVariations(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client)['charset-variations']['$post']>) =>
        parseResponse(client['charset-variations'].$post(args, options?.client)),
    },
    queryClient,
  )
}

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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['extreme-responses']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetExtremeResponsesQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client['extreme-responses'].$get(undefined, clientOptions)),
      ...queryOptions,
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
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['multipart-variations']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['multipart-variations']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['multipart-variations']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['multipart-variations']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['multipart-variations'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /charset-variations
 */
export function usePostCharsetVariations(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['charset-variations']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['charset-variations']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['charset-variations']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['charset-variations']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['charset-variations'].$post(args, options?.client)),
    },
    queryClient,
  )
}

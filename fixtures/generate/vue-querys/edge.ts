import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/edge'

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export function usePostPolymorphic(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.polymorphic.$post> | undefined,
      Error,
      InferRequestType<typeof client.polymorphic.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.polymorphic.$post> | undefined,
    Error,
    InferRequestType<typeof client.polymorphic.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.polymorphic.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /search
 *
 * Search with complex query
 */
export function useGetSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.search.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSearchQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.search.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /search
 */
export function getGetSearchQueryKey(args?: InferRequestType<typeof client.search.$get>) {
  return ['/search', ...(args ? [args] : [])] as const
}

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export function usePutMultiStep(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['multi-step']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client)['multi-step']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['multi-step']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client)['multi-step']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client['multi-step'].$put(args, options?.client)),
    },
    queryClient,
  )
}

import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/03-parameters-responses'

/**
 * GET /items
 */
export function useGetItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.items.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetItemsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.items.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /items
 */
export function getGetItemsQueryKey(args?: InferRequestType<typeof client.items.$get>) {
  return ['/items', ...(args ? [args] : [])] as const
}

/**
 * GET /items/{itemId}
 */
export function useGetItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.items)[':itemId']['$get']>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetItemsItemIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.items[':itemId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /items/{itemId}
 */
export function getGetItemsItemIdQueryKey(
  args?: InferRequestType<(typeof client.items)[':itemId']['$get']>,
) {
  return ['/items/:itemId', ...(args ? [args] : [])] as const
}

/**
 * DELETE /items/{itemId}
 */
export function useDeleteItemsItemId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.items)[':itemId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.items)[':itemId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.items)[':itemId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.items)[':itemId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.items[':itemId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

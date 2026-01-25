import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/03-parameters-responses'

/**
 * GET /items
 */
export function useGetItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetItemsQueryKey(args),
    queryFn: async () => parseResponse(client.items.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /items
 */
export function getGetItemsQueryKey(args: InferRequestType<typeof client.items.$get>) {
  return ['/items', args] as const
}

/**
 * Returns TanStack Query query options for GET /items
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetItemsQueryOptions(
  args: InferRequestType<typeof client.items.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetItemsQueryKey(args),
    queryFn: async () => parseResponse(client.items.$get(args, clientOptions)),
  }
}

/**
 * GET /items/{itemId}
 */
export function useGetItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetItemsItemIdQueryKey(args),
    queryFn: async () => parseResponse(client.items[':itemId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /items/{itemId}
 */
export function getGetItemsItemIdQueryKey(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
) {
  return ['/items/:itemId', args] as const
}

/**
 * Returns TanStack Query query options for GET /items/{itemId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetItemsItemIdQueryOptions(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetItemsItemIdQueryKey(args),
    queryFn: async () => parseResponse(client.items[':itemId'].$get(args, clientOptions)),
  }
}

/**
 * DELETE /items/{itemId}
 */
export function useDeleteItemsItemId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.items)[':itemId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.items)[':itemId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.items)[':itemId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.items)[':itemId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.items)[':itemId']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.items)[':itemId']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.items)[':itemId']['$delete']>) =>
      parseResponse(client.items[':itemId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/03-parameters-responses'

/**
 * GET /items
 */
export function createGetItems(
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
  return createQuery({
    queryKey: getGetItemsQueryKey(args),
    queryFn: async () => parseResponse(client.items.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /items
 */
export function getGetItemsQueryKey(args: InferRequestType<typeof client.items.$get>) {
  return ['/items', args] as const
}

/**
 * GET /items/{itemId}
 */
export function createGetItemsItemId(
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
  return createQuery({
    queryKey: getGetItemsItemIdQueryKey(args),
    queryFn: async () => parseResponse(client.items[':itemId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /items/{itemId}
 */
export function getGetItemsItemIdQueryKey(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
) {
  return ['/items/:itemId', args] as const
}

/**
 * DELETE /items/{itemId}
 */
export function createDeleteItemsItemId(options?: {
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
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.items)[':itemId']['$delete']>) =>
      parseResponse(client.items[':itemId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

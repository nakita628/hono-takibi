import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/06-headers'

/**
 * GET /resources
 */
export function createGetResources(
  args: InferRequestType<typeof client.resources.$get>,
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
  return createQuery({ ...getGetResourcesQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /resources
 */
export function getGetResourcesQueryKey(args: InferRequestType<typeof client.resources.$get>) {
  return ['/resources', args] as const
}

/**
 * Returns Svelte Query query options for GET /resources
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetResourcesQueryOptions = (
  args: InferRequestType<typeof client.resources.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetResourcesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.resources.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /resources/{id}
 */
export function createGetResourcesId(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
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
  return createQuery({ ...getGetResourcesIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /resources/{id}
 */
export function getGetResourcesIdQueryKey(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
) {
  return ['/resources/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /resources/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetResourcesIdQueryOptions = (
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetResourcesIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.resources[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /resources/{id}
 */
export function createPutResourcesId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.resources)[':id']['$put']>,
      variables: InferRequestType<(typeof client.resources)[':id']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.resources)[':id']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.resources)[':id']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.resources)[':id']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.resources)[':id']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.resources)[':id']['$put']>) =>
      parseResponse(client.resources[':id'].$put(args, clientOptions)),
  })
}

/**
 * GET /download/{id}
 */
export function createGetDownloadId(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
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
  return createQuery({ ...getGetDownloadIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /download/{id}
 */
export function getGetDownloadIdQueryKey(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
) {
  return ['/download/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /download/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDownloadIdQueryOptions = (
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetDownloadIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.download[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

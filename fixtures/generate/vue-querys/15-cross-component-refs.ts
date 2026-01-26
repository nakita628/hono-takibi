import { useQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/15-cross-component-refs'

/**
 * GET /entities
 */
export function useGetEntities(
  args: InferRequestType<typeof client.entities.$get>,
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
  return useQuery({ ...getGetEntitiesQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /entities
 */
export function getGetEntitiesQueryKey(args: InferRequestType<typeof client.entities.$get>) {
  return ['/entities', args] as const
}

/**
 * Returns Vue Query query options for GET /entities
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEntitiesQueryOptions = (
  args: InferRequestType<typeof client.entities.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetEntitiesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.entities.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /entities
 */
export function usePostEntities(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.entities.$post>,
      variables: InferRequestType<typeof client.entities.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.entities.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.entities.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.entities.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.entities.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.entities.$post>) =>
      parseResponse(client.entities.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /entities/{entityId}
 */
export function useGetEntitiesEntityId(
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
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
  return useQuery({ ...getGetEntitiesEntityIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /entities/{entityId}
 */
export function getGetEntitiesEntityIdQueryKey(
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
) {
  return ['/entities/:entityId', args] as const
}

/**
 * Returns Vue Query query options for GET /entities/{entityId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEntitiesEntityIdQueryOptions = (
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetEntitiesEntityIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.entities[':entityId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /entities/{entityId}
 */
export function usePutEntitiesEntityId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.entities)[':entityId']['$put']>,
      variables: InferRequestType<(typeof client.entities)[':entityId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.entities)[':entityId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.entities)[':entityId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.entities)[':entityId']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.entities)[':entityId']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.entities)[':entityId']['$put']>) =>
      parseResponse(client.entities[':entityId'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /entities/{entityId}
 */
export function useDeleteEntitiesEntityId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.entities)[':entityId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.entities)[':entityId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.entities)[':entityId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.entities)[':entityId']['$delete']>
        | undefined
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.entities)[':entityId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.entities)[':entityId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.entities)[':entityId']['$delete']>) =>
      parseResponse(client.entities[':entityId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /entities/{entityId}/relationships
 */
export function useGetEntitiesEntityIdRelationships(
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
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
    ...getGetEntitiesEntityIdRelationshipsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /entities/{entityId}/relationships
 */
export function getGetEntitiesEntityIdRelationshipsQueryKey(
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
) {
  return ['/entities/:entityId/relationships', args] as const
}

/**
 * Returns Vue Query query options for GET /entities/{entityId}/relationships
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEntitiesEntityIdRelationshipsQueryOptions = (
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetEntitiesEntityIdRelationshipsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.entities[':entityId'].relationships.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /entities/{entityId}/relationships
 */
export function usePostEntitiesEntityIdRelationships(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.entities)[':entityId']['relationships']['$post']>,
      variables: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.entities)[':entityId']['relationships']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>,
    ) => parseResponse(client.entities[':entityId'].relationships.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /batch
 */
export function usePostBatch(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.batch.$post>,
      variables: InferRequestType<typeof client.batch.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.batch.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.batch.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.batch.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.batch.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.batch.$post>) =>
      parseResponse(client.batch.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

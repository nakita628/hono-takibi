import { useQuery, useMutation } from '@tanstack/react-query'
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/15-cross-component-refs'

/**
 * GET /entities
 */
export function useGetEntities(
  args: InferRequestType<typeof client.entities.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.entities.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetEntitiesQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /entities
 * Uses $url() for type-safe key generation
 */
export function getGetEntitiesQueryKey(args: InferRequestType<typeof client.entities.$get>) {
  return [client.entities.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /entities
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEntitiesQueryOptions = (
  args: InferRequestType<typeof client.entities.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetEntitiesQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.entities.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * POST /entities
 */
export function usePostEntities(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.entities.$post>>>>>,
    Error,
    InferRequestType<typeof client.entities.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.entities.$post>) =>
      parseResponse(client.entities.$post(args, clientOptions)),
  })
}

/**
 * GET /entities/{entityId}
 */
export function useGetEntitiesEntityId(
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.entities)[':entityId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetEntitiesEntityIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /entities/{entityId}
 * Uses $url() for type-safe key generation
 */
export function getGetEntitiesEntityIdQueryKey(
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
) {
  return [client.entities[':entityId'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /entities/{entityId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEntitiesEntityIdQueryOptions = (
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetEntitiesEntityIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.entities)[':entityId']['$put']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.entities)[':entityId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.entities)[':entityId']['$put']>) =>
      parseResponse(client.entities[':entityId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /entities/{entityId}
 */
export function useDeleteEntitiesEntityId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.entities)[':entityId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.entities)[':entityId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.entities)[':entityId']['$delete']>) =>
      parseResponse(client.entities[':entityId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /entities/{entityId}/relationships
 */
export function useGetEntitiesEntityIdRelationships(
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.entities)[':entityId']['relationships']['$get']>>
          >
        >
      >,
      Error
    >
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
 * Generates TanStack Query cache key for GET /entities/{entityId}/relationships
 * Uses $url() for type-safe key generation
 */
export function getGetEntitiesEntityIdRelationshipsQueryKey(
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
) {
  return [client.entities[':entityId'].relationships.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /entities/{entityId}/relationships
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEntitiesEntityIdRelationshipsQueryOptions = (
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetEntitiesEntityIdRelationshipsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.entities)[':entityId']['relationships']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>,
    ) => parseResponse(client.entities[':entityId'].relationships.$post(args, clientOptions)),
  })
}

/**
 * POST /batch
 */
export function usePostBatch(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.batch.$post>>>>>,
    Error,
    InferRequestType<typeof client.batch.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.batch.$post>) =>
      parseResponse(client.batch.$post(args, clientOptions)),
  })
}

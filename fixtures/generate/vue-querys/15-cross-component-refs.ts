import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/15-cross-component-refs'

/**
 * Generates Vue Query cache key for GET /entities
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetEntitiesQueryKey(
  args: MaybeRef<InferRequestType<typeof client.entities.$get>>,
) {
  return ['entities', '/entities', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /entities
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEntitiesQueryOptions = (
  args: InferRequestType<typeof client.entities.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetEntitiesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.entities.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /entities
 */
export function useGetEntities(
  args: InferRequestType<typeof client.entities.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.entities.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetEntitiesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /entities
 */
export function usePostEntities(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.entities.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.entities.$post>
      >,
      'mutationFn'
    >
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
 * Generates Vue Query cache key for GET /entities/{entityId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetEntitiesEntityIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.entities)[':entityId']['$get']>>,
) {
  return ['entities', '/entities/:entityId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /entities/{entityId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEntitiesEntityIdQueryOptions = (
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetEntitiesEntityIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.entities[':entityId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /entities/{entityId}
 */
export function useGetEntitiesEntityId(
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.entities)[':entityId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetEntitiesEntityIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /entities/{entityId}
 */
export function usePutEntitiesEntityId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.entities)[':entityId']['$put']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.entities)[':entityId']['$put']>
      >,
      'mutationFn'
    >
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
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn'
    >
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
 * Generates Vue Query cache key for GET /entities/{entityId}/relationships
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetEntitiesEntityIdRelationshipsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>>,
) {
  return ['entities', '/entities/:entityId/relationships', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /entities/{entityId}/relationships
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEntitiesEntityIdRelationshipsQueryOptions = (
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetEntitiesEntityIdRelationshipsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.entities[':entityId'].relationships.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /entities/{entityId}/relationships
 */
export function useGetEntitiesEntityIdRelationships(
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.entities)[':entityId']['relationships']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetEntitiesEntityIdRelationshipsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /entities/{entityId}/relationships
 */
export function usePostEntitiesEntityIdRelationships(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.entities)[':entityId']['relationships']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>
      >,
      'mutationFn'
    >
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
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.batch.$post>>>>>,
        Error,
        InferRequestType<typeof client.batch.$post>
      >,
      'mutationFn'
    >
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

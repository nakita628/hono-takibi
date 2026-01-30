import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/15-cross-component-refs'

/**
 * Generates TanStack Query cache key for GET /entities
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetEntitiesQueryKey(args: InferRequestType<typeof client.entities.$get>) {
  return ['entities', 'GET', '/entities', args] as const
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
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.entities.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetEntitiesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /entities
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostEntitiesMutationKey() {
  return ['entities', 'POST', '/entities'] as const
}

/**
 * Returns TanStack Query mutation options for POST /entities
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostEntitiesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostEntitiesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.entities.$post>) =>
    parseResponse(client.entities.$post(args, clientOptions)),
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
  const { mutationKey, mutationFn, ...baseOptions } = getPostEntitiesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query cache key for GET /entities/{entityId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetEntitiesEntityIdQueryKey(
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
) {
  return ['entities', 'GET', '/entities/:entityId', args] as const
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
  const { queryKey, queryFn, ...baseOptions } = getGetEntitiesEntityIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for PUT /entities/{entityId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutEntitiesEntityIdMutationKey() {
  return ['entities', 'PUT', '/entities/:entityId'] as const
}

/**
 * Returns TanStack Query mutation options for PUT /entities/{entityId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutEntitiesEntityIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutEntitiesEntityIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.entities)[':entityId']['$put']>) =>
    parseResponse(client.entities[':entityId'].$put(args, clientOptions)),
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
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutEntitiesEntityIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query mutation key for DELETE /entities/{entityId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteEntitiesEntityIdMutationKey() {
  return ['entities', 'DELETE', '/entities/:entityId'] as const
}

/**
 * Returns TanStack Query mutation options for DELETE /entities/{entityId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteEntitiesEntityIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteEntitiesEntityIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.entities)[':entityId']['$delete']>) =>
    parseResponse(client.entities[':entityId'].$delete(args, clientOptions)),
})

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
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteEntitiesEntityIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query cache key for GET /entities/{entityId}/relationships
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetEntitiesEntityIdRelationshipsQueryKey(
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
) {
  return ['entities', 'GET', '/entities/:entityId/relationships', args] as const
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
  const { queryKey, queryFn, ...baseOptions } = getGetEntitiesEntityIdRelationshipsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /entities/{entityId}/relationships
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostEntitiesEntityIdRelationshipsMutationKey() {
  return ['entities', 'POST', '/entities/:entityId/relationships'] as const
}

/**
 * Returns TanStack Query mutation options for POST /entities/{entityId}/relationships
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostEntitiesEntityIdRelationshipsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostEntitiesEntityIdRelationshipsMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>,
  ) => parseResponse(client.entities[':entityId'].relationships.$post(args, clientOptions)),
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
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostEntitiesEntityIdRelationshipsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query mutation key for POST /batch
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostBatchMutationKey() {
  return ['batch', 'POST', '/batch'] as const
}

/**
 * Returns TanStack Query mutation options for POST /batch
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostBatchMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostBatchMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.batch.$post>) =>
    parseResponse(client.batch.$post(args, clientOptions)),
})

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
  const { mutationKey, mutationFn, ...baseOptions } = getPostBatchMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

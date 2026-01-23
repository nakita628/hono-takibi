import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/15-cross-component-refs'

/**
 * GET /entities
 */
export function useGetEntities(
  args: InferRequestType<typeof client.entities.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.entities.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEntitiesQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.entities.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /entities
 */
export function getGetEntitiesQueryKey(args: InferRequestType<typeof client.entities.$get>) {
  return ['GET', '/entities', args] as const
}

/**
 * POST /entities
 */
export function usePostEntities(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.entities.$post> | undefined,
      Error,
      InferRequestType<typeof client.entities.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.entities.$post> | undefined,
    Error,
    InferRequestType<typeof client.entities.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.entities.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /entities/{entityId}
 */
export function useGetEntitiesEntityId(
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.entities)[':entityId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEntitiesEntityIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.entities[':entityId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /entities/{entityId}
 */
export function getGetEntitiesEntityIdQueryKey(
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
) {
  return ['GET', '/entities/:entityId', args] as const
}

/**
 * PUT /entities/{entityId}
 */
export function usePutEntitiesEntityId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.entities)[':entityId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.entities)[':entityId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.entities)[':entityId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.entities)[':entityId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.entities[':entityId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /entities/{entityId}
 */
export function useDeleteEntitiesEntityId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.entities)[':entityId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.entities)[':entityId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.entities)[':entityId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.entities)[':entityId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.entities[':entityId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /entities/{entityId}/relationships
 */
export function useGetEntitiesEntityIdRelationships(
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.entities)[':entityId']['relationships']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEntitiesEntityIdRelationshipsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.entities[':entityId'].relationships.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /entities/{entityId}/relationships
 */
export function getGetEntitiesEntityIdRelationshipsQueryKey(
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
) {
  return ['GET', '/entities/:entityId/relationships', args] as const
}

/**
 * POST /entities/{entityId}/relationships
 */
export function usePostEntitiesEntityIdRelationships(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.entities)[':entityId']['relationships']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.entities)[':entityId']['relationships']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.entities[':entityId'].relationships.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /batch
 */
export function usePostBatch(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.batch.$post> | undefined,
      Error,
      InferRequestType<typeof client.batch.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.batch.$post> | undefined,
    Error,
    InferRequestType<typeof client.batch.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.batch.$post(args, options?.client)),
    },
    queryClient,
  )
}

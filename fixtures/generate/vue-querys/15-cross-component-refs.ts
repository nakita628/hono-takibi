import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/15-cross-component-refs'

/**
 * GET /entities
 */
export function useGetEntities(
  args: InferRequestType<typeof client.entities.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetEntitiesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.entities.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /entities
 */
export function getGetEntitiesQueryKey(args: InferRequestType<typeof client.entities.$get>) {
  return ['/entities', args] as const
}

/**
 * POST /entities
 */
export function usePostEntities(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.entities.$post> | undefined,
    Error,
    InferRequestType<typeof client.entities.$post>
  >({ mutationFn: async (args) => parseResponse(client.entities.$post(args, clientOptions)) })
}

/**
 * GET /entities/{entityId}
 */
export function useGetEntitiesEntityId(
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetEntitiesEntityIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.entities[':entityId'].$get(args, clientOptions)),
  })
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
 * PUT /entities/{entityId}
 */
export function usePutEntitiesEntityId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.entities)[':entityId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.entities)[':entityId']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.entities[':entityId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /entities/{entityId}
 */
export function useDeleteEntitiesEntityId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.entities)[':entityId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.entities)[':entityId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.entities[':entityId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /entities/{entityId}/relationships
 */
export function useGetEntitiesEntityIdRelationships(
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetEntitiesEntityIdRelationshipsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.entities[':entityId'].relationships.$get(args, clientOptions)),
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
 * POST /entities/{entityId}/relationships
 */
export function usePostEntitiesEntityIdRelationships(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.entities)[':entityId']['relationships']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.entities[':entityId'].relationships.$post(args, clientOptions)),
  })
}

/**
 * POST /batch
 */
export function usePostBatch(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.batch.$post> | undefined,
    Error,
    InferRequestType<typeof client.batch.$post>
  >({ mutationFn: async (args) => parseResponse(client.batch.$post(args, clientOptions)) })
}

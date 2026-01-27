import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/15-cross-component-refs'

/**
 * Generates SWR cache key for GET /entities
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetEntitiesKey(args: InferRequestType<typeof client.entities.$get>) {
  return ['entities', 'GET', '/entities', args] as const
}

/**
 * GET /entities
 */
export function useGetEntities(
  args: InferRequestType<typeof client.entities.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetEntitiesKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.entities.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /entities
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostEntitiesMutationKey() {
  return ['entities', 'POST', '/entities'] as const
}

/**
 * POST /entities
 */
export function usePostEntities(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.entities.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.entities.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostEntitiesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.entities.$post> }) =>
        parseResponse(client.entities.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /entities/{entityId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetEntitiesEntityIdKey(
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
) {
  return ['entities', 'GET', '/entities/:entityId', args] as const
}

/**
 * GET /entities/{entityId}
 */
export function useGetEntitiesEntityId(
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetEntitiesEntityIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.entities[':entityId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /entities/{entityId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutEntitiesEntityIdMutationKey() {
  return ['entities', 'PUT', '/entities/:entityId'] as const
}

/**
 * PUT /entities/{entityId}
 */
export function usePutEntitiesEntityId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.entities)[':entityId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.entities)[':entityId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutEntitiesEntityIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.entities)[':entityId']['$put']> },
      ) => parseResponse(client.entities[':entityId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /entities/{entityId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteEntitiesEntityIdMutationKey() {
  return ['entities', 'DELETE', '/entities/:entityId'] as const
}

/**
 * DELETE /entities/{entityId}
 */
export function useDeleteEntitiesEntityId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.entities)[':entityId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.entities)[':entityId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteEntitiesEntityIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.entities)[':entityId']['$delete']> },
      ) => parseResponse(client.entities[':entityId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /entities/{entityId}/relationships
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetEntitiesEntityIdRelationshipsKey(
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
) {
  return ['entities', 'GET', '/entities/:entityId/relationships', args] as const
}

/**
 * GET /entities/{entityId}/relationships
 */
export function useGetEntitiesEntityIdRelationships(
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetEntitiesEntityIdRelationshipsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.entities[':entityId'].relationships.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /entities/{entityId}/relationships
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostEntitiesEntityIdRelationshipsMutationKey() {
  return ['entities', 'POST', '/entities/:entityId/relationships'] as const
}

/**
 * POST /entities/{entityId}/relationships
 */
export function usePostEntitiesEntityIdRelationships(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.entities)[':entityId']['relationships']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostEntitiesEntityIdRelationshipsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>
        },
      ) => parseResponse(client.entities[':entityId'].relationships.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /batch
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostBatchMutationKey() {
  return ['batch', 'POST', '/batch'] as const
}

/**
 * POST /batch
 */
export function usePostBatch(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.batch.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.batch.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostBatchMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.batch.$post> }) =>
        parseResponse(client.batch.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

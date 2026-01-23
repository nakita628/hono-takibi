import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/15-cross-component-refs'

/**
 * GET /entities
 */
export function useGetEntities(
  args: InferRequestType<typeof client.entities.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.entities.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEntitiesKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.entities.$get>, Error>(
    swrKey,
    async () => parseResponse(client.entities.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /entities
 */
export function getGetEntitiesKey(args?: InferRequestType<typeof client.entities.$get>) {
  return ['/entities', ...(args ? [args] : [])] as const
}

/**
 * POST /entities
 */
export function usePostEntities(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.entities.$post>,
    Error,
    string,
    InferRequestType<typeof client.entities.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.entities.$post>,
    Error,
    string,
    InferRequestType<typeof client.entities.$post>
  >(
    'POST /entities',
    async (_, { arg }) => parseResponse(client.entities.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /entities/{entityId}
 */
export function useGetEntitiesEntityId(
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.entities)[':entityId']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEntitiesEntityIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.entities)[':entityId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.entities[':entityId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /entities/{entityId}
 */
export function getGetEntitiesEntityIdKey(
  args?: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
) {
  return ['/entities/:entityId', ...(args ? [args] : [])] as const
}

/**
 * PUT /entities/{entityId}
 */
export function usePutEntitiesEntityId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.entities)[':entityId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.entities)[':entityId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.entities)[':entityId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.entities)[':entityId']['$put']>
  >(
    'PUT /entities/:entityId',
    async (_, { arg }) => parseResponse(client.entities[':entityId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /entities/{entityId}
 */
export function useDeleteEntitiesEntityId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.entities)[':entityId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.entities)[':entityId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.entities)[':entityId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.entities)[':entityId']['$delete']>
  >(
    'DELETE /entities/:entityId',
    async (_, { arg }) => parseResponse(client.entities[':entityId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /entities/{entityId}/relationships
 */
export function useGetEntitiesEntityIdRelationships(
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.entities)[':entityId']['relationships']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetEntitiesEntityIdRelationshipsKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.entities)[':entityId']['relationships']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.entities[':entityId'].relationships.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /entities/{entityId}/relationships
 */
export function getGetEntitiesEntityIdRelationshipsKey(
  args?: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
) {
  return ['/entities/:entityId/relationships', ...(args ? [args] : [])] as const
}

/**
 * POST /entities/{entityId}/relationships
 */
export function usePostEntitiesEntityIdRelationships(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.entities)[':entityId']['relationships']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.entities)[':entityId']['relationships']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>
  >(
    'POST /entities/:entityId/relationships',
    async (_, { arg }) =>
      parseResponse(client.entities[':entityId'].relationships.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /batch
 */
export function usePostBatch(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.batch.$post>,
    Error,
    string,
    InferRequestType<typeof client.batch.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.batch.$post>,
    Error,
    string,
    InferRequestType<typeof client.batch.$post>
  >(
    'POST /batch',
    async (_, { arg }) => parseResponse(client.batch.$post(arg, options?.client)),
    options?.swr,
  )
}

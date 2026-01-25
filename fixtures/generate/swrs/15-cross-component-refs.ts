import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/15-cross-component-refs'

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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEntitiesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.entities.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.entities.$post>,
    Error,
    string,
    InferRequestType<typeof client.entities.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /entities',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.entities.$post> }) =>
      parseResponse(client.entities.$post(arg, options?.client)),
    mutationOptions,
  )
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEntitiesEntityIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.entities[':entityId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.entities)[':entityId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.entities)[':entityId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /entities/:entityId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.entities)[':entityId']['$put']> },
    ) => parseResponse(client.entities[':entityId'].$put(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /entities/{entityId}
 */
export function useDeleteEntitiesEntityId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.entities)[':entityId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.entities)[':entityId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /entities/:entityId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.entities)[':entityId']['$delete']> },
    ) => parseResponse(client.entities[':entityId'].$delete(arg, options?.client)),
    mutationOptions,
  )
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetEntitiesEntityIdRelationshipsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.entities[':entityId'].relationships.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.entities)[':entityId']['relationships']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /entities/:entityId/relationships',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']> },
    ) => parseResponse(client.entities[':entityId'].relationships.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /batch
 */
export function usePostBatch(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.batch.$post>,
    Error,
    string,
    InferRequestType<typeof client.batch.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /batch',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.batch.$post> }) =>
      parseResponse(client.batch.$post(arg, options?.client)),
    mutationOptions,
  )
}

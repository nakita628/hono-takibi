import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/06-headers'

/**
 * Generates SWR cache key for GET /resources
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetResourcesKey(args: InferRequestType<typeof client.resources.$get>) {
  return ['resources', 'GET', '/resources', args] as const
}

/**
 * GET /resources
 */
export function useGetResources(
  args: InferRequestType<typeof client.resources.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetResourcesKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.resources.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /resources/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetResourcesIdKey(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
) {
  return ['resources', 'GET', '/resources/:id', args] as const
}

/**
 * GET /resources/{id}
 */
export function useGetResourcesId(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetResourcesIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.resources[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /resources/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutResourcesIdMutationKey() {
  return ['resources', 'PUT', '/resources/:id'] as const
}

/**
 * PUT /resources/{id}
 */
export function usePutResourcesId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.resources)[':id']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.resources)[':id']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutResourcesIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.resources)[':id']['$put']> },
      ) => parseResponse(client.resources[':id'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /download/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetDownloadIdKey(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
) {
  return ['download', 'GET', '/download/:id', args] as const
}

/**
 * GET /download/{id}
 */
export function useGetDownloadId(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetDownloadIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.download[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/06-headers'

/**
 * GET /resources
 */
export function useGetResources(
  args: InferRequestType<typeof client.resources.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.resources.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/resources', args] as const) : null
  return useSWR<InferResponseType<typeof client.resources.$get>, Error>(
    key,
    async () => parseResponse(client.resources.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /resources
 */
export function getGetResourcesKey(args: InferRequestType<typeof client.resources.$get>) {
  return ['GET', '/resources', args] as const
}

/**
 * GET /resources/{id}
 */
export function useGetResourcesId(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.resources)[':id']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/resources/:id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.resources)[':id']['$get']>, Error>(
    key,
    async () => parseResponse(client.resources[':id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /resources/{id}
 */
export function getGetResourcesIdKey(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
) {
  return ['GET', '/resources/:id', args] as const
}

/**
 * PUT /resources/{id}
 */
export function usePutResourcesId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.resources)[':id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.resources)[':id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.resources)[':id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.resources)[':id']['$put']>
  >(
    'PUT /resources/:id',
    async (_, { arg }) => parseResponse(client.resources[':id'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /download/{id}
 */
export function useGetDownloadId(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.download)[':id']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/download/:id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.download)[':id']['$get']>, Error>(
    key,
    async () => parseResponse(client.download[':id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /download/{id}
 */
export function getGetDownloadIdKey(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
) {
  return ['GET', '/download/:id', args] as const
}

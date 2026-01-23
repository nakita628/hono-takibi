import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/06-headers'

/**
 * GET /resources
 */
export function useGetResources(
  args: InferRequestType<typeof client.resources.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetResourcesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.resources.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /resources
 */
export function getGetResourcesQueryKey(args: InferRequestType<typeof client.resources.$get>) {
  return ['/resources', args] as const
}

/**
 * GET /resources/{id}
 */
export function useGetResourcesId(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetResourcesIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.resources[':id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /resources/{id}
 */
export function getGetResourcesIdQueryKey(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
) {
  return ['/resources/:id', args] as const
}

/**
 * PUT /resources/{id}
 */
export function usePutResourcesId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.resources)[':id']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.resources)[':id']['$put']>
  >({
    mutationFn: async (args) => parseResponse(client.resources[':id'].$put(args, clientOptions)),
  })
}

/**
 * GET /download/{id}
 */
export function useGetDownloadId(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetDownloadIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.download[':id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /download/{id}
 */
export function getGetDownloadIdQueryKey(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
) {
  return ['/download/:id', args] as const
}

import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/06-headers'

/**
 * Generates TanStack Query cache key for GET /resources
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetResourcesQueryKey(args: InferRequestType<typeof client.resources.$get>) {
  return ['resources', '/resources', args] as const
}

/**
 * Returns TanStack Query query options for GET /resources
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetResourcesQueryOptions = (
  args: InferRequestType<typeof client.resources.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetResourcesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.resources.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /resources
 */
export function useGetResources(
  args: InferRequestType<typeof client.resources.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.resources.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetResourcesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /resources/{id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetResourcesIdQueryKey(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
) {
  return ['resources', '/resources/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /resources/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetResourcesIdQueryOptions = (
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetResourcesIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.resources[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /resources/{id}
 */
export function useGetResourcesId(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.resources)[':id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetResourcesIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for PUT /resources/{id}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPutResourcesIdMutationKey() {
  return ['PUT', '/resources/:id'] as const
}

/**
 * Returns TanStack Query mutation options for PUT /resources/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutResourcesIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutResourcesIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.resources)[':id']['$put']>) =>
    parseResponse(client.resources[':id'].$put(args, clientOptions)),
})

/**
 * PUT /resources/{id}
 */
export function usePutResourcesId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.resources)[':id']['$put']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.resources)[':id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.resources)[':id']['$put']>) =>
      parseResponse(client.resources[':id'].$put(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /download/{id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetDownloadIdQueryKey(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
) {
  return ['download', '/download/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /download/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDownloadIdQueryOptions = (
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetDownloadIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.download[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /download/{id}
 */
export function useGetDownloadId(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.download)[':id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetDownloadIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

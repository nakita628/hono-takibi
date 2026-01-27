import type { QueryFunctionContext, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { MaybeRef } from 'vue'
import { unref } from 'vue'
import { client } from '../clients/06-headers'

/**
 * Generates Vue Query cache key for GET /resources
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetResourcesQueryKey(
  args: MaybeRef<InferRequestType<typeof client.resources.$get>>,
) {
  return ['resources', 'GET', '/resources', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /resources
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.resources.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetResourcesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /resources/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetResourcesIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.resources)[':id']['$get']>>,
) {
  return ['resources', 'GET', '/resources/:id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /resources/{id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.resources)[':id']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetResourcesIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /resources/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutResourcesIdMutationKey() {
  return ['resources', 'PUT', '/resources/:id'] as const
}

/**
 * Returns Vue Query mutation options for PUT /resources/{id}
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
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.resources)[':id']['$put']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.resources)[':id']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutResourcesIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /download/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetDownloadIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.download)[':id']['$get']>>,
) {
  return ['download', 'GET', '/download/:id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /download/{id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.download)[':id']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetDownloadIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/06-headers'

/**
 * Generates Svelte Query cache key for GET /resources
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetResourcesQueryKey(args: InferRequestType<typeof client.resources.$get>) {
  return ['resources', 'GET', '/resources', args] as const
}

/**
 * Returns Svelte Query query options for GET /resources
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
export function createGetResources(
  args: InferRequestType<typeof client.resources.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.resources.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetResourcesQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /resources/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetResourcesIdQueryKey(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
) {
  return ['resources', 'GET', '/resources/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /resources/{id}
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
export function createGetResourcesId(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetResourcesIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /resources/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutResourcesIdMutationKey() {
  return ['resources', 'PUT', '/resources/:id'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /resources/{id}
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
export function createPutResourcesId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.resources)[':id']['$put']>>>
        >
      >,
      Error,
      InferRequestType<(typeof client.resources)[':id']['$put']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutResourcesIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /download/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetDownloadIdQueryKey(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
) {
  return ['download', 'GET', '/download/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /download/{id}
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
export function createGetDownloadId(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetDownloadIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

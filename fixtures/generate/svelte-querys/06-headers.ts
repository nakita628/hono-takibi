import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/06-headers'

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
 * Generates Svelte Query cache key for GET /resources
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetResourcesQueryKey(args: InferRequestType<typeof client.resources.$get>) {
  const u = client.resources.$url(args)
  return [u.pathname + u.search] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.resources.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
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
 * Generates Svelte Query cache key for GET /resources/{id}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetResourcesIdQueryKey(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
) {
  const u = client.resources[':id'].$url(args)
  return [u.pathname + u.search] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.resources[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PUT /resources/{id}
 */
export function createPutResourcesId(options?: {
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
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.resources)[':id']['$put']>) =>
      parseResponse(client.resources[':id'].$put(args, clientOptions)),
  }))
}

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

/**
 * Generates Svelte Query cache key for GET /download/{id}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetDownloadIdQueryKey(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
) {
  const u = client.download[':id'].$url(args)
  return [u.pathname + u.search] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.download[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

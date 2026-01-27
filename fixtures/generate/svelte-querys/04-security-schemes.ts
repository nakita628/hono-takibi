import { createQuery } from '@tanstack/svelte-query'
import type { CreateQueryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/04-security-schemes'

/**
 * GET /public
 */
export function createGetPublic(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.public.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPublicQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /public
 * Uses $url() for type-safe key generation
 */
export function getGetPublicQueryKey() {
  return [client.public.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPublicQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPublicQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.public.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /protected
 */
export function createGetProtected(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.protected.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetProtectedQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /protected
 * Uses $url() for type-safe key generation
 */
export function getGetProtectedQueryKey() {
  return [client.protected.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProtectedQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetProtectedQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.protected.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /admin
 */
export function createGetAdmin(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.admin.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAdminQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /admin
 * Uses $url() for type-safe key generation
 */
export function getGetAdminQueryKey() {
  return [client.admin.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /admin
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAdminQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAdminQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.admin.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /oauth-resource
 */
export function createGetOauthResource(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['oauth-resource']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetOauthResourceQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /oauth-resource
 * Uses $url() for type-safe key generation
 */
export function getGetOauthResourceQueryKey() {
  return [client['oauth-resource'].$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /oauth-resource
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauthResourceQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOauthResourceQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['oauth-resource'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /multi-auth
 */
export function createGetMultiAuth(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-auth']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMultiAuthQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /multi-auth
 * Uses $url() for type-safe key generation
 */
export function getGetMultiAuthQueryKey() {
  return [client['multi-auth'].$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /multi-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMultiAuthQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMultiAuthQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['multi-auth'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

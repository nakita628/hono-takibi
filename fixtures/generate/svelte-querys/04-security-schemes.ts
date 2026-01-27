import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
import { createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/04-security-schemes'

/**
 * Generates Svelte Query cache key for GET /public
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetPublicQueryKey() {
  return ['public', 'GET', '/public'] as const
}

/**
 * Returns Svelte Query query options for GET /public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPublicQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPublicQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.public.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

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
 * Generates Svelte Query cache key for GET /protected
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetProtectedQueryKey() {
  return ['protected', 'GET', '/protected'] as const
}

/**
 * Returns Svelte Query query options for GET /protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProtectedQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetProtectedQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.protected.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
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
 * Generates Svelte Query cache key for GET /admin
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAdminQueryKey() {
  return ['admin', 'GET', '/admin'] as const
}

/**
 * Returns Svelte Query query options for GET /admin
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAdminQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAdminQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.admin.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
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
 * Generates Svelte Query cache key for GET /oauth-resource
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOauthResourceQueryKey() {
  return ['oauth-resource', 'GET', '/oauth-resource'] as const
}

/**
 * Returns Svelte Query query options for GET /oauth-resource
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauthResourceQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOauthResourceQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['oauth-resource'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
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
 * Generates Svelte Query cache key for GET /multi-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMultiAuthQueryKey() {
  return ['multi-auth', 'GET', '/multi-auth'] as const
}

/**
 * Returns Svelte Query query options for GET /multi-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMultiAuthQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMultiAuthQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['multi-auth'].$get(undefined, {
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

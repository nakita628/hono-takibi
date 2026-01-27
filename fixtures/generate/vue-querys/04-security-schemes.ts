import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/04-security-schemes'

/**
 * GET /public
 */
export function useGetPublic(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.public.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetPublicQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /public
 * Uses $url() for type-safe key generation
 */
export function getGetPublicQueryKey() {
  return [client.public.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /public
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
export function useGetProtected(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.protected.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetProtectedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /protected
 * Uses $url() for type-safe key generation
 */
export function getGetProtectedQueryKey() {
  return [client.protected.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /protected
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
export function useGetAdmin(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.admin.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetAdminQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /admin
 * Uses $url() for type-safe key generation
 */
export function getGetAdminQueryKey() {
  return [client.admin.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /admin
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
export function useGetOauthResource(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['oauth-resource']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetOauthResourceQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /oauth-resource
 * Uses $url() for type-safe key generation
 */
export function getGetOauthResourceQueryKey() {
  return [client['oauth-resource'].$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /oauth-resource
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
export function useGetMultiAuth(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-auth']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetMultiAuthQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /multi-auth
 * Uses $url() for type-safe key generation
 */
export function getGetMultiAuthQueryKey() {
  return [client['multi-auth'].$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /multi-auth
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

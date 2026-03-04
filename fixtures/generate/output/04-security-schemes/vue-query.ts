import { useQuery, useInfiniteQuery, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query cache key for GET /public
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetPublicQueryKey() {
  return ['public', 'GET', '/public'] as const
}

/**
 * GET /public
 */
export async function getPublic(options?: ClientRequestOptions) {
  return await parseResponse(client.public.$get(undefined, options))
}

/**
 * Returns Vue Query query options for GET /public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPublicQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetPublicQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPublic({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /public
 */
export function useGetPublic(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getPublic>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetPublicQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /public
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetPublicInfiniteQueryKey() {
  return ['public', 'GET', '/public', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /public
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPublicInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetPublicInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPublic({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /public
 */
export function useInfiniteGetPublic(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPublic>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getGetPublicInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /bearer-protected
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetBearerProtectedQueryKey() {
  return ['bearer-protected', 'GET', '/bearer-protected'] as const
}

/**
 * GET /bearer-protected
 */
export async function getBearerProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['bearer-protected'].$get(undefined, options))
}

/**
 * Returns Vue Query query options for GET /bearer-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetBearerProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetBearerProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBearerProtected({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /bearer-protected
 */
export function useGetBearerProtected(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getBearerProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetBearerProtectedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /bearer-protected
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetBearerProtectedInfiniteQueryKey() {
  return ['bearer-protected', 'GET', '/bearer-protected', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /bearer-protected
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetBearerProtectedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetBearerProtectedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBearerProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /bearer-protected
 */
export function useInfiniteGetBearerProtected(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getBearerProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetBearerProtectedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /api-key-protected
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetApiKeyProtectedQueryKey() {
  return ['api-key-protected', 'GET', '/api-key-protected'] as const
}

/**
 * GET /api-key-protected
 */
export async function getApiKeyProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['api-key-protected'].$get(undefined, options))
}

/**
 * Returns Vue Query query options for GET /api-key-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApiKeyProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetApiKeyProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiKeyProtected({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /api-key-protected
 */
export function useGetApiKeyProtected(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getApiKeyProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetApiKeyProtectedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /api-key-protected
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetApiKeyProtectedInfiniteQueryKey() {
  return ['api-key-protected', 'GET', '/api-key-protected', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /api-key-protected
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetApiKeyProtectedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetApiKeyProtectedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiKeyProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /api-key-protected
 */
export function useInfiniteGetApiKeyProtected(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiKeyProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetApiKeyProtectedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /basic-protected
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetBasicProtectedQueryKey() {
  return ['basic-protected', 'GET', '/basic-protected'] as const
}

/**
 * GET /basic-protected
 */
export async function getBasicProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['basic-protected'].$get(undefined, options))
}

/**
 * Returns Vue Query query options for GET /basic-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetBasicProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetBasicProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBasicProtected({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /basic-protected
 */
export function useGetBasicProtected(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getBasicProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetBasicProtectedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /basic-protected
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetBasicProtectedInfiniteQueryKey() {
  return ['basic-protected', 'GET', '/basic-protected', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /basic-protected
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetBasicProtectedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetBasicProtectedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBasicProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /basic-protected
 */
export function useInfiniteGetBasicProtected(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getBasicProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetBasicProtectedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /oauth-protected
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOauthProtectedQueryKey() {
  return ['oauth-protected', 'GET', '/oauth-protected'] as const
}

/**
 * GET /oauth-protected
 */
export async function getOauthProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['oauth-protected'].$get(undefined, options))
}

/**
 * Returns Vue Query query options for GET /oauth-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOauthProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetOauthProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getOauthProtected({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /oauth-protected
 */
export function useGetOauthProtected(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getOauthProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetOauthProtectedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /oauth-protected
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetOauthProtectedInfiniteQueryKey() {
  return ['oauth-protected', 'GET', '/oauth-protected', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /oauth-protected
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetOauthProtectedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetOauthProtectedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getOauthProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /oauth-protected
 */
export function useInfiniteGetOauthProtected(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getOauthProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetOauthProtectedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /multi-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMultiAuthQueryKey() {
  return ['multi-auth', 'GET', '/multi-auth'] as const
}

/**
 * GET /multi-auth
 */
export async function getMultiAuth(options?: ClientRequestOptions) {
  return await parseResponse(client['multi-auth'].$get(undefined, options))
}

/**
 * Returns Vue Query query options for GET /multi-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMultiAuthQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetMultiAuthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getMultiAuth({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /multi-auth
 */
export function useGetMultiAuth(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getMultiAuth>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetMultiAuthQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /multi-auth
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetMultiAuthInfiniteQueryKey() {
  return ['multi-auth', 'GET', '/multi-auth', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /multi-auth
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetMultiAuthInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetMultiAuthInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getMultiAuth({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /multi-auth
 */
export function useInfiniteGetMultiAuth(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMultiAuth>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetMultiAuthInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

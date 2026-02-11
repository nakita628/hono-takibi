import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates TanStack Query cache key for GET /public
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetPublicQueryKey() {
  return ['public', 'GET', '/public'] as const
}

/**
 * Returns TanStack Query query options for GET /public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPublicQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetPublicQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.public.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /public
 */
export function useGetPublic(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.public.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPublicQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /bearer-protected
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetBearerProtectedQueryKey() {
  return ['bearer-protected', 'GET', '/bearer-protected'] as const
}

/**
 * Returns TanStack Query query options for GET /bearer-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetBearerProtectedQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetBearerProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['bearer-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /bearer-protected
 */
export function useGetBearerProtected(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['bearer-protected']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetBearerProtectedQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /api-key-protected
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetApiKeyProtectedQueryKey() {
  return ['api-key-protected', 'GET', '/api-key-protected'] as const
}

/**
 * Returns TanStack Query query options for GET /api-key-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApiKeyProtectedQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetApiKeyProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['api-key-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /api-key-protected
 */
export function useGetApiKeyProtected(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['api-key-protected']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetApiKeyProtectedQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /basic-protected
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetBasicProtectedQueryKey() {
  return ['basic-protected', 'GET', '/basic-protected'] as const
}

/**
 * Returns TanStack Query query options for GET /basic-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetBasicProtectedQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetBasicProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['basic-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /basic-protected
 */
export function useGetBasicProtected(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['basic-protected']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetBasicProtectedQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /oauth-protected
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOauthProtectedQueryKey() {
  return ['oauth-protected', 'GET', '/oauth-protected'] as const
}

/**
 * Returns TanStack Query query options for GET /oauth-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOauthProtectedQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetOauthProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['oauth-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /oauth-protected
 */
export function useGetOauthProtected(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['oauth-protected']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOauthProtectedQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /multi-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMultiAuthQueryKey() {
  return ['multi-auth', 'GET', '/multi-auth'] as const
}

/**
 * Returns TanStack Query query options for GET /multi-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMultiAuthQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetMultiAuthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['multi-auth'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /multi-auth
 */
export function useGetMultiAuth(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-auth']['$get']>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMultiAuthQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

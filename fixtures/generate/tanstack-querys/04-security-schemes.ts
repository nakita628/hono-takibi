import { useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/04-security-schemes'

/**
 * GET /public
 */
export function useGetPublic(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPublicQueryKey(),
    queryFn: async () => parseResponse(client.public.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /public
 */
export function getGetPublicQueryKey() {
  return ['/public'] as const
}

/**
 * Returns TanStack Query query options for GET /public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPublicQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetPublicQueryKey(),
    queryFn: async () => parseResponse(client.public.$get(undefined, clientOptions)),
  }
}

/**
 * GET /protected
 */
export function useGetProtected(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetProtectedQueryKey(),
    queryFn: async () => parseResponse(client.protected.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /protected
 */
export function getGetProtectedQueryKey() {
  return ['/protected'] as const
}

/**
 * Returns TanStack Query query options for GET /protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetProtectedQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetProtectedQueryKey(),
    queryFn: async () => parseResponse(client.protected.$get(undefined, clientOptions)),
  }
}

/**
 * GET /admin
 */
export function useGetAdmin(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAdminQueryKey(),
    queryFn: async () => parseResponse(client.admin.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /admin
 */
export function getGetAdminQueryKey() {
  return ['/admin'] as const
}

/**
 * Returns TanStack Query query options for GET /admin
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAdminQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetAdminQueryKey(),
    queryFn: async () => parseResponse(client.admin.$get(undefined, clientOptions)),
  }
}

/**
 * GET /oauth-resource
 */
export function useGetOauthResource(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOauthResourceQueryKey(),
    queryFn: async () => parseResponse(client['oauth-resource'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /oauth-resource
 */
export function getGetOauthResourceQueryKey() {
  return ['/oauth-resource'] as const
}

/**
 * Returns TanStack Query query options for GET /oauth-resource
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOauthResourceQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetOauthResourceQueryKey(),
    queryFn: async () => parseResponse(client['oauth-resource'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /multi-auth
 */
export function useGetMultiAuth(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetMultiAuthQueryKey(),
    queryFn: async () => parseResponse(client['multi-auth'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /multi-auth
 */
export function getGetMultiAuthQueryKey() {
  return ['/multi-auth'] as const
}

/**
 * Returns TanStack Query query options for GET /multi-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMultiAuthQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetMultiAuthQueryKey(),
    queryFn: async () => parseResponse(client['multi-auth'].$get(undefined, clientOptions)),
  }
}

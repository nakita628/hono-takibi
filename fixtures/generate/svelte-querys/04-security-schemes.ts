import { createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/04-security-schemes'

/**
 * GET /public
 */
export function createGetPublic(options?: {
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
  return createQuery({
    queryKey: getGetPublicQueryKey(),
    queryFn: async () => parseResponse(client.public.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /public
 */
export function getGetPublicQueryKey() {
  return ['/public'] as const
}

/**
 * GET /protected
 */
export function createGetProtected(options?: {
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
  return createQuery({
    queryKey: getGetProtectedQueryKey(),
    queryFn: async () => parseResponse(client.protected.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /protected
 */
export function getGetProtectedQueryKey() {
  return ['/protected'] as const
}

/**
 * GET /admin
 */
export function createGetAdmin(options?: {
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
  return createQuery({
    queryKey: getGetAdminQueryKey(),
    queryFn: async () => parseResponse(client.admin.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /admin
 */
export function getGetAdminQueryKey() {
  return ['/admin'] as const
}

/**
 * GET /oauth-resource
 */
export function createGetOauthResource(options?: {
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
  return createQuery({
    queryKey: getGetOauthResourceQueryKey(),
    queryFn: async () => parseResponse(client['oauth-resource'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /oauth-resource
 */
export function getGetOauthResourceQueryKey() {
  return ['/oauth-resource'] as const
}

/**
 * GET /multi-auth
 */
export function createGetMultiAuth(options?: {
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
  return createQuery({
    queryKey: getGetMultiAuthQueryKey(),
    queryFn: async () => parseResponse(client['multi-auth'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /multi-auth
 */
export function getGetMultiAuthQueryKey() {
  return ['/multi-auth'] as const
}

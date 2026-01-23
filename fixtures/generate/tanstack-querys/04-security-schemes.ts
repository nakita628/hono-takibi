import { useQuery } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/04-security-schemes'

/**
 * GET /public
 */
export function useGetPublic(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.public.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPublicQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.public.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /public
 */
export function getGetPublicQueryKey() {
  return ['GET', '/public'] as const
}

/**
 * GET /protected
 */
export function useGetProtected(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.protected.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProtectedQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.protected.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /protected
 */
export function getGetProtectedQueryKey() {
  return ['GET', '/protected'] as const
}

/**
 * GET /admin
 */
export function useGetAdmin(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.admin.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAdminQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.admin.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /admin
 */
export function getGetAdminQueryKey() {
  return ['GET', '/admin'] as const
}

/**
 * GET /oauth-resource
 */
export function useGetOauthResource(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['oauth-resource']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauthResourceQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['oauth-resource'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /oauth-resource
 */
export function getGetOauthResourceQueryKey() {
  return ['GET', '/oauth-resource'] as const
}

/**
 * GET /multi-auth
 */
export function useGetMultiAuth(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['multi-auth']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMultiAuthQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['multi-auth'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /multi-auth
 */
export function getGetMultiAuthQueryKey() {
  return ['GET', '/multi-auth'] as const
}

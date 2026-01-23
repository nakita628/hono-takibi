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
    query?: UseQueryOptions<
      InferResponseType<typeof client.public.$get>,
      Error,
      InferResponseType<typeof client.public.$get>,
      readonly ['/public']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPublicQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.public.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /public
 */
export function getGetPublicQueryKey() {
  return ['/public'] as const
}

/**
 * GET /protected
 */
export function useGetProtected(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.protected.$get>,
      Error,
      InferResponseType<typeof client.protected.$get>,
      readonly ['/protected']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProtectedQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.protected.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /protected
 */
export function getGetProtectedQueryKey() {
  return ['/protected'] as const
}

/**
 * GET /admin
 */
export function useGetAdmin(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.admin.$get>,
      Error,
      InferResponseType<typeof client.admin.$get>,
      readonly ['/admin']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAdminQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.admin.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /admin
 */
export function getGetAdminQueryKey() {
  return ['/admin'] as const
}

/**
 * GET /oauth-resource
 */
export function useGetOauthResource(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['oauth-resource']['$get']>,
      Error,
      InferResponseType<(typeof client)['oauth-resource']['$get']>,
      readonly ['/oauth-resource']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauthResourceQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['oauth-resource'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /oauth-resource
 */
export function getGetOauthResourceQueryKey() {
  return ['/oauth-resource'] as const
}

/**
 * GET /multi-auth
 */
export function useGetMultiAuth(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['multi-auth']['$get']>,
      Error,
      InferResponseType<(typeof client)['multi-auth']['$get']>,
      readonly ['/multi-auth']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMultiAuthQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['multi-auth'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /multi-auth
 */
export function getGetMultiAuthQueryKey() {
  return ['/multi-auth'] as const
}

import { createQuery } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions } from '@tanstack/svelte-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/04-security-schemes'

/**
 * GET /public
 */
export function createGetPublic(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.public.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPublicQueryKey()
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /public
 */
export function getGetPublicQueryKey() {
  return ['/public'] as const
}

/**
 * GET /protected
 */
export function createGetProtected(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.protected.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProtectedQueryKey()
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /protected
 */
export function getGetProtectedQueryKey() {
  return ['/protected'] as const
}

/**
 * GET /admin
 */
export function createGetAdmin(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.admin.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAdminQueryKey()
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /admin
 */
export function getGetAdminQueryKey() {
  return ['/admin'] as const
}

/**
 * GET /oauth-resource
 */
export function createGetOauthResource(
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client)['oauth-resource']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauthResourceQueryKey()
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /oauth-resource
 */
export function getGetOauthResourceQueryKey() {
  return ['/oauth-resource'] as const
}

/**
 * GET /multi-auth
 */
export function createGetMultiAuth(
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client)['multi-auth']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMultiAuthQueryKey()
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /multi-auth
 */
export function getGetMultiAuthQueryKey() {
  return ['/multi-auth'] as const
}

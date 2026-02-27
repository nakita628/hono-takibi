import { createQuery, queryOptions } from '@tanstack/svelte-query'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Svelte Query cache key for GET /public
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
 * Returns Svelte Query query options for GET /public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPublicQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetPublicQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPublic({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /public
 */
export function createGetPublic(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPublic>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetPublicQueryOptions(opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query cache key for GET /bearer-protected
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
 * Returns Svelte Query query options for GET /bearer-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetBearerProtectedQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetBearerProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBearerProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /bearer-protected
 */
export function createGetBearerProtected(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getBearerProtected>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetBearerProtectedQueryOptions(opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query cache key for GET /api-key-protected
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
 * Returns Svelte Query query options for GET /api-key-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApiKeyProtectedQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetApiKeyProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiKeyProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /api-key-protected
 */
export function createGetApiKeyProtected(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getApiKeyProtected>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetApiKeyProtectedQueryOptions(opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query cache key for GET /basic-protected
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
 * Returns Svelte Query query options for GET /basic-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetBasicProtectedQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetBasicProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBasicProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /basic-protected
 */
export function createGetBasicProtected(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getBasicProtected>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetBasicProtectedQueryOptions(opts?.client), ...opts?.query }
  })
}

/**
 * Generates Svelte Query cache key for GET /oauth-protected
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
 * Returns Svelte Query query options for GET /oauth-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOauthProtectedQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetOauthProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getOauthProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /oauth-protected
 */
export function createGetOauthProtected(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getOauthProtected>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetOauthProtectedQueryOptions(opts?.client), ...opts?.query }
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
 * GET /multi-auth
 */
export async function getMultiAuth(options?: ClientRequestOptions) {
  return await parseResponse(client['multi-auth'].$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /multi-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMultiAuthQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetMultiAuthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getMultiAuth({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /multi-auth
 */
export function createGetMultiAuth(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getMultiAuth>>, Error>
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    return { ...getGetMultiAuthQueryOptions(opts?.client), ...opts?.query }
  })
}

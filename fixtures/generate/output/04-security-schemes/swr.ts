import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates SWR cache key for GET /public
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetPublicKey() {
  return ['public', 'GET', '/public'] as const
}

/**
 * GET /public
 */
export async function getPublic(options?: ClientRequestOptions) {
  return await parseResponse(client.public.$get(undefined, options))
}

/**
 * GET /public
 */
export function useGetPublic(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPublicKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getPublic(clientOptions), restSwrOptions) }
}

/**
 * GET /public
 */
export function useImmutableGetPublic(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPublicKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getPublic(clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /public
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetPublicInfiniteKey() {
  return ['public', 'GET', '/public', 'infinite'] as const
}

/**
 * GET /public
 */
export function useInfiniteGetPublic(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getPublic>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetPublicInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getPublic(clientOptions), restSwrOptions)
}

/**
 * Generates SWR cache key for GET /bearer-protected
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetBearerProtectedKey() {
  return ['bearer-protected', 'GET', '/bearer-protected'] as const
}

/**
 * GET /bearer-protected
 */
export async function getBearerProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['bearer-protected'].$get(undefined, options))
}

/**
 * GET /bearer-protected
 */
export function useGetBearerProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetBearerProtectedKey()) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getBearerProtected(clientOptions), restSwrOptions),
  }
}

/**
 * GET /bearer-protected
 */
export function useImmutableGetBearerProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetBearerProtectedKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getBearerProtected(clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /bearer-protected
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetBearerProtectedInfiniteKey() {
  return ['bearer-protected', 'GET', '/bearer-protected', 'infinite'] as const
}

/**
 * GET /bearer-protected
 */
export function useInfiniteGetBearerProtected(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getBearerProtected>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetBearerProtectedInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getBearerProtected(clientOptions), restSwrOptions)
}

/**
 * Generates SWR cache key for GET /api-key-protected
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetApiKeyProtectedKey() {
  return ['api-key-protected', 'GET', '/api-key-protected'] as const
}

/**
 * GET /api-key-protected
 */
export async function getApiKeyProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['api-key-protected'].$get(undefined, options))
}

/**
 * GET /api-key-protected
 */
export function useGetApiKeyProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetApiKeyProtectedKey()) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getApiKeyProtected(clientOptions), restSwrOptions),
  }
}

/**
 * GET /api-key-protected
 */
export function useImmutableGetApiKeyProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetApiKeyProtectedKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getApiKeyProtected(clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /api-key-protected
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetApiKeyProtectedInfiniteKey() {
  return ['api-key-protected', 'GET', '/api-key-protected', 'infinite'] as const
}

/**
 * GET /api-key-protected
 */
export function useInfiniteGetApiKeyProtected(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getApiKeyProtected>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetApiKeyProtectedInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getApiKeyProtected(clientOptions), restSwrOptions)
}

/**
 * Generates SWR cache key for GET /basic-protected
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetBasicProtectedKey() {
  return ['basic-protected', 'GET', '/basic-protected'] as const
}

/**
 * GET /basic-protected
 */
export async function getBasicProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['basic-protected'].$get(undefined, options))
}

/**
 * GET /basic-protected
 */
export function useGetBasicProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetBasicProtectedKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getBasicProtected(clientOptions), restSwrOptions) }
}

/**
 * GET /basic-protected
 */
export function useImmutableGetBasicProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetBasicProtectedKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getBasicProtected(clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /basic-protected
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetBasicProtectedInfiniteKey() {
  return ['basic-protected', 'GET', '/basic-protected', 'infinite'] as const
}

/**
 * GET /basic-protected
 */
export function useInfiniteGetBasicProtected(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getBasicProtected>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetBasicProtectedInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getBasicProtected(clientOptions), restSwrOptions)
}

/**
 * Generates SWR cache key for GET /oauth-protected
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOauthProtectedKey() {
  return ['oauth-protected', 'GET', '/oauth-protected'] as const
}

/**
 * GET /oauth-protected
 */
export async function getOauthProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['oauth-protected'].$get(undefined, options))
}

/**
 * GET /oauth-protected
 */
export function useGetOauthProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetOauthProtectedKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getOauthProtected(clientOptions), restSwrOptions) }
}

/**
 * GET /oauth-protected
 */
export function useImmutableGetOauthProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetOauthProtectedKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getOauthProtected(clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /oauth-protected
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetOauthProtectedInfiniteKey() {
  return ['oauth-protected', 'GET', '/oauth-protected', 'infinite'] as const
}

/**
 * GET /oauth-protected
 */
export function useInfiniteGetOauthProtected(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getOauthProtected>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetOauthProtectedInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getOauthProtected(clientOptions), restSwrOptions)
}

/**
 * Generates SWR cache key for GET /multi-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMultiAuthKey() {
  return ['multi-auth', 'GET', '/multi-auth'] as const
}

/**
 * GET /multi-auth
 */
export async function getMultiAuth(options?: ClientRequestOptions) {
  return await parseResponse(client['multi-auth'].$get(undefined, options))
}

/**
 * GET /multi-auth
 */
export function useGetMultiAuth(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetMultiAuthKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getMultiAuth(clientOptions), restSwrOptions) }
}

/**
 * GET /multi-auth
 */
export function useImmutableGetMultiAuth(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetMultiAuthKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getMultiAuth(clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /multi-auth
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetMultiAuthInfiniteKey() {
  return ['multi-auth', 'GET', '/multi-auth', 'infinite'] as const
}

/**
 * GET /multi-auth
 */
export function useInfiniteGetMultiAuth(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getMultiAuth>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetMultiAuthInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getMultiAuth(clientOptions), restSwrOptions)
}

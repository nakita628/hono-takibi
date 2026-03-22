import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  queryOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/** Key prefix for /api-key-protected */
export function getApiKeyProtectedKey() {
  return ['api-key-protected'] as const
}

/** Key prefix for /basic-protected */
export function getBasicProtectedKey() {
  return ['basic-protected'] as const
}

/** Key prefix for /bearer-protected */
export function getBearerProtectedKey() {
  return ['bearer-protected'] as const
}

/** Key prefix for /multi-auth */
export function getMultiAuthKey() {
  return ['multi-auth'] as const
}

/** Key prefix for /oauth-protected */
export function getOauthProtectedKey() {
  return ['oauth-protected'] as const
}

/** Key prefix for /public */
export function getPublicKey() {
  return ['public'] as const
}

/** GET /public query key */
export function getPublicQueryKey() {
  return ['public', '/public'] as const
}

/**
 * GET /public
 */
export async function getPublic(options?: ClientRequestOptions) {
  return await parseResponse(client.public.$get(undefined, options))
}

/**
 * GET /public query options
 */
export function getPublicQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getPublicQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPublic({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /public
 */
export function usePublic(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getPublic>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getPublicQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /public
 */
export function useSuspensePublic(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPublic>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getPublicQueryOptions(clientOptions), ...queryOptions })
}

/** GET /public infinite query key */
export function getPublicInfiniteQueryKey() {
  return ['public', '/public', 'infinite'] as const
}

/**
 * GET /public infinite query options
 */
export function getPublicInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getPublicInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPublic({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /public
 */
export function useInfinitePublic(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPublic>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getPublicInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /public
 */
export function useSuspenseInfinitePublic(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getPublic>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getPublicInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/** GET /bearer-protected query key */
export function getBearerProtectedQueryKey() {
  return ['bearer-protected', '/bearer-protected'] as const
}

/**
 * GET /bearer-protected
 */
export async function getBearerProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['bearer-protected'].$get(undefined, options))
}

/**
 * GET /bearer-protected query options
 */
export function getBearerProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getBearerProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBearerProtected({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /bearer-protected
 */
export function useBearerProtected(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getBearerProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getBearerProtectedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /bearer-protected
 */
export function useSuspenseBearerProtected(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getBearerProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getBearerProtectedQueryOptions(clientOptions), ...queryOptions })
}

/** GET /bearer-protected infinite query key */
export function getBearerProtectedInfiniteQueryKey() {
  return ['bearer-protected', '/bearer-protected', 'infinite'] as const
}

/**
 * GET /bearer-protected infinite query options
 */
export function getBearerProtectedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getBearerProtectedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBearerProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /bearer-protected
 */
export function useInfiniteBearerProtected(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getBearerProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getBearerProtectedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * GET /bearer-protected
 */
export function useSuspenseInfiniteBearerProtected(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getBearerProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getBearerProtectedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/** GET /api-key-protected query key */
export function getApiKeyProtectedQueryKey() {
  return ['api-key-protected', '/api-key-protected'] as const
}

/**
 * GET /api-key-protected
 */
export async function getApiKeyProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['api-key-protected'].$get(undefined, options))
}

/**
 * GET /api-key-protected query options
 */
export function getApiKeyProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getApiKeyProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiKeyProtected({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /api-key-protected
 */
export function useApiKeyProtected(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getApiKeyProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getApiKeyProtectedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /api-key-protected
 */
export function useSuspenseApiKeyProtected(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getApiKeyProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getApiKeyProtectedQueryOptions(clientOptions), ...queryOptions })
}

/** GET /api-key-protected infinite query key */
export function getApiKeyProtectedInfiniteQueryKey() {
  return ['api-key-protected', '/api-key-protected', 'infinite'] as const
}

/**
 * GET /api-key-protected infinite query options
 */
export function getApiKeyProtectedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getApiKeyProtectedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiKeyProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /api-key-protected
 */
export function useInfiniteApiKeyProtected(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiKeyProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getApiKeyProtectedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * GET /api-key-protected
 */
export function useSuspenseInfiniteApiKeyProtected(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiKeyProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getApiKeyProtectedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/** GET /basic-protected query key */
export function getBasicProtectedQueryKey() {
  return ['basic-protected', '/basic-protected'] as const
}

/**
 * GET /basic-protected
 */
export async function getBasicProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['basic-protected'].$get(undefined, options))
}

/**
 * GET /basic-protected query options
 */
export function getBasicProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getBasicProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBasicProtected({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /basic-protected
 */
export function useBasicProtected(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getBasicProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getBasicProtectedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /basic-protected
 */
export function useSuspenseBasicProtected(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getBasicProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getBasicProtectedQueryOptions(clientOptions), ...queryOptions })
}

/** GET /basic-protected infinite query key */
export function getBasicProtectedInfiniteQueryKey() {
  return ['basic-protected', '/basic-protected', 'infinite'] as const
}

/**
 * GET /basic-protected infinite query options
 */
export function getBasicProtectedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getBasicProtectedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBasicProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /basic-protected
 */
export function useInfiniteBasicProtected(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getBasicProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getBasicProtectedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * GET /basic-protected
 */
export function useSuspenseInfiniteBasicProtected(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getBasicProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getBasicProtectedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/** GET /oauth-protected query key */
export function getOauthProtectedQueryKey() {
  return ['oauth-protected', '/oauth-protected'] as const
}

/**
 * GET /oauth-protected
 */
export async function getOauthProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['oauth-protected'].$get(undefined, options))
}

/**
 * GET /oauth-protected query options
 */
export function getOauthProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getOauthProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getOauthProtected({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /oauth-protected
 */
export function useOauthProtected(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getOauthProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getOauthProtectedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /oauth-protected
 */
export function useSuspenseOauthProtected(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getOauthProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getOauthProtectedQueryOptions(clientOptions), ...queryOptions })
}

/** GET /oauth-protected infinite query key */
export function getOauthProtectedInfiniteQueryKey() {
  return ['oauth-protected', '/oauth-protected', 'infinite'] as const
}

/**
 * GET /oauth-protected infinite query options
 */
export function getOauthProtectedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getOauthProtectedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getOauthProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /oauth-protected
 */
export function useInfiniteOauthProtected(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getOauthProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getOauthProtectedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * GET /oauth-protected
 */
export function useSuspenseInfiniteOauthProtected(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getOauthProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getOauthProtectedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/** GET /multi-auth query key */
export function getMultiAuthQueryKey() {
  return ['multi-auth', '/multi-auth'] as const
}

/**
 * GET /multi-auth
 */
export async function getMultiAuth(options?: ClientRequestOptions) {
  return await parseResponse(client['multi-auth'].$get(undefined, options))
}

/**
 * GET /multi-auth query options
 */
export function getMultiAuthQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getMultiAuthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getMultiAuth({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /multi-auth
 */
export function useMultiAuth(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getMultiAuth>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getMultiAuthQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /multi-auth
 */
export function useSuspenseMultiAuth(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getMultiAuth>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getMultiAuthQueryOptions(clientOptions), ...queryOptions })
}

/** GET /multi-auth infinite query key */
export function getMultiAuthInfiniteQueryKey() {
  return ['multi-auth', '/multi-auth', 'infinite'] as const
}

/**
 * GET /multi-auth infinite query options
 */
export function getMultiAuthInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getMultiAuthInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getMultiAuth({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /multi-auth
 */
export function useInfiniteMultiAuth(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMultiAuth>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getMultiAuthInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /multi-auth
 */
export function useSuspenseInfiniteMultiAuth(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getMultiAuth>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getMultiAuthInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

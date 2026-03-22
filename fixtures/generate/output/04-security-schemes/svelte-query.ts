import { createQuery, createInfiniteQuery, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Key prefix for /api-key-protected
 */
export function getApiKeyProtectedKey() {
  return ['api-key-protected'] as const
}

/**
 * Key prefix for /basic-protected
 */
export function getBasicProtectedKey() {
  return ['basic-protected'] as const
}

/**
 * Key prefix for /bearer-protected
 */
export function getBearerProtectedKey() {
  return ['bearer-protected'] as const
}

/**
 * Key prefix for /multi-auth
 */
export function getMultiAuthKey() {
  return ['multi-auth'] as const
}

/**
 * Key prefix for /oauth-protected
 */
export function getOauthProtectedKey() {
  return ['oauth-protected'] as const
}

/**
 * Key prefix for /public
 */
export function getPublicKey() {
  return ['public'] as const
}

/**
 * GET /public query key
 */
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
export function createPublic(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPublic>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getPublicQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /public infinite query key
 */
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
export function createInfinitePublic(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getPublic>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getPublicInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /bearer-protected query key
 */
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
export function createBearerProtected(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getBearerProtected>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getBearerProtectedQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /bearer-protected infinite query key
 */
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
export function createInfiniteBearerProtected(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getBearerProtected>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getBearerProtectedInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /api-key-protected query key
 */
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
export function createApiKeyProtected(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getApiKeyProtected>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getApiKeyProtectedQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /api-key-protected infinite query key
 */
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
export function createInfiniteApiKeyProtected(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getApiKeyProtected>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getApiKeyProtectedInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /basic-protected query key
 */
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
export function createBasicProtected(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getBasicProtected>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getBasicProtectedQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /basic-protected infinite query key
 */
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
export function createInfiniteBasicProtected(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getBasicProtected>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getBasicProtectedInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /oauth-protected query key
 */
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
export function createOauthProtected(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getOauthProtected>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getOauthProtectedQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /oauth-protected infinite query key
 */
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
export function createInfiniteOauthProtected(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getOauthProtected>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getOauthProtectedInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /multi-auth query key
 */
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
export function createMultiAuth(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getMultiAuth>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getMultiAuthQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /multi-auth infinite query key
 */
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
export function createInfiniteMultiAuth(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getMultiAuth>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getMultiAuthInfiniteQueryOptions(clientOptions), ...query }
  })
}

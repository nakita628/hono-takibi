import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getApiKeyProtectedKey() {
  return ['api-key-protected'] as const
}

export function getBasicProtectedKey() {
  return ['basic-protected'] as const
}

export function getBearerProtectedKey() {
  return ['bearer-protected'] as const
}

export function getMultiAuthKey() {
  return ['multi-auth'] as const
}

export function getOauthProtectedKey() {
  return ['oauth-protected'] as const
}

export function getPublicKey() {
  return ['public'] as const
}

export function getPublicQueryKey() {
  return ['public', '/public'] as const
}

export async function getPublic(options?: ClientRequestOptions) {
  return await parseResponse(client.public.$get(undefined, options))
}

export function getPublicQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getPublicQueryKey(),
    queryFn({ signal }) {
      return getPublic({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function usePublic<
  TData = Awaited<ReturnType<typeof getPublic>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getPublic>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getPublic>>,
    ReturnType<typeof getPublicQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPublicQueryKey(),
    queryFn({ signal }) {
      return getPublic({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getBearerProtectedQueryKey() {
  return ['bearer-protected', '/bearer-protected'] as const
}

export async function getBearerProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['bearer-protected'].$get(undefined, options))
}

export function getBearerProtectedQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getBearerProtectedQueryKey(),
    queryFn({ signal }) {
      return getBearerProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useBearerProtected<
  TData = Awaited<ReturnType<typeof getBearerProtected>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getBearerProtected>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getBearerProtected>>,
    ReturnType<typeof getBearerProtectedQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getBearerProtectedQueryKey(),
    queryFn({ signal }) {
      return getBearerProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getApiKeyProtectedQueryKey() {
  return ['api-key-protected', '/api-key-protected'] as const
}

export async function getApiKeyProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['api-key-protected'].$get(undefined, options))
}

export function getApiKeyProtectedQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getApiKeyProtectedQueryKey(),
    queryFn({ signal }) {
      return getApiKeyProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useApiKeyProtected<
  TData = Awaited<ReturnType<typeof getApiKeyProtected>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getApiKeyProtected>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getApiKeyProtected>>,
    ReturnType<typeof getApiKeyProtectedQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getApiKeyProtectedQueryKey(),
    queryFn({ signal }) {
      return getApiKeyProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getBasicProtectedQueryKey() {
  return ['basic-protected', '/basic-protected'] as const
}

export async function getBasicProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['basic-protected'].$get(undefined, options))
}

export function getBasicProtectedQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getBasicProtectedQueryKey(),
    queryFn({ signal }) {
      return getBasicProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useBasicProtected<
  TData = Awaited<ReturnType<typeof getBasicProtected>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getBasicProtected>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getBasicProtected>>,
    ReturnType<typeof getBasicProtectedQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getBasicProtectedQueryKey(),
    queryFn({ signal }) {
      return getBasicProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getOauthProtectedQueryKey() {
  return ['oauth-protected', '/oauth-protected'] as const
}

export async function getOauthProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['oauth-protected'].$get(undefined, options))
}

export function getOauthProtectedQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getOauthProtectedQueryKey(),
    queryFn({ signal }) {
      return getOauthProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useOauthProtected<
  TData = Awaited<ReturnType<typeof getOauthProtected>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getOauthProtected>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getOauthProtected>>,
    ReturnType<typeof getOauthProtectedQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getOauthProtectedQueryKey(),
    queryFn({ signal }) {
      return getOauthProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getMultiAuthQueryKey() {
  return ['multi-auth', '/multi-auth'] as const
}

export async function getMultiAuth(options?: ClientRequestOptions) {
  return await parseResponse(client['multi-auth'].$get(undefined, options))
}

export function getMultiAuthQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getMultiAuthQueryKey(),
    queryFn({ signal }) {
      return getMultiAuth({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useMultiAuth<
  TData = Awaited<ReturnType<typeof getMultiAuth>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getMultiAuth>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getMultiAuth>>,
    ReturnType<typeof getMultiAuthQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getMultiAuthQueryKey(),
    queryFn({ signal }) {
      return getMultiAuth({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

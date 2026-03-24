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
  return queryOptions({
    queryKey: getPublicQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPublic({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function usePublic<TData = Awaited<ReturnType<typeof getPublic>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getPublic>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPublicQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPublic({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspensePublic<TData = Awaited<ReturnType<typeof getPublic>>>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPublic>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getPublicQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPublic({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getPublicInfiniteQueryKey() {
  return ['public', '/public', 'infinite'] as const
}

export function getPublicInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getPublicInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getPublic({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfinitePublic(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPublic>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getPublicInfiniteQueryOptions(clientOptions) })
}

export function useSuspenseInfinitePublic(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getPublic>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getPublicInfiniteQueryOptions(clientOptions),
  })
}

export function getBearerProtectedQueryKey() {
  return ['bearer-protected', '/bearer-protected'] as const
}

export async function getBearerProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['bearer-protected'].$get(undefined, options))
}

export function getBearerProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getBearerProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBearerProtected({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useBearerProtected<
  TData = Awaited<ReturnType<typeof getBearerProtected>>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getBearerProtected>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getBearerProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBearerProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseBearerProtected<
  TData = Awaited<ReturnType<typeof getBearerProtected>>,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getBearerProtected>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getBearerProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBearerProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getBearerProtectedInfiniteQueryKey() {
  return ['bearer-protected', '/bearer-protected', 'infinite'] as const
}

export function getBearerProtectedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getBearerProtectedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBearerProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteBearerProtected(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getBearerProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getBearerProtectedInfiniteQueryOptions(clientOptions),
  })
}

export function useSuspenseInfiniteBearerProtected(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getBearerProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getBearerProtectedInfiniteQueryOptions(clientOptions),
  })
}

export function getApiKeyProtectedQueryKey() {
  return ['api-key-protected', '/api-key-protected'] as const
}

export async function getApiKeyProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['api-key-protected'].$get(undefined, options))
}

export function getApiKeyProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getApiKeyProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiKeyProtected({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useApiKeyProtected<
  TData = Awaited<ReturnType<typeof getApiKeyProtected>>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getApiKeyProtected>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getApiKeyProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiKeyProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseApiKeyProtected<
  TData = Awaited<ReturnType<typeof getApiKeyProtected>>,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getApiKeyProtected>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getApiKeyProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiKeyProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getApiKeyProtectedInfiniteQueryKey() {
  return ['api-key-protected', '/api-key-protected', 'infinite'] as const
}

export function getApiKeyProtectedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getApiKeyProtectedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiKeyProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteApiKeyProtected(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiKeyProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getApiKeyProtectedInfiniteQueryOptions(clientOptions),
  })
}

export function useSuspenseInfiniteApiKeyProtected(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiKeyProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getApiKeyProtectedInfiniteQueryOptions(clientOptions),
  })
}

export function getBasicProtectedQueryKey() {
  return ['basic-protected', '/basic-protected'] as const
}

export async function getBasicProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['basic-protected'].$get(undefined, options))
}

export function getBasicProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getBasicProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBasicProtected({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useBasicProtected<TData = Awaited<ReturnType<typeof getBasicProtected>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getBasicProtected>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getBasicProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBasicProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseBasicProtected<
  TData = Awaited<ReturnType<typeof getBasicProtected>>,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getBasicProtected>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getBasicProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBasicProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getBasicProtectedInfiniteQueryKey() {
  return ['basic-protected', '/basic-protected', 'infinite'] as const
}

export function getBasicProtectedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getBasicProtectedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getBasicProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteBasicProtected(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getBasicProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getBasicProtectedInfiniteQueryOptions(clientOptions),
  })
}

export function useSuspenseInfiniteBasicProtected(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getBasicProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getBasicProtectedInfiniteQueryOptions(clientOptions),
  })
}

export function getOauthProtectedQueryKey() {
  return ['oauth-protected', '/oauth-protected'] as const
}

export async function getOauthProtected(options?: ClientRequestOptions) {
  return await parseResponse(client['oauth-protected'].$get(undefined, options))
}

export function getOauthProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getOauthProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getOauthProtected({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useOauthProtected<TData = Awaited<ReturnType<typeof getOauthProtected>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getOauthProtected>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getOauthProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getOauthProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseOauthProtected<
  TData = Awaited<ReturnType<typeof getOauthProtected>>,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getOauthProtected>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getOauthProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getOauthProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getOauthProtectedInfiniteQueryKey() {
  return ['oauth-protected', '/oauth-protected', 'infinite'] as const
}

export function getOauthProtectedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getOauthProtectedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getOauthProtected({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteOauthProtected(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getOauthProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getOauthProtectedInfiniteQueryOptions(clientOptions),
  })
}

export function useSuspenseInfiniteOauthProtected(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getOauthProtected>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getOauthProtectedInfiniteQueryOptions(clientOptions),
  })
}

export function getMultiAuthQueryKey() {
  return ['multi-auth', '/multi-auth'] as const
}

export async function getMultiAuth(options?: ClientRequestOptions) {
  return await parseResponse(client['multi-auth'].$get(undefined, options))
}

export function getMultiAuthQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getMultiAuthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getMultiAuth({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useMultiAuth<TData = Awaited<ReturnType<typeof getMultiAuth>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getMultiAuth>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getMultiAuthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getMultiAuth({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseMultiAuth<TData = Awaited<ReturnType<typeof getMultiAuth>>>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getMultiAuth>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getMultiAuthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getMultiAuth({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getMultiAuthInfiniteQueryKey() {
  return ['multi-auth', '/multi-auth', 'infinite'] as const
}

export function getMultiAuthInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getMultiAuthInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getMultiAuth({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteMultiAuth(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMultiAuth>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getMultiAuthInfiniteQueryOptions(clientOptions) })
}

export function useSuspenseInfiniteMultiAuth(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getMultiAuth>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getMultiAuthInfiniteQueryOptions(clientOptions),
  })
}

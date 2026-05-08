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

export function getPublicQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getPublicQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.public.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function usePublic<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.public.$get>>>>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.public.$get>>>>>,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPublicQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.public.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getBearerProtectedQueryKey() {
  return ['bearer-protected', '/bearer-protected'] as const
}

export function getBearerProtectedQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getBearerProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['bearer-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useBearerProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client)['bearer-protected']['$get']>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['bearer-protected']['$get']>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getBearerProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['bearer-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getApiKeyProtectedQueryKey() {
  return ['api-key-protected', '/api-key-protected'] as const
}

export function getApiKeyProtectedQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getApiKeyProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['api-key-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useApiKeyProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client)['api-key-protected']['$get']>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['api-key-protected']['$get']>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getApiKeyProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['api-key-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getBasicProtectedQueryKey() {
  return ['basic-protected', '/basic-protected'] as const
}

export function getBasicProtectedQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getBasicProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['basic-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useBasicProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client)['basic-protected']['$get']>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['basic-protected']['$get']>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getBasicProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['basic-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getOauthProtectedQueryKey() {
  return ['oauth-protected', '/oauth-protected'] as const
}

export function getOauthProtectedQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getOauthProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['oauth-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useOauthProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client)['oauth-protected']['$get']>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['oauth-protected']['$get']>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getOauthProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['oauth-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getMultiAuthQueryKey() {
  return ['multi-auth', '/multi-auth'] as const
}

export function getMultiAuthQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getMultiAuthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['multi-auth'].$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useMultiAuth<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-auth']['$get']>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-auth']['$get']>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getMultiAuthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['multi-auth'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

import { createQuery, queryOptions } from '@tanstack/svelte-query'
import type { CreateQueryOptions, QueryFunctionContext } from '@tanstack/svelte-query'
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
  return queryOptions({
    queryKey: getPublicQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.public.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function createPublic<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.public.$get>>>>>,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.public.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPublicQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.public.$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getBearerProtectedQueryKey() {
  return ['bearer-protected', '/bearer-protected'] as const
}

export function getBearerProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getBearerProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['bearer-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function createBearerProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client)['bearer-protected']['$get']>>>
    >
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['bearer-protected']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getBearerProtectedQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['bearer-protected'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getApiKeyProtectedQueryKey() {
  return ['api-key-protected', '/api-key-protected'] as const
}

export function getApiKeyProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getApiKeyProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['api-key-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function createApiKeyProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client)['api-key-protected']['$get']>>>
    >
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['api-key-protected']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getApiKeyProtectedQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['api-key-protected'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getBasicProtectedQueryKey() {
  return ['basic-protected', '/basic-protected'] as const
}

export function getBasicProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getBasicProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['basic-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function createBasicProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client)['basic-protected']['$get']>>>
    >
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['basic-protected']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getBasicProtectedQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['basic-protected'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getOauthProtectedQueryKey() {
  return ['oauth-protected', '/oauth-protected'] as const
}

export function getOauthProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getOauthProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['oauth-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function createOauthProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client)['oauth-protected']['$get']>>>
    >
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['oauth-protected']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getOauthProtectedQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['oauth-protected'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getMultiAuthQueryKey() {
  return ['multi-auth', '/multi-auth'] as const
}

export function getMultiAuthQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getMultiAuthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['multi-auth'].$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function createMultiAuth<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-auth']['$get']>>>>
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-auth']['$get']>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getMultiAuthQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['multi-auth'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

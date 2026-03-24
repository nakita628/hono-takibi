import { createQuery, createInfiniteQuery, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
} from '@tanstack/svelte-query'
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

export function createPublic<TData = Awaited<ReturnType<typeof getPublic>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPublic>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPublicQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getPublic({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
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

export function createInfinitePublic(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getPublic>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getPublicInfiniteQueryOptions(clientOptions) }
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

export function createBearerProtected<TData = Awaited<ReturnType<typeof getBearerProtected>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getBearerProtected>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getBearerProtectedQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getBearerProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
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

export function createInfiniteBearerProtected(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getBearerProtected>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getBearerProtectedInfiniteQueryOptions(clientOptions) }
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

export function createApiKeyProtected<TData = Awaited<ReturnType<typeof getApiKeyProtected>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getApiKeyProtected>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getApiKeyProtectedQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getApiKeyProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
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

export function createInfiniteApiKeyProtected(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getApiKeyProtected>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getApiKeyProtectedInfiniteQueryOptions(clientOptions) }
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

export function createBasicProtected<TData = Awaited<ReturnType<typeof getBasicProtected>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getBasicProtected>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getBasicProtectedQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getBasicProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
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

export function createInfiniteBasicProtected(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getBasicProtected>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getBasicProtectedInfiniteQueryOptions(clientOptions) }
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

export function createOauthProtected<TData = Awaited<ReturnType<typeof getOauthProtected>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getOauthProtected>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getOauthProtectedQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getOauthProtected({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
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

export function createInfiniteOauthProtected(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getOauthProtected>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getOauthProtectedInfiniteQueryOptions(clientOptions) }
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

export function createMultiAuth<TData = Awaited<ReturnType<typeof getMultiAuth>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getMultiAuth>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getMultiAuthQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getMultiAuth({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
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

export function createInfiniteMultiAuth(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getMultiAuth>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getMultiAuthInfiniteQueryOptions(clientOptions) }
  })
}

import { createQuery } from '@tanstack/svelte-query'
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
 * Returns Svelte Query query options for GET /public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPublicQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetPublicQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.public.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /public
 */
export function createGetPublic(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.public.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPublicQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
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
 * Returns Svelte Query query options for GET /bearer-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetBearerProtectedQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetBearerProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['bearer-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /bearer-protected
 */
export function createGetBearerProtected(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['bearer-protected']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetBearerProtectedQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
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
 * Returns Svelte Query query options for GET /api-key-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApiKeyProtectedQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetApiKeyProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['api-key-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /api-key-protected
 */
export function createGetApiKeyProtected(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['api-key-protected']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetApiKeyProtectedQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
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
 * Returns Svelte Query query options for GET /basic-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetBasicProtectedQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetBasicProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['basic-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /basic-protected
 */
export function createGetBasicProtected(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['basic-protected']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetBasicProtectedQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
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
 * Returns Svelte Query query options for GET /oauth-protected
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOauthProtectedQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetOauthProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['oauth-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /oauth-protected
 */
export function createGetOauthProtected(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['oauth-protected']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetOauthProtectedQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
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
 * Returns Svelte Query query options for GET /multi-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMultiAuthQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetMultiAuthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['multi-auth'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /multi-auth
 */
export function createGetMultiAuth(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-auth']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMultiAuthQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

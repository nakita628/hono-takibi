import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/24-extreme-security'

/**
 * GET /public
 *
 * Completely public endpoint
 */
export function useGetPublic(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetPublicQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /public
 */
export function getGetPublicQueryKey() {
  return ['/public'] as const
}

/**
 * Returns TanStack Query query options for GET /public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPublicQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetPublicQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.public.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /single-auth
 *
 * Single authentication required
 */
export function useGetSingleAuth(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSingleAuthQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /single-auth
 */
export function getGetSingleAuthQueryKey() {
  return ['/single-auth'] as const
}

/**
 * Returns TanStack Query query options for GET /single-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSingleAuthQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSingleAuthQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['single-auth'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /any-auth
 *
 * Any of these auth methods works (OR)
 */
export function useGetAnyAuth(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetAnyAuthQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /any-auth
 */
export function getGetAnyAuthQueryKey() {
  return ['/any-auth'] as const
}

/**
 * Returns TanStack Query query options for GET /any-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAnyAuthQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetAnyAuthQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['any-auth'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /all-auth
 *
 * All of these auth methods required (AND)
 */
export function useGetAllAuth(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetAllAuthQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /all-auth
 */
export function getGetAllAuthQueryKey() {
  return ['/all-auth'] as const
}

/**
 * Returns TanStack Query query options for GET /all-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAllAuthQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetAllAuthQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['all-auth'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /complex-auth
 *
 * Complex AND/OR security requirements
 */
export function useGetComplexAuth(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetComplexAuthQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /complex-auth
 */
export function getGetComplexAuthQueryKey() {
  return ['/complex-auth'] as const
}

/**
 * Returns TanStack Query query options for GET /complex-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetComplexAuthQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetComplexAuthQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['complex-auth'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /scoped-oauth
 *
 * OAuth with many specific scopes
 */
export function useGetScopedOauth(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetScopedOauthQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /scoped-oauth
 */
export function getGetScopedOauthQueryKey() {
  return ['/scoped-oauth'] as const
}

/**
 * Returns TanStack Query query options for GET /scoped-oauth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetScopedOauthQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetScopedOauthQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['scoped-oauth'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /mixed-level-security
 *
 * Path level + operation level security
 */
export function useGetMixedLevelSecurity(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetMixedLevelSecurityQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /mixed-level-security
 */
export function getGetMixedLevelSecurityQueryKey() {
  return ['/mixed-level-security'] as const
}

/**
 * Returns TanStack Query query options for GET /mixed-level-security
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMixedLevelSecurityQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetMixedLevelSecurityQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['mixed-level-security'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /mixed-level-security
 *
 * Admin-only security
 */
export function usePutMixedLevelSecurity(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['mixed-level-security']['$put']>,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['mixed-level-security']['$put']> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async () =>
      parseResponse(client['mixed-level-security'].$put(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /mixed-level-security
 *
 * Different security for POST
 */
export function usePostMixedLevelSecurity(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['mixed-level-security']['$post']>,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['mixed-level-security']['$post']> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async () =>
      parseResponse(client['mixed-level-security'].$post(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /mixed-level-security
 *
 * Super admin security
 */
export function useDeleteMixedLevelSecurity(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['mixed-level-security']['$delete']> | undefined,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['mixed-level-security']['$delete']>
        | undefined
        | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async () =>
      parseResponse(client['mixed-level-security'].$delete(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /override-global
 *
 * Override global security with public
 */
export function useGetOverrideGlobal(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetOverrideGlobalQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /override-global
 */
export function getGetOverrideGlobalQueryKey() {
  return ['/override-global'] as const
}

/**
 * Returns TanStack Query query options for GET /override-global
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOverrideGlobalQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetOverrideGlobalQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['override-global'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /optional-enhanced
 *
 * Optional auth with enhanced access if authenticated
 */
export function useGetOptionalEnhanced(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetOptionalEnhancedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /optional-enhanced
 */
export function getGetOptionalEnhancedQueryKey() {
  return ['/optional-enhanced'] as const
}

/**
 * Returns TanStack Query query options for GET /optional-enhanced
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOptionalEnhancedQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetOptionalEnhancedQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['optional-enhanced'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /multi-tenant
 *
 * Multi-tenant with org-level auth
 */
export function useGetMultiTenant(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetMultiTenantQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /multi-tenant
 */
export function getGetMultiTenantQueryKey() {
  return ['/multi-tenant'] as const
}

/**
 * Returns TanStack Query query options for GET /multi-tenant
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMultiTenantQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetMultiTenantQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['multi-tenant'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

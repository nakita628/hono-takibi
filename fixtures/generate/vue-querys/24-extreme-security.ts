import { useMutation, useQuery } from '@tanstack/vue-query'
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
  return useQuery({
    queryKey: getGetPublicQueryKey(),
    queryFn: async () => parseResponse(client.public.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /public
 */
export function getGetPublicQueryKey() {
  return ['/public'] as const
}

/**
 * Returns Vue Query query options for GET /public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPublicQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetPublicQueryKey(),
    queryFn: async () => parseResponse(client.public.$get(undefined, clientOptions)),
  }
}

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
  return useQuery({
    queryKey: getGetSingleAuthQueryKey(),
    queryFn: async () => parseResponse(client['single-auth'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /single-auth
 */
export function getGetSingleAuthQueryKey() {
  return ['/single-auth'] as const
}

/**
 * Returns Vue Query query options for GET /single-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSingleAuthQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetSingleAuthQueryKey(),
    queryFn: async () => parseResponse(client['single-auth'].$get(undefined, clientOptions)),
  }
}

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
  return useQuery({
    queryKey: getGetAnyAuthQueryKey(),
    queryFn: async () => parseResponse(client['any-auth'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /any-auth
 */
export function getGetAnyAuthQueryKey() {
  return ['/any-auth'] as const
}

/**
 * Returns Vue Query query options for GET /any-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAnyAuthQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetAnyAuthQueryKey(),
    queryFn: async () => parseResponse(client['any-auth'].$get(undefined, clientOptions)),
  }
}

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
  return useQuery({
    queryKey: getGetAllAuthQueryKey(),
    queryFn: async () => parseResponse(client['all-auth'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /all-auth
 */
export function getGetAllAuthQueryKey() {
  return ['/all-auth'] as const
}

/**
 * Returns Vue Query query options for GET /all-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAllAuthQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetAllAuthQueryKey(),
    queryFn: async () => parseResponse(client['all-auth'].$get(undefined, clientOptions)),
  }
}

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
  return useQuery({
    queryKey: getGetComplexAuthQueryKey(),
    queryFn: async () => parseResponse(client['complex-auth'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /complex-auth
 */
export function getGetComplexAuthQueryKey() {
  return ['/complex-auth'] as const
}

/**
 * Returns Vue Query query options for GET /complex-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetComplexAuthQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetComplexAuthQueryKey(),
    queryFn: async () => parseResponse(client['complex-auth'].$get(undefined, clientOptions)),
  }
}

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
  return useQuery({
    queryKey: getGetScopedOauthQueryKey(),
    queryFn: async () => parseResponse(client['scoped-oauth'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /scoped-oauth
 */
export function getGetScopedOauthQueryKey() {
  return ['/scoped-oauth'] as const
}

/**
 * Returns Vue Query query options for GET /scoped-oauth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetScopedOauthQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetScopedOauthQueryKey(),
    queryFn: async () => parseResponse(client['scoped-oauth'].$get(undefined, clientOptions)),
  }
}

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
  return useQuery({
    queryKey: getGetMixedLevelSecurityQueryKey(),
    queryFn: async () =>
      parseResponse(client['mixed-level-security'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /mixed-level-security
 */
export function getGetMixedLevelSecurityQueryKey() {
  return ['/mixed-level-security'] as const
}

/**
 * Returns Vue Query query options for GET /mixed-level-security
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMixedLevelSecurityQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetMixedLevelSecurityQueryKey(),
    queryFn: async () =>
      parseResponse(client['mixed-level-security'].$get(undefined, clientOptions)),
  }
}

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
      data: InferResponseType<(typeof client)['mixed-level-security']['$delete']> | undefined,
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
  return useQuery({
    queryKey: getGetOverrideGlobalQueryKey(),
    queryFn: async () => parseResponse(client['override-global'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /override-global
 */
export function getGetOverrideGlobalQueryKey() {
  return ['/override-global'] as const
}

/**
 * Returns Vue Query query options for GET /override-global
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOverrideGlobalQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetOverrideGlobalQueryKey(),
    queryFn: async () => parseResponse(client['override-global'].$get(undefined, clientOptions)),
  }
}

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
  return useQuery({
    queryKey: getGetOptionalEnhancedQueryKey(),
    queryFn: async () => parseResponse(client['optional-enhanced'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /optional-enhanced
 */
export function getGetOptionalEnhancedQueryKey() {
  return ['/optional-enhanced'] as const
}

/**
 * Returns Vue Query query options for GET /optional-enhanced
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOptionalEnhancedQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetOptionalEnhancedQueryKey(),
    queryFn: async () => parseResponse(client['optional-enhanced'].$get(undefined, clientOptions)),
  }
}

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
  return useQuery({
    queryKey: getGetMultiTenantQueryKey(),
    queryFn: async () => parseResponse(client['multi-tenant'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /multi-tenant
 */
export function getGetMultiTenantQueryKey() {
  return ['/multi-tenant'] as const
}

/**
 * Returns Vue Query query options for GET /multi-tenant
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMultiTenantQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetMultiTenantQueryKey(),
    queryFn: async () => parseResponse(client['multi-tenant'].$get(undefined, clientOptions)),
  }
}

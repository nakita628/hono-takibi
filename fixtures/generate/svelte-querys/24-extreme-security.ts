import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/24-extreme-security'

/**
 * GET /public
 *
 * Completely public endpoint
 */
export function createGetPublic(options?: {
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
  return createQuery({
    queryKey: getGetPublicQueryKey(),
    queryFn: async () => parseResponse(client.public.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /public
 */
export function getGetPublicQueryKey() {
  return ['/public'] as const
}

/**
 * GET /single-auth
 *
 * Single authentication required
 */
export function createGetSingleAuth(options?: {
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
  return createQuery({
    queryKey: getGetSingleAuthQueryKey(),
    queryFn: async () => parseResponse(client['single-auth'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /single-auth
 */
export function getGetSingleAuthQueryKey() {
  return ['/single-auth'] as const
}

/**
 * GET /any-auth
 *
 * Any of these auth methods works (OR)
 */
export function createGetAnyAuth(options?: {
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
  return createQuery({
    queryKey: getGetAnyAuthQueryKey(),
    queryFn: async () => parseResponse(client['any-auth'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /any-auth
 */
export function getGetAnyAuthQueryKey() {
  return ['/any-auth'] as const
}

/**
 * GET /all-auth
 *
 * All of these auth methods required (AND)
 */
export function createGetAllAuth(options?: {
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
  return createQuery({
    queryKey: getGetAllAuthQueryKey(),
    queryFn: async () => parseResponse(client['all-auth'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /all-auth
 */
export function getGetAllAuthQueryKey() {
  return ['/all-auth'] as const
}

/**
 * GET /complex-auth
 *
 * Complex AND/OR security requirements
 */
export function createGetComplexAuth(options?: {
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
  return createQuery({
    queryKey: getGetComplexAuthQueryKey(),
    queryFn: async () => parseResponse(client['complex-auth'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /complex-auth
 */
export function getGetComplexAuthQueryKey() {
  return ['/complex-auth'] as const
}

/**
 * GET /scoped-oauth
 *
 * OAuth with many specific scopes
 */
export function createGetScopedOauth(options?: {
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
  return createQuery({
    queryKey: getGetScopedOauthQueryKey(),
    queryFn: async () => parseResponse(client['scoped-oauth'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /scoped-oauth
 */
export function getGetScopedOauthQueryKey() {
  return ['/scoped-oauth'] as const
}

/**
 * GET /mixed-level-security
 *
 * Path level + operation level security
 */
export function createGetMixedLevelSecurity(options?: {
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
  return createQuery({
    queryKey: getGetMixedLevelSecurityQueryKey(),
    queryFn: async () =>
      parseResponse(client['mixed-level-security'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /mixed-level-security
 */
export function getGetMixedLevelSecurityQueryKey() {
  return ['/mixed-level-security'] as const
}

/**
 * PUT /mixed-level-security
 *
 * Admin-only security
 */
export function createPutMixedLevelSecurity(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['mixed-level-security']['$put']>,
      variables: void,
    ) => void
    onError?: (error: Error, variables: void) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['mixed-level-security']['$put']> | undefined,
      error: Error | null,
      variables: void,
    ) => void
    onMutate?: (variables: void) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createPostMixedLevelSecurity(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['mixed-level-security']['$post']>,
      variables: void,
    ) => void
    onError?: (error: Error, variables: void) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['mixed-level-security']['$post']> | undefined,
      error: Error | null,
      variables: void,
    ) => void
    onMutate?: (variables: void) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createDeleteMixedLevelSecurity(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['mixed-level-security']['$delete']> | undefined,
      variables: void,
    ) => void
    onError?: (error: Error, variables: void) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['mixed-level-security']['$delete']> | undefined,
      error: Error | null,
      variables: void,
    ) => void
    onMutate?: (variables: void) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
export function createGetOverrideGlobal(options?: {
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
  return createQuery({
    queryKey: getGetOverrideGlobalQueryKey(),
    queryFn: async () => parseResponse(client['override-global'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /override-global
 */
export function getGetOverrideGlobalQueryKey() {
  return ['/override-global'] as const
}

/**
 * GET /optional-enhanced
 *
 * Optional auth with enhanced access if authenticated
 */
export function createGetOptionalEnhanced(options?: {
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
  return createQuery({
    queryKey: getGetOptionalEnhancedQueryKey(),
    queryFn: async () => parseResponse(client['optional-enhanced'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /optional-enhanced
 */
export function getGetOptionalEnhancedQueryKey() {
  return ['/optional-enhanced'] as const
}

/**
 * GET /multi-tenant
 *
 * Multi-tenant with org-level auth
 */
export function createGetMultiTenant(options?: {
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
  return createQuery({
    queryKey: getGetMultiTenantQueryKey(),
    queryFn: async () => parseResponse(client['multi-tenant'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /multi-tenant
 */
export function getGetMultiTenantQueryKey() {
  return ['/multi-tenant'] as const
}

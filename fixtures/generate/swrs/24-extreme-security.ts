import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/24-extreme-security'

/**
 * Generates SWR cache key for GET /public
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetPublicKey() {
  return ['public', 'GET', '/public'] as const
}

/**
 * GET /public
 *
 * Completely public endpoint
 */
export function useGetPublic(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetPublicKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.public.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /single-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetSingleAuthKey() {
  return ['single-auth', 'GET', '/single-auth'] as const
}

/**
 * GET /single-auth
 *
 * Single authentication required
 */
export function useGetSingleAuth(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetSingleAuthKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['single-auth'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /any-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAnyAuthKey() {
  return ['any-auth', 'GET', '/any-auth'] as const
}

/**
 * GET /any-auth
 *
 * Any of these auth methods works (OR)
 */
export function useGetAnyAuth(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetAnyAuthKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['any-auth'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /all-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAllAuthKey() {
  return ['all-auth', 'GET', '/all-auth'] as const
}

/**
 * GET /all-auth
 *
 * All of these auth methods required (AND)
 */
export function useGetAllAuth(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetAllAuthKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['all-auth'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /complex-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetComplexAuthKey() {
  return ['complex-auth', 'GET', '/complex-auth'] as const
}

/**
 * GET /complex-auth
 *
 * Complex AND/OR security requirements
 */
export function useGetComplexAuth(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetComplexAuthKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['complex-auth'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /scoped-oauth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetScopedOauthKey() {
  return ['scoped-oauth', 'GET', '/scoped-oauth'] as const
}

/**
 * GET /scoped-oauth
 *
 * OAuth with many specific scopes
 */
export function useGetScopedOauth(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetScopedOauthKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['scoped-oauth'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /mixed-level-security
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMixedLevelSecurityKey() {
  return ['mixed-level-security', 'GET', '/mixed-level-security'] as const
}

/**
 * GET /mixed-level-security
 *
 * Path level + operation level security
 */
export function useGetMixedLevelSecurity(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetMixedLevelSecurityKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['mixed-level-security'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /mixed-level-security
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMixedLevelSecurityMutationKey() {
  return ['mixed-level-security', 'PUT', '/mixed-level-security'] as const
}

/**
 * PUT /mixed-level-security
 *
 * Admin-only security
 */
export function usePutMixedLevelSecurity(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['mixed-level-security']['$put']>>>
      >
    >,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMixedLevelSecurityMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['mixed-level-security'].$put(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mixed-level-security
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMixedLevelSecurityMutationKey() {
  return ['mixed-level-security', 'POST', '/mixed-level-security'] as const
}

/**
 * POST /mixed-level-security
 *
 * Different security for POST
 */
export function usePostMixedLevelSecurity(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['mixed-level-security']['$post']>>>
      >
    >,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMixedLevelSecurityMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['mixed-level-security'].$post(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /mixed-level-security
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteMixedLevelSecurityMutationKey() {
  return ['mixed-level-security', 'DELETE', '/mixed-level-security'] as const
}

/**
 * DELETE /mixed-level-security
 *
 * Super admin security
 */
export function useDeleteMixedLevelSecurity(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['mixed-level-security']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMixedLevelSecurityMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['mixed-level-security'].$delete(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /override-global
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOverrideGlobalKey() {
  return ['override-global', 'GET', '/override-global'] as const
}

/**
 * GET /override-global
 *
 * Override global security with public
 */
export function useGetOverrideGlobal(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetOverrideGlobalKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['override-global'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /optional-enhanced
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOptionalEnhancedKey() {
  return ['optional-enhanced', 'GET', '/optional-enhanced'] as const
}

/**
 * GET /optional-enhanced
 *
 * Optional auth with enhanced access if authenticated
 */
export function useGetOptionalEnhanced(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetOptionalEnhancedKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['optional-enhanced'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /multi-tenant
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMultiTenantKey() {
  return ['multi-tenant', 'GET', '/multi-tenant'] as const
}

/**
 * GET /multi-tenant
 *
 * Multi-tenant with org-level auth
 */
export function useGetMultiTenant(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetMultiTenantKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['multi-tenant'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

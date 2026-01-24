import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/24-extreme-security'

/**
 * GET /public
 *
 * Completely public endpoint
 */
export function useGetPublic(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetPublicQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.public.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /public
 */
export function getGetPublicQueryKey() {
  return ['/public'] as const
}

/**
 * GET /single-auth
 *
 * Single authentication required
 */
export function useGetSingleAuth(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSingleAuthQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['single-auth'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /single-auth
 */
export function getGetSingleAuthQueryKey() {
  return ['/single-auth'] as const
}

/**
 * GET /any-auth
 *
 * Any of these auth methods works (OR)
 */
export function useGetAnyAuth(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetAnyAuthQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['any-auth'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /any-auth
 */
export function getGetAnyAuthQueryKey() {
  return ['/any-auth'] as const
}

/**
 * GET /all-auth
 *
 * All of these auth methods required (AND)
 */
export function useGetAllAuth(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetAllAuthQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['all-auth'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /all-auth
 */
export function getGetAllAuthQueryKey() {
  return ['/all-auth'] as const
}

/**
 * GET /complex-auth
 *
 * Complex AND/OR security requirements
 */
export function useGetComplexAuth(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetComplexAuthQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['complex-auth'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /complex-auth
 */
export function getGetComplexAuthQueryKey() {
  return ['/complex-auth'] as const
}

/**
 * GET /scoped-oauth
 *
 * OAuth with many specific scopes
 */
export function useGetScopedOauth(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetScopedOauthQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['scoped-oauth'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /scoped-oauth
 */
export function getGetScopedOauthQueryKey() {
  return ['/scoped-oauth'] as const
}

/**
 * GET /mixed-level-security
 *
 * Path level + operation level security
 */
export function useGetMixedLevelSecurity(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetMixedLevelSecurityQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client['mixed-level-security'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /mixed-level-security
 */
export function getGetMixedLevelSecurityQueryKey() {
  return ['/mixed-level-security'] as const
}

/**
 * PUT /mixed-level-security
 *
 * Admin-only security
 */
export function usePutMixedLevelSecurity(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async () =>
      parseResponse(client['mixed-level-security'].$put(undefined, clientOptions)),
  })
}

/**
 * POST /mixed-level-security
 *
 * Different security for POST
 */
export function usePostMixedLevelSecurity(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async () =>
      parseResponse(client['mixed-level-security'].$post(undefined, clientOptions)),
  })
}

/**
 * DELETE /mixed-level-security
 *
 * Super admin security
 */
export function useDeleteMixedLevelSecurity(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async () =>
      parseResponse(client['mixed-level-security'].$delete(undefined, clientOptions)),
  })
}

/**
 * GET /override-global
 *
 * Override global security with public
 */
export function useGetOverrideGlobal(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetOverrideGlobalQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['override-global'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /override-global
 */
export function getGetOverrideGlobalQueryKey() {
  return ['/override-global'] as const
}

/**
 * GET /optional-enhanced
 *
 * Optional auth with enhanced access if authenticated
 */
export function useGetOptionalEnhanced(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetOptionalEnhancedQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['optional-enhanced'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /optional-enhanced
 */
export function getGetOptionalEnhancedQueryKey() {
  return ['/optional-enhanced'] as const
}

/**
 * GET /multi-tenant
 *
 * Multi-tenant with org-level auth
 */
export function useGetMultiTenant(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetMultiTenantQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['multi-tenant'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /multi-tenant
 */
export function getGetMultiTenantQueryKey() {
  return ['/multi-tenant'] as const
}

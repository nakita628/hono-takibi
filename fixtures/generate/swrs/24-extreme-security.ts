import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/24-extreme-security'

/**
 * GET /public
 *
 * Completely public endpoint
 */
export function useGetPublic(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.public.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/public'] as const) : null
  return useSWR<InferResponseType<typeof client.public.$get>, Error>(
    key,
    async () => parseResponse(client.public.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /public
 */
export function getGetPublicKey() {
  return ['GET', '/public'] as const
}

/**
 * GET /single-auth
 *
 * Single authentication required
 */
export function useGetSingleAuth(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['single-auth']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/single-auth'] as const) : null
  return useSWR<InferResponseType<(typeof client)['single-auth']['$get']>, Error>(
    key,
    async () => parseResponse(client['single-auth'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /single-auth
 */
export function getGetSingleAuthKey() {
  return ['GET', '/single-auth'] as const
}

/**
 * GET /any-auth
 *
 * Any of these auth methods works (OR)
 */
export function useGetAnyAuth(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['any-auth']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/any-auth'] as const) : null
  return useSWR<InferResponseType<(typeof client)['any-auth']['$get']>, Error>(
    key,
    async () => parseResponse(client['any-auth'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /any-auth
 */
export function getGetAnyAuthKey() {
  return ['GET', '/any-auth'] as const
}

/**
 * GET /all-auth
 *
 * All of these auth methods required (AND)
 */
export function useGetAllAuth(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['all-auth']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/all-auth'] as const) : null
  return useSWR<InferResponseType<(typeof client)['all-auth']['$get']>, Error>(
    key,
    async () => parseResponse(client['all-auth'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /all-auth
 */
export function getGetAllAuthKey() {
  return ['GET', '/all-auth'] as const
}

/**
 * GET /complex-auth
 *
 * Complex AND/OR security requirements
 */
export function useGetComplexAuth(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['complex-auth']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/complex-auth'] as const) : null
  return useSWR<InferResponseType<(typeof client)['complex-auth']['$get']>, Error>(
    key,
    async () => parseResponse(client['complex-auth'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /complex-auth
 */
export function getGetComplexAuthKey() {
  return ['GET', '/complex-auth'] as const
}

/**
 * GET /scoped-oauth
 *
 * OAuth with many specific scopes
 */
export function useGetScopedOauth(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['scoped-oauth']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/scoped-oauth'] as const) : null
  return useSWR<InferResponseType<(typeof client)['scoped-oauth']['$get']>, Error>(
    key,
    async () => parseResponse(client['scoped-oauth'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /scoped-oauth
 */
export function getGetScopedOauthKey() {
  return ['GET', '/scoped-oauth'] as const
}

/**
 * GET /mixed-level-security
 *
 * Path level + operation level security
 */
export function useGetMixedLevelSecurity(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['mixed-level-security']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/mixed-level-security'] as const) : null
  return useSWR<InferResponseType<(typeof client)['mixed-level-security']['$get']>, Error>(
    key,
    async () => parseResponse(client['mixed-level-security'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /mixed-level-security
 */
export function getGetMixedLevelSecurityKey() {
  return ['GET', '/mixed-level-security'] as const
}

/**
 * PUT /mixed-level-security
 *
 * Admin-only security
 */
export function usePutMixedLevelSecurity(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['mixed-level-security']['$put']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['mixed-level-security']['$put']>,
    Error,
    string,
    void
  >(
    'PUT /mixed-level-security',
    async () => parseResponse(client['mixed-level-security'].$put(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mixed-level-security
 *
 * Different security for POST
 */
export function usePostMixedLevelSecurity(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['mixed-level-security']['$post']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['mixed-level-security']['$post']>,
    Error,
    string,
    void
  >(
    'POST /mixed-level-security',
    async () => parseResponse(client['mixed-level-security'].$post(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /mixed-level-security
 *
 * Super admin security
 */
export function useDeleteMixedLevelSecurity(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['mixed-level-security']['$delete']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['mixed-level-security']['$delete']>,
    Error,
    string,
    void
  >(
    'DELETE /mixed-level-security',
    async () => parseResponse(client['mixed-level-security'].$delete(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * GET /override-global
 *
 * Override global security with public
 */
export function useGetOverrideGlobal(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['override-global']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/override-global'] as const) : null
  return useSWR<InferResponseType<(typeof client)['override-global']['$get']>, Error>(
    key,
    async () => parseResponse(client['override-global'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /override-global
 */
export function getGetOverrideGlobalKey() {
  return ['GET', '/override-global'] as const
}

/**
 * GET /optional-enhanced
 *
 * Optional auth with enhanced access if authenticated
 */
export function useGetOptionalEnhanced(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['optional-enhanced']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/optional-enhanced'] as const) : null
  return useSWR<InferResponseType<(typeof client)['optional-enhanced']['$get']>, Error>(
    key,
    async () => parseResponse(client['optional-enhanced'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /optional-enhanced
 */
export function getGetOptionalEnhancedKey() {
  return ['GET', '/optional-enhanced'] as const
}

/**
 * GET /multi-tenant
 *
 * Multi-tenant with org-level auth
 */
export function useGetMultiTenant(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['multi-tenant']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/multi-tenant'] as const) : null
  return useSWR<InferResponseType<(typeof client)['multi-tenant']['$get']>, Error>(
    key,
    async () => parseResponse(client['multi-tenant'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /multi-tenant
 */
export function getGetMultiTenantKey() {
  return ['GET', '/multi-tenant'] as const
}

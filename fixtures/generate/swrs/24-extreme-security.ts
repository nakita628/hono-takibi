import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/24-extreme-security'

/**
 * GET /public
 *
 * Completely public endpoint
 */
export function useGetPublic(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.public.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPublicKey() : null)
  const query = useSWR<InferResponseType<typeof client.public.$get>, Error>(
    swrKey,
    async () => parseResponse(client.public.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /public
 */
export function getGetPublicKey() {
  return ['/public'] as const
}

/**
 * GET /single-auth
 *
 * Single authentication required
 */
export function useGetSingleAuth(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['single-auth']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSingleAuthKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['single-auth']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['single-auth'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /single-auth
 */
export function getGetSingleAuthKey() {
  return ['/single-auth'] as const
}

/**
 * GET /any-auth
 *
 * Any of these auth methods works (OR)
 */
export function useGetAnyAuth(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['any-auth']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAnyAuthKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['any-auth']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['any-auth'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /any-auth
 */
export function getGetAnyAuthKey() {
  return ['/any-auth'] as const
}

/**
 * GET /all-auth
 *
 * All of these auth methods required (AND)
 */
export function useGetAllAuth(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['all-auth']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAllAuthKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['all-auth']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['all-auth'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /all-auth
 */
export function getGetAllAuthKey() {
  return ['/all-auth'] as const
}

/**
 * GET /complex-auth
 *
 * Complex AND/OR security requirements
 */
export function useGetComplexAuth(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['complex-auth']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetComplexAuthKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['complex-auth']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['complex-auth'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /complex-auth
 */
export function getGetComplexAuthKey() {
  return ['/complex-auth'] as const
}

/**
 * GET /scoped-oauth
 *
 * OAuth with many specific scopes
 */
export function useGetScopedOauth(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['scoped-oauth']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetScopedOauthKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['scoped-oauth']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['scoped-oauth'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /scoped-oauth
 */
export function getGetScopedOauthKey() {
  return ['/scoped-oauth'] as const
}

/**
 * GET /mixed-level-security
 *
 * Path level + operation level security
 */
export function useGetMixedLevelSecurity(options?: {
  swr?: SWRConfiguration<
    InferResponseType<(typeof client)['mixed-level-security']['$get']>,
    Error
  > & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMixedLevelSecurityKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['mixed-level-security']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['mixed-level-security'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /mixed-level-security
 */
export function getGetMixedLevelSecurityKey() {
  return ['/mixed-level-security'] as const
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
  swr?: SWRConfiguration<InferResponseType<(typeof client)['override-global']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOverrideGlobalKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['override-global']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['override-global'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /override-global
 */
export function getGetOverrideGlobalKey() {
  return ['/override-global'] as const
}

/**
 * GET /optional-enhanced
 *
 * Optional auth with enhanced access if authenticated
 */
export function useGetOptionalEnhanced(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['optional-enhanced']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOptionalEnhancedKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['optional-enhanced']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['optional-enhanced'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /optional-enhanced
 */
export function getGetOptionalEnhancedKey() {
  return ['/optional-enhanced'] as const
}

/**
 * GET /multi-tenant
 *
 * Multi-tenant with org-level auth
 */
export function useGetMultiTenant(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['multi-tenant']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMultiTenantKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['multi-tenant']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['multi-tenant'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /multi-tenant
 */
export function getGetMultiTenantKey() {
  return ['/multi-tenant'] as const
}

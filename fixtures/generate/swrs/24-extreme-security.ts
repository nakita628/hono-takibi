import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/24-extreme-security'

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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPublicKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.public.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /public
 * Uses $url() for type-safe key generation
 */
export function getGetPublicKey() {
  return client.public.$url().pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSingleAuthKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['single-auth'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /single-auth
 * Uses $url() for type-safe key generation
 */
export function getGetSingleAuthKey() {
  return client['single-auth'].$url().pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAnyAuthKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['any-auth'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /any-auth
 * Uses $url() for type-safe key generation
 */
export function getGetAnyAuthKey() {
  return client['any-auth'].$url().pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAllAuthKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['all-auth'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /all-auth
 * Uses $url() for type-safe key generation
 */
export function getGetAllAuthKey() {
  return client['all-auth'].$url().pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetComplexAuthKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['complex-auth'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /complex-auth
 * Uses $url() for type-safe key generation
 */
export function getGetComplexAuthKey() {
  return client['complex-auth'].$url().pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetScopedOauthKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['scoped-oauth'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /scoped-oauth
 * Uses $url() for type-safe key generation
 */
export function getGetScopedOauthKey() {
  return client['scoped-oauth'].$url().pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMixedLevelSecurityKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['mixed-level-security'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /mixed-level-security
 * Uses $url() for type-safe key generation
 */
export function getGetMixedLevelSecurityKey() {
  return client['mixed-level-security'].$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutMixedLevelSecurityMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['mixed-level-security'].$put(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /mixed-level-security
 * Uses $url() for type-safe key generation
 */
export function getPutMixedLevelSecurityMutationKey() {
  return `PUT ${client['mixed-level-security'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostMixedLevelSecurityMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['mixed-level-security'].$post(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mixed-level-security
 * Uses $url() for type-safe key generation
 */
export function getPostMixedLevelSecurityMutationKey() {
  return `POST ${client['mixed-level-security'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteMixedLevelSecurityMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['mixed-level-security'].$delete(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /mixed-level-security
 * Uses $url() for type-safe key generation
 */
export function getDeleteMixedLevelSecurityMutationKey() {
  return `DELETE ${client['mixed-level-security'].$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOverrideGlobalKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['override-global'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /override-global
 * Uses $url() for type-safe key generation
 */
export function getGetOverrideGlobalKey() {
  return client['override-global'].$url().pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOptionalEnhancedKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['optional-enhanced'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /optional-enhanced
 * Uses $url() for type-safe key generation
 */
export function getGetOptionalEnhancedKey() {
  return client['optional-enhanced'].$url().pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMultiTenantKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['multi-tenant'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /multi-tenant
 * Uses $url() for type-safe key generation
 */
export function getGetMultiTenantKey() {
  return client['multi-tenant'].$url().pathname
}

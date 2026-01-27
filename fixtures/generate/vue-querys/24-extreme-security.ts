import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/24-extreme-security'

/**
 * Generates Vue Query cache key for GET /public
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetPublicQueryKey() {
  return ['public', 'GET', '/public'] as const
}

/**
 * Returns Vue Query query options for GET /public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPublicQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetPublicQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.public.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /public
 *
 * Completely public endpoint
 */
export function useGetPublic(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.public.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPublicQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /single-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetSingleAuthQueryKey() {
  return ['single-auth', 'GET', '/single-auth'] as const
}

/**
 * Returns Vue Query query options for GET /single-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSingleAuthQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSingleAuthQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['single-auth'].$get(undefined, {
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['single-auth']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSingleAuthQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /any-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAnyAuthQueryKey() {
  return ['any-auth', 'GET', '/any-auth'] as const
}

/**
 * Returns Vue Query query options for GET /any-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAnyAuthQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAnyAuthQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['any-auth'].$get(undefined, {
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['any-auth']['$get']>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAnyAuthQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /all-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAllAuthQueryKey() {
  return ['all-auth', 'GET', '/all-auth'] as const
}

/**
 * Returns Vue Query query options for GET /all-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAllAuthQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAllAuthQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['all-auth'].$get(undefined, {
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['all-auth']['$get']>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAllAuthQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /complex-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetComplexAuthQueryKey() {
  return ['complex-auth', 'GET', '/complex-auth'] as const
}

/**
 * Returns Vue Query query options for GET /complex-auth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetComplexAuthQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetComplexAuthQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['complex-auth'].$get(undefined, {
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['complex-auth']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetComplexAuthQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /scoped-oauth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetScopedOauthQueryKey() {
  return ['scoped-oauth', 'GET', '/scoped-oauth'] as const
}

/**
 * Returns Vue Query query options for GET /scoped-oauth
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetScopedOauthQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetScopedOauthQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['scoped-oauth'].$get(undefined, {
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['scoped-oauth']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetScopedOauthQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /mixed-level-security
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMixedLevelSecurityQueryKey() {
  return ['mixed-level-security', 'GET', '/mixed-level-security'] as const
}

/**
 * Returns Vue Query query options for GET /mixed-level-security
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMixedLevelSecurityQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMixedLevelSecurityQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['mixed-level-security'].$get(undefined, {
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['mixed-level-security']['$get']>>
            >
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMixedLevelSecurityQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /mixed-level-security
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMixedLevelSecurityMutationKey() {
  return ['mixed-level-security', 'PUT', '/mixed-level-security'] as const
}

/**
 * Returns Vue Query mutation options for PUT /mixed-level-security
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMixedLevelSecurityMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMixedLevelSecurityMutationKey(),
  mutationFn: async () =>
    parseResponse(client['mixed-level-security'].$put(undefined, clientOptions)),
})

/**
 * PUT /mixed-level-security
 *
 * Admin-only security
 */
export function usePutMixedLevelSecurity(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['mixed-level-security']['$put']>>
            >
          >
        >,
        Error,
        void
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutMixedLevelSecurityMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /mixed-level-security
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMixedLevelSecurityMutationKey() {
  return ['mixed-level-security', 'POST', '/mixed-level-security'] as const
}

/**
 * Returns Vue Query mutation options for POST /mixed-level-security
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMixedLevelSecurityMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMixedLevelSecurityMutationKey(),
  mutationFn: async () =>
    parseResponse(client['mixed-level-security'].$post(undefined, clientOptions)),
})

/**
 * POST /mixed-level-security
 *
 * Different security for POST
 */
export function usePostMixedLevelSecurity(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['mixed-level-security']['$post']>>
            >
          >
        >,
        Error,
        void
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostMixedLevelSecurityMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /mixed-level-security
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteMixedLevelSecurityMutationKey() {
  return ['mixed-level-security', 'DELETE', '/mixed-level-security'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /mixed-level-security
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteMixedLevelSecurityMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteMixedLevelSecurityMutationKey(),
  mutationFn: async () =>
    parseResponse(client['mixed-level-security'].$delete(undefined, clientOptions)),
})

/**
 * DELETE /mixed-level-security
 *
 * Super admin security
 */
export function useDeleteMixedLevelSecurity(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client)['mixed-level-security']['$delete']>>
              >
            >
          >
        | undefined,
        Error,
        void
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteMixedLevelSecurityMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /override-global
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOverrideGlobalQueryKey() {
  return ['override-global', 'GET', '/override-global'] as const
}

/**
 * Returns Vue Query query options for GET /override-global
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOverrideGlobalQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOverrideGlobalQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['override-global'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /override-global
 *
 * Override global security with public
 */
export function useGetOverrideGlobal(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['override-global']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOverrideGlobalQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /optional-enhanced
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOptionalEnhancedQueryKey() {
  return ['optional-enhanced', 'GET', '/optional-enhanced'] as const
}

/**
 * Returns Vue Query query options for GET /optional-enhanced
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOptionalEnhancedQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOptionalEnhancedQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['optional-enhanced'].$get(undefined, {
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['optional-enhanced']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOptionalEnhancedQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /multi-tenant
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMultiTenantQueryKey() {
  return ['multi-tenant', 'GET', '/multi-tenant'] as const
}

/**
 * Returns Vue Query query options for GET /multi-tenant
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMultiTenantQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMultiTenantQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['multi-tenant'].$get(undefined, {
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-tenant']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMultiTenantQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

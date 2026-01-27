import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/24-extreme-security'

/**
 * Generates TanStack Query cache key for GET /public
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetPublicQueryKey() {
  return ['public', '/public'] as const
}

/**
 * Returns TanStack Query query options for GET /public
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.public.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPublicQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /single-auth
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSingleAuthQueryKey() {
  return ['single-auth', '/single-auth'] as const
}

/**
 * Returns TanStack Query query options for GET /single-auth
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
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['single-auth']['$get']>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSingleAuthQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /any-auth
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetAnyAuthQueryKey() {
  return ['any-auth', '/any-auth'] as const
}

/**
 * Returns TanStack Query query options for GET /any-auth
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
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['any-auth']['$get']>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAnyAuthQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /all-auth
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetAllAuthQueryKey() {
  return ['all-auth', '/all-auth'] as const
}

/**
 * Returns TanStack Query query options for GET /all-auth
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
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['all-auth']['$get']>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAllAuthQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /complex-auth
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetComplexAuthQueryKey() {
  return ['complex-auth', '/complex-auth'] as const
}

/**
 * Returns TanStack Query query options for GET /complex-auth
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
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['complex-auth']['$get']>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetComplexAuthQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /scoped-oauth
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetScopedOauthQueryKey() {
  return ['scoped-oauth', '/scoped-oauth'] as const
}

/**
 * Returns TanStack Query query options for GET /scoped-oauth
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
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['scoped-oauth']['$get']>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetScopedOauthQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /mixed-level-security
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetMixedLevelSecurityQueryKey() {
  return ['mixed-level-security', '/mixed-level-security'] as const
}

/**
 * Returns TanStack Query query options for GET /mixed-level-security
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
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['mixed-level-security']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMixedLevelSecurityQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for PUT /mixed-level-security
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPutMixedLevelSecurityMutationKey() {
  return ['PUT', '/mixed-level-security'] as const
}

/**
 * Returns TanStack Query mutation options for PUT /mixed-level-security
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
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['mixed-level-security']['$put']>>>
      >
    >,
    Error,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async () =>
      parseResponse(client['mixed-level-security'].$put(undefined, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /mixed-level-security
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostMixedLevelSecurityMutationKey() {
  return ['POST', '/mixed-level-security'] as const
}

/**
 * Returns TanStack Query mutation options for POST /mixed-level-security
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
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['mixed-level-security']['$post']>>>
      >
    >,
    Error,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async () =>
      parseResponse(client['mixed-level-security'].$post(undefined, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for DELETE /mixed-level-security
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteMixedLevelSecurityMutationKey() {
  return ['DELETE', '/mixed-level-security'] as const
}

/**
 * Returns TanStack Query mutation options for DELETE /mixed-level-security
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
  mutation?: UseMutationOptions<
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
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async () =>
      parseResponse(client['mixed-level-security'].$delete(undefined, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /override-global
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetOverrideGlobalQueryKey() {
  return ['override-global', '/override-global'] as const
}

/**
 * Returns TanStack Query query options for GET /override-global
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
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['override-global']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOverrideGlobalQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /optional-enhanced
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetOptionalEnhancedQueryKey() {
  return ['optional-enhanced', '/optional-enhanced'] as const
}

/**
 * Returns TanStack Query query options for GET /optional-enhanced
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
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['optional-enhanced']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOptionalEnhancedQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /multi-tenant
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetMultiTenantQueryKey() {
  return ['multi-tenant', '/multi-tenant'] as const
}

/**
 * Returns TanStack Query query options for GET /multi-tenant
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
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-tenant']['$get']>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMultiTenantQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

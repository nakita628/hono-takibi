import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/24-extreme-security'

/**
 * GET /public
 *
 * Completely public endpoint
 */
export function useGetPublic(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.public.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPublicQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.public.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /public
 */
export function getGetPublicQueryKey() {
  return ['GET', '/public'] as const
}

/**
 * GET /single-auth
 *
 * Single authentication required
 */
export function useGetSingleAuth(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['single-auth']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSingleAuthQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['single-auth'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /single-auth
 */
export function getGetSingleAuthQueryKey() {
  return ['GET', '/single-auth'] as const
}

/**
 * GET /any-auth
 *
 * Any of these auth methods works (OR)
 */
export function useGetAnyAuth(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['any-auth']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAnyAuthQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['any-auth'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /any-auth
 */
export function getGetAnyAuthQueryKey() {
  return ['GET', '/any-auth'] as const
}

/**
 * GET /all-auth
 *
 * All of these auth methods required (AND)
 */
export function useGetAllAuth(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['all-auth']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAllAuthQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['all-auth'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /all-auth
 */
export function getGetAllAuthQueryKey() {
  return ['GET', '/all-auth'] as const
}

/**
 * GET /complex-auth
 *
 * Complex AND/OR security requirements
 */
export function useGetComplexAuth(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['complex-auth']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetComplexAuthQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['complex-auth'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /complex-auth
 */
export function getGetComplexAuthQueryKey() {
  return ['GET', '/complex-auth'] as const
}

/**
 * GET /scoped-oauth
 *
 * OAuth with many specific scopes
 */
export function useGetScopedOauth(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['scoped-oauth']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetScopedOauthQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['scoped-oauth'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /scoped-oauth
 */
export function getGetScopedOauthQueryKey() {
  return ['GET', '/scoped-oauth'] as const
}

/**
 * GET /mixed-level-security
 *
 * Path level + operation level security
 */
export function useGetMixedLevelSecurity(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['mixed-level-security']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMixedLevelSecurityQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client['mixed-level-security'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /mixed-level-security
 */
export function getGetMixedLevelSecurityQueryKey() {
  return ['GET', '/mixed-level-security'] as const
}

/**
 * PUT /mixed-level-security
 *
 * Admin-only security
 */
export function usePutMixedLevelSecurity(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['mixed-level-security']['$put']> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['mixed-level-security']['$put']> | undefined,
    Error,
    void
  >(
    {
      ...options?.mutation,
      mutationFn: async () =>
        parseResponse(client['mixed-level-security'].$put(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mixed-level-security
 *
 * Different security for POST
 */
export function usePostMixedLevelSecurity(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['mixed-level-security']['$post']> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['mixed-level-security']['$post']> | undefined,
    Error,
    void
  >(
    {
      ...options?.mutation,
      mutationFn: async () =>
        parseResponse(client['mixed-level-security'].$post(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /mixed-level-security
 *
 * Super admin security
 */
export function useDeleteMixedLevelSecurity(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['mixed-level-security']['$delete']> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['mixed-level-security']['$delete']> | undefined,
    Error,
    void
  >(
    {
      ...options?.mutation,
      mutationFn: async () =>
        parseResponse(client['mixed-level-security'].$delete(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /override-global
 *
 * Override global security with public
 */
export function useGetOverrideGlobal(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['override-global']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOverrideGlobalQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['override-global'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /override-global
 */
export function getGetOverrideGlobalQueryKey() {
  return ['GET', '/override-global'] as const
}

/**
 * GET /optional-enhanced
 *
 * Optional auth with enhanced access if authenticated
 */
export function useGetOptionalEnhanced(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['optional-enhanced']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOptionalEnhancedQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client['optional-enhanced'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /optional-enhanced
 */
export function getGetOptionalEnhancedQueryKey() {
  return ['GET', '/optional-enhanced'] as const
}

/**
 * GET /multi-tenant
 *
 * Multi-tenant with org-level auth
 */
export function useGetMultiTenant(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['multi-tenant']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMultiTenantQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['multi-tenant'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /multi-tenant
 */
export function getGetMultiTenantQueryKey() {
  return ['GET', '/multi-tenant'] as const
}

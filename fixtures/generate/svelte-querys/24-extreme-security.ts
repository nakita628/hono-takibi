import type {
  CreateMutationOptions,
  CreateQueryOptions,
  QueryFunctionContext,
} from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/24-extreme-security'

/**
 * Generates Svelte Query cache key for GET /public
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetPublicQueryKey() {
  return ['public', 'GET', '/public'] as const
}

/**
 * Returns Svelte Query query options for GET /public
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
export function createGetPublic(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.public.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPublicQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /single-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetSingleAuthQueryKey() {
  return ['single-auth', 'GET', '/single-auth'] as const
}

/**
 * Returns Svelte Query query options for GET /single-auth
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
export function createGetSingleAuth(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['single-auth']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSingleAuthQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /any-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAnyAuthQueryKey() {
  return ['any-auth', 'GET', '/any-auth'] as const
}

/**
 * Returns Svelte Query query options for GET /any-auth
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
export function createGetAnyAuth(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['any-auth']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAnyAuthQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /all-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAllAuthQueryKey() {
  return ['all-auth', 'GET', '/all-auth'] as const
}

/**
 * Returns Svelte Query query options for GET /all-auth
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
export function createGetAllAuth(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['all-auth']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAllAuthQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /complex-auth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetComplexAuthQueryKey() {
  return ['complex-auth', 'GET', '/complex-auth'] as const
}

/**
 * Returns Svelte Query query options for GET /complex-auth
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
export function createGetComplexAuth(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['complex-auth']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetComplexAuthQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /scoped-oauth
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetScopedOauthQueryKey() {
  return ['scoped-oauth', 'GET', '/scoped-oauth'] as const
}

/**
 * Returns Svelte Query query options for GET /scoped-oauth
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
export function createGetScopedOauth(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['scoped-oauth']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetScopedOauthQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /mixed-level-security
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMixedLevelSecurityQueryKey() {
  return ['mixed-level-security', 'GET', '/mixed-level-security'] as const
}

/**
 * Returns Svelte Query query options for GET /mixed-level-security
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
export function createGetMixedLevelSecurity(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['mixed-level-security']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMixedLevelSecurityQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /mixed-level-security
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMixedLevelSecurityMutationKey() {
  return ['mixed-level-security', 'PUT', '/mixed-level-security'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /mixed-level-security
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
export function createPutMixedLevelSecurity(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['mixed-level-security']['$put']>>>
        >
      >,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutMixedLevelSecurityMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /mixed-level-security
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMixedLevelSecurityMutationKey() {
  return ['mixed-level-security', 'POST', '/mixed-level-security'] as const
}

/**
 * Returns Svelte Query mutation options for POST /mixed-level-security
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
export function createPostMixedLevelSecurity(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['mixed-level-security']['$post']>>
          >
        >
      >,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMixedLevelSecurityMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /mixed-level-security
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteMixedLevelSecurityMutationKey() {
  return ['mixed-level-security', 'DELETE', '/mixed-level-security'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /mixed-level-security
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
export function createDeleteMixedLevelSecurity(
  options?: () => {
    mutation?: CreateMutationOptions<
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
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteMixedLevelSecurityMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /override-global
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOverrideGlobalQueryKey() {
  return ['override-global', 'GET', '/override-global'] as const
}

/**
 * Returns Svelte Query query options for GET /override-global
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
export function createGetOverrideGlobal(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['override-global']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetOverrideGlobalQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /optional-enhanced
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOptionalEnhancedQueryKey() {
  return ['optional-enhanced', 'GET', '/optional-enhanced'] as const
}

/**
 * Returns Svelte Query query options for GET /optional-enhanced
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
export function createGetOptionalEnhanced(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['optional-enhanced']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetOptionalEnhancedQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /multi-tenant
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMultiTenantQueryKey() {
  return ['multi-tenant', 'GET', '/multi-tenant'] as const
}

/**
 * Returns Svelte Query query options for GET /multi-tenant
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
export function createGetMultiTenant(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-tenant']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMultiTenantQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

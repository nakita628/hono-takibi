import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useMutation,
  queryOptions,
  infiniteQueryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getAllExportsKey() {
  return ['allExports'] as const
}

export function getArrayObjectConstraintsKey() {
  return ['arrayObjectConstraints'] as const
}

export function getCallbacksFieldKey() {
  return ['callbacksField'] as const
}

export function getCallbacksLinksKey() {
  return ['callbacksLinks'] as const
}

export function getCircularRefsKey() {
  return ['circularRefs'] as const
}

export function getComplexSchemasKey() {
  return ['complexSchemas'] as const
}

export function getCompositionKeywordsKey() {
  return ['compositionKeywords'] as const
}

export function getComprehensiveKey() {
  return ['comprehensive'] as const
}

export function getContentTypesKey() {
  return ['contentTypes'] as const
}

export function getCrudRefsKey() {
  return ['crudRefs'] as const
}

export function getDefaultResponseKey() {
  return ['defaultResponse'] as const
}

export function getMinimalKey() {
  return ['minimal'] as const
}

export function getPaginationKey() {
  return ['pagination'] as const
}

export function getParametersMergeKey() {
  return ['parametersMerge'] as const
}

export function getReadonlyRefKey() {
  return ['readonlyRef'] as const
}

export function getSchemaEdgeCasesKey() {
  return ['schemaEdgeCases'] as const
}

export function getSecuritySchemesKey() {
  return ['securitySchemes'] as const
}

export function getTrailingSlashKey() {
  return ['trailingSlash'] as const
}

export function getTrailingSlashRealKey() {
  return ['trailingSlashReal'] as const
}

export function getVendorExtensionsKey() {
  return ['vendorExtensions'] as const
}

export function getMinimalHealthQueryKey() {
  return ['minimal', '/minimal/health'] as const
}

export function getMinimalHealthQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getMinimalHealthQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.minimal.health.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useMinimalHealth<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.minimal.health.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.minimal.health.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getMinimalHealthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.minimal.health.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseMinimalHealth<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.minimal.health.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.minimal.health.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getMinimalHealthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.minimal.health.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getAllExportsUsersQueryKey(
  args: InferRequestType<typeof client.allExports.users.$get>,
) {
  return ['allExports', '/allExports/users', args] as const
}

export function getAllExportsUsersQueryOptions(
  args: InferRequestType<typeof client.allExports.users.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getAllExportsUsersQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.allExports.users.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useAllExportsUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.allExports.users.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.allExports.users.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.allExports.users.$get>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getAllExportsUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.allExports.users.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseAllExportsUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.allExports.users.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.allExports.users.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.allExports.users.$get>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getAllExportsUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.allExports.users.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostAllExportsUsersMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.allExports.users.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.allExports.users.$post>
  >({
    mutationKey: ['allExports', '/allExports/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.allExports.users.$post>) {
      return parseResponse(client.allExports.users.$post(args, options))
    },
  })
}

export function usePostAllExportsUsers<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.allExports.users.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.allExports.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostAllExportsUsersMutationOptions<TError>(clientOptions),
  })
}

export function getAllExportsUsersIdQueryKey(
  args: InferRequestType<(typeof client.allExports.users)[':id']['$get']>,
) {
  return ['allExports', '/allExports/users/:id', args] as const
}

export function getAllExportsUsersIdQueryOptions(
  args: InferRequestType<(typeof client.allExports.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getAllExportsUsersIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.allExports.users[':id'].$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useAllExportsUsersId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.allExports.users)[':id']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.allExports.users)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.allExports.users)[':id']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getAllExportsUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.allExports.users[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseAllExportsUsersId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.allExports.users)[':id']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.allExports.users)[':id']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.allExports.users)[':id']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getAllExportsUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.allExports.users[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getCircularRefsTreeQueryKey() {
  return ['circularRefs', '/circularRefs/tree'] as const
}

export function getCircularRefsTreeQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCircularRefsTreeQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.circularRefs.tree.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCircularRefsTree<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.circularRefs.tree.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.circularRefs.tree.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCircularRefsTreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.circularRefs.tree.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCircularRefsTree<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.circularRefs.tree.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.circularRefs.tree.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCircularRefsTreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.circularRefs.tree.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostCircularRefsTreeMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.circularRefs.tree.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.circularRefs.tree.$post>
  >({
    mutationKey: ['circularRefs', '/circularRefs/tree', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.circularRefs.tree.$post>) {
      return parseResponse(client.circularRefs.tree.$post(args, options))
    },
  })
}

export function usePostCircularRefsTree<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.circularRefs.tree.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.circularRefs.tree.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCircularRefsTreeMutationOptions<TError>(clientOptions),
  })
}

export function getCircularRefsGraphQueryKey() {
  return ['circularRefs', '/circularRefs/graph'] as const
}

export function getCircularRefsGraphQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCircularRefsGraphQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.circularRefs.graph.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCircularRefsGraph<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.circularRefs.graph.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.circularRefs.graph.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCircularRefsGraphQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.circularRefs.graph.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCircularRefsGraph<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.circularRefs.graph.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.circularRefs.graph.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCircularRefsGraphQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.circularRefs.graph.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getSecuritySchemesPublicQueryKey() {
  return ['securitySchemes', '/securitySchemes/public'] as const
}

export function getSecuritySchemesPublicQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getSecuritySchemesPublicQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.securitySchemes.public.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useSecuritySchemesPublic<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.securitySchemes.public.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.securitySchemes.public.$get>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getSecuritySchemesPublicQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes.public.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseSecuritySchemesPublic<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.securitySchemes.public.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.securitySchemes.public.$get>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getSecuritySchemesPublicQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes.public.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getSecuritySchemesBearerProtectedQueryKey() {
  return ['securitySchemes', '/securitySchemes/bearer-protected'] as const
}

export function getSecuritySchemesBearerProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getSecuritySchemesBearerProtectedQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.securitySchemes['bearer-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useSecuritySchemesBearerProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.securitySchemes)['bearer-protected']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.securitySchemes)['bearer-protected']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getSecuritySchemesBearerProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes['bearer-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseSecuritySchemesBearerProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.securitySchemes)['bearer-protected']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.securitySchemes)['bearer-protected']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getSecuritySchemesBearerProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes['bearer-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getSecuritySchemesApiKeyProtectedQueryKey() {
  return ['securitySchemes', '/securitySchemes/api-key-protected'] as const
}

export function getSecuritySchemesApiKeyProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getSecuritySchemesApiKeyProtectedQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.securitySchemes['api-key-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useSecuritySchemesApiKeyProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.securitySchemes)['api-key-protected']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.securitySchemes)['api-key-protected']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getSecuritySchemesApiKeyProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes['api-key-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseSecuritySchemesApiKeyProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.securitySchemes)['api-key-protected']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.securitySchemes)['api-key-protected']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getSecuritySchemesApiKeyProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes['api-key-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getSecuritySchemesBasicProtectedQueryKey() {
  return ['securitySchemes', '/securitySchemes/basic-protected'] as const
}

export function getSecuritySchemesBasicProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getSecuritySchemesBasicProtectedQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.securitySchemes['basic-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useSecuritySchemesBasicProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.securitySchemes)['basic-protected']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.securitySchemes)['basic-protected']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getSecuritySchemesBasicProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes['basic-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseSecuritySchemesBasicProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.securitySchemes)['basic-protected']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.securitySchemes)['basic-protected']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getSecuritySchemesBasicProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes['basic-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getSecuritySchemesOauthProtectedQueryKey() {
  return ['securitySchemes', '/securitySchemes/oauth-protected'] as const
}

export function getSecuritySchemesOauthProtectedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getSecuritySchemesOauthProtectedQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.securitySchemes['oauth-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useSecuritySchemesOauthProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.securitySchemes)['oauth-protected']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.securitySchemes)['oauth-protected']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getSecuritySchemesOauthProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes['oauth-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseSecuritySchemesOauthProtected<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.securitySchemes)['oauth-protected']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.securitySchemes)['oauth-protected']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getSecuritySchemesOauthProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes['oauth-protected'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getSecuritySchemesMultiAuthQueryKey() {
  return ['securitySchemes', '/securitySchemes/multi-auth'] as const
}

export function getSecuritySchemesMultiAuthQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getSecuritySchemesMultiAuthQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.securitySchemes['multi-auth'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useSecuritySchemesMultiAuth<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.securitySchemes)['multi-auth']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.securitySchemes)['multi-auth']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getSecuritySchemesMultiAuthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes['multi-auth'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseSecuritySchemesMultiAuth<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.securitySchemes)['multi-auth']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.securitySchemes)['multi-auth']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getSecuritySchemesMultiAuthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes['multi-auth'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostContentTypesJsonMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.json.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.json.$post>
  >({
    mutationKey: ['contentTypes', '/contentTypes/json', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.contentTypes.json.$post>) {
      return parseResponse(client.contentTypes.json.$post(args, options))
    },
  })
}

export function usePostContentTypesJson<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.json.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.json.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostContentTypesJsonMutationOptions<TError>(clientOptions),
  })
}

export function getPostContentTypesFormMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.form.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.form.$post>
  >({
    mutationKey: ['contentTypes', '/contentTypes/form', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.contentTypes.form.$post>) {
      return parseResponse(client.contentTypes.form.$post(args, options))
    },
  })
}

export function usePostContentTypesForm<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.form.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.form.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostContentTypesFormMutationOptions<TError>(clientOptions),
  })
}

export function getPostContentTypesUploadMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.upload.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.upload.$post>
  >({
    mutationKey: ['contentTypes', '/contentTypes/upload', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.contentTypes.upload.$post>) {
      return parseResponse(client.contentTypes.upload.$post(args, options))
    },
  })
}

export function usePostContentTypesUpload<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.upload.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.upload.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostContentTypesUploadMutationOptions<TError>(clientOptions),
  })
}

export function getPostContentTypesTextMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.text.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.text.$post>
  >({
    mutationKey: ['contentTypes', '/contentTypes/text', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.contentTypes.text.$post>) {
      return parseResponse(client.contentTypes.text.$post(args, options))
    },
  })
}

export function usePostContentTypesText<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.text.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.text.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostContentTypesTextMutationOptions<TError>(clientOptions),
  })
}

export function getPostContentTypesMultiContentMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.contentTypes)['multi-content']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.contentTypes)['multi-content']['$post']>
  >({
    mutationKey: ['contentTypes', '/contentTypes/multi-content', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.contentTypes)['multi-content']['$post']>,
    ) {
      return parseResponse(client.contentTypes['multi-content'].$post(args, options))
    },
  })
}

export function usePostContentTypesMultiContent<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.contentTypes)['multi-content']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.contentTypes)['multi-content']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostContentTypesMultiContentMutationOptions<TError>(clientOptions),
  })
}

export function getParametersMergeItemsItemIdQueryKey(
  args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$get']>,
) {
  const { header: _, ...keyArgs } = args
  return ['parametersMerge', '/parametersMerge/items/:itemId', keyArgs] as const
}

export function getParametersMergeItemsItemIdQueryOptions(
  args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getParametersMergeItemsItemIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.parametersMerge.items[':itemId'].$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useParametersMergeItemsItemId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.parametersMerge.items)[':itemId']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.parametersMerge.items)[':itemId']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getParametersMergeItemsItemIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.parametersMerge.items[':itemId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseParametersMergeItemsItemId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.parametersMerge.items)[':itemId']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.parametersMerge.items)[':itemId']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getParametersMergeItemsItemIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.parametersMerge.items[':itemId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPutParametersMergeItemsItemIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.parametersMerge.items)[':itemId']['$put']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$put']>
  >({
    mutationKey: ['parametersMerge', '/parametersMerge/items/:itemId', 'PUT'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$put']>,
    ) {
      return parseResponse(client.parametersMerge.items[':itemId'].$put(args, options))
    },
  })
}

export function usePutParametersMergeItemsItemId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.parametersMerge.items)[':itemId']['$put']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutParametersMergeItemsItemIdMutationOptions<TError>(clientOptions),
  })
}

export function getDeleteParametersMergeItemsItemIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.parametersMerge.items)[':itemId']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$delete']>
  >({
    mutationKey: ['parametersMerge', '/parametersMerge/items/:itemId', 'DELETE'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$delete']>,
    ) {
      return parseResponse(client.parametersMerge.items[':itemId'].$delete(args, options))
    },
  })
}

export function useDeleteParametersMergeItemsItemId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.parametersMerge.items)[':itemId']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getDeleteParametersMergeItemsItemIdMutationOptions<TError>(clientOptions),
  })
}

export function getParametersMergeItemsQueryKey(
  args: InferRequestType<typeof client.parametersMerge.items.$get>,
) {
  return ['parametersMerge', '/parametersMerge/items', args] as const
}

export function getParametersMergeItemsQueryOptions(
  args: InferRequestType<typeof client.parametersMerge.items.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getParametersMergeItemsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.parametersMerge.items.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useParametersMergeItems<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.parametersMerge.items.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.parametersMerge.items.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.parametersMerge.items.$get>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getParametersMergeItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.parametersMerge.items.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseParametersMergeItems<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.parametersMerge.items.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.parametersMerge.items.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.parametersMerge.items.$get>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getParametersMergeItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.parametersMerge.items.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostSchemaEdgeCasesNullableMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.nullable.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.schemaEdgeCases.nullable.$post>
  >({
    mutationKey: ['schemaEdgeCases', '/schemaEdgeCases/nullable', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.schemaEdgeCases.nullable.$post>) {
      return parseResponse(client.schemaEdgeCases.nullable.$post(args, options))
    },
  })
}

export function usePostSchemaEdgeCasesNullable<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.nullable.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.schemaEdgeCases.nullable.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostSchemaEdgeCasesNullableMutationOptions<TError>(clientOptions),
  })
}

export function getPostSchemaEdgeCasesDiscriminatedMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.discriminated.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.schemaEdgeCases.discriminated.$post>
  >({
    mutationKey: ['schemaEdgeCases', '/schemaEdgeCases/discriminated', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.schemaEdgeCases.discriminated.$post>) {
      return parseResponse(client.schemaEdgeCases.discriminated.$post(args, options))
    },
  })
}

export function usePostSchemaEdgeCasesDiscriminated<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.discriminated.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.schemaEdgeCases.discriminated.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostSchemaEdgeCasesDiscriminatedMutationOptions<TError>(clientOptions),
  })
}

export function getSchemaEdgeCasesComposedQueryKey() {
  return ['schemaEdgeCases', '/schemaEdgeCases/composed'] as const
}

export function getSchemaEdgeCasesComposedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getSchemaEdgeCasesComposedQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.schemaEdgeCases.composed.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useSchemaEdgeCasesComposed<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.composed.$get>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.composed.$get>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getSchemaEdgeCasesComposedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.schemaEdgeCases.composed.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseSchemaEdgeCasesComposed<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.composed.$get>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.composed.$get>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getSchemaEdgeCasesComposedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.schemaEdgeCases.composed.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getSchemaEdgeCasesDeepNestedQueryKey() {
  return ['schemaEdgeCases', '/schemaEdgeCases/deep-nested'] as const
}

export function getSchemaEdgeCasesDeepNestedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getSchemaEdgeCasesDeepNestedQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.schemaEdgeCases['deep-nested'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useSchemaEdgeCasesDeepNested<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.schemaEdgeCases)['deep-nested']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.schemaEdgeCases)['deep-nested']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getSchemaEdgeCasesDeepNestedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.schemaEdgeCases['deep-nested'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseSchemaEdgeCasesDeepNested<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.schemaEdgeCases)['deep-nested']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.schemaEdgeCases)['deep-nested']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getSchemaEdgeCasesDeepNestedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.schemaEdgeCases['deep-nested'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getSchemaEdgeCasesAdditionalPropsQueryKey() {
  return ['schemaEdgeCases', '/schemaEdgeCases/additional-props'] as const
}

export function getSchemaEdgeCasesAdditionalPropsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getSchemaEdgeCasesAdditionalPropsQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.schemaEdgeCases['additional-props'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useSchemaEdgeCasesAdditionalProps<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.schemaEdgeCases)['additional-props']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.schemaEdgeCases)['additional-props']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getSchemaEdgeCasesAdditionalPropsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.schemaEdgeCases['additional-props'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseSchemaEdgeCasesAdditionalProps<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.schemaEdgeCases)['additional-props']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.schemaEdgeCases)['additional-props']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getSchemaEdgeCasesAdditionalPropsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.schemaEdgeCases['additional-props'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostCallbacksLinksSubscriptionsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksLinks.subscriptions.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksLinks.subscriptions.$post>
  >({
    mutationKey: ['callbacksLinks', '/callbacksLinks/subscriptions', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.callbacksLinks.subscriptions.$post>) {
      return parseResponse(client.callbacksLinks.subscriptions.$post(args, options))
    },
  })
}

export function usePostCallbacksLinksSubscriptions<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksLinks.subscriptions.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksLinks.subscriptions.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCallbacksLinksSubscriptionsMutationOptions<TError>(clientOptions),
  })
}

export function getCallbacksLinksSubscriptionsIdQueryKey(
  args: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>,
) {
  return ['callbacksLinks', '/callbacksLinks/subscriptions/:id', args] as const
}

export function getCallbacksLinksSubscriptionsIdQueryOptions(
  args: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getCallbacksLinksSubscriptionsIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.callbacksLinks.subscriptions[':id'].$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCallbacksLinksSubscriptionsId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCallbacksLinksSubscriptionsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.callbacksLinks.subscriptions[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCallbacksLinksSubscriptionsId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCallbacksLinksSubscriptionsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.callbacksLinks.subscriptions[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getDeleteCallbacksLinksSubscriptionsIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.callbacksLinks.subscriptions)[':id']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$delete']>
  >({
    mutationKey: ['callbacksLinks', '/callbacksLinks/subscriptions/:id', 'DELETE'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$delete']>,
    ) {
      return parseResponse(client.callbacksLinks.subscriptions[':id'].$delete(args, options))
    },
  })
}

export function useDeleteCallbacksLinksSubscriptionsId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.callbacksLinks.subscriptions)[':id']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getDeleteCallbacksLinksSubscriptionsIdMutationOptions<TError>(clientOptions),
  })
}

export function getPostCallbacksLinksWebhooksTestMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksLinks.webhooks.test.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksLinks.webhooks.test.$post>
  >({
    mutationKey: ['callbacksLinks', '/callbacksLinks/webhooks/test', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.callbacksLinks.webhooks.test.$post>) {
      return parseResponse(client.callbacksLinks.webhooks.test.$post(args, options))
    },
  })
}

export function usePostCallbacksLinksWebhooksTest<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksLinks.webhooks.test.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksLinks.webhooks.test.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCallbacksLinksWebhooksTestMutationOptions<TError>(clientOptions),
  })
}

export function getCrudRefsPostsQueryKey(
  args: InferRequestType<typeof client.crudRefs.posts.$get>,
) {
  return ['crudRefs', '/crudRefs/posts', args] as const
}

export function getCrudRefsPostsQueryOptions(
  args: InferRequestType<typeof client.crudRefs.posts.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getCrudRefsPostsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.crudRefs.posts.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useCrudRefsPosts<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.posts.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.crudRefs.posts.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.posts.$get>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCrudRefsPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.posts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCrudRefsPosts<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.posts.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.crudRefs.posts.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.posts.$get>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCrudRefsPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.posts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostCrudRefsPostsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.posts.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.crudRefs.posts.$post>
  >({
    mutationKey: ['crudRefs', '/crudRefs/posts', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.crudRefs.posts.$post>) {
      return parseResponse(client.crudRefs.posts.$post(args, options))
    },
  })
}

export function usePostCrudRefsPosts<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.posts.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.crudRefs.posts.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCrudRefsPostsMutationOptions<TError>(clientOptions),
  })
}

export function getCrudRefsPostsIdQueryKey(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$get']>,
) {
  return ['crudRefs', '/crudRefs/posts/:id', args] as const
}

export function getCrudRefsPostsIdQueryOptions(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getCrudRefsPostsIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.crudRefs.posts[':id'].$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useCrudRefsPostsId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCrudRefsPostsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.posts[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCrudRefsPostsId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCrudRefsPostsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.posts[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPutCrudRefsPostsIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['$put']>>>
      >
    >,
    TError,
    InferRequestType<(typeof client.crudRefs.posts)[':id']['$put']>
  >({
    mutationKey: ['crudRefs', '/crudRefs/posts/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$put']>) {
      return parseResponse(client.crudRefs.posts[':id'].$put(args, options))
    },
  })
}

export function usePutCrudRefsPostsId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['$put']>>>
      >
    >,
    TError,
    InferRequestType<(typeof client.crudRefs.posts)[':id']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutCrudRefsPostsIdMutationOptions<TError>(clientOptions),
  })
}

export function getDeleteCrudRefsPostsIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.crudRefs.posts)[':id']['$delete']>
  >({
    mutationKey: ['crudRefs', '/crudRefs/posts/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$delete']>) {
      return parseResponse(client.crudRefs.posts[':id'].$delete(args, options))
    },
  })
}

export function useDeleteCrudRefsPostsId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.crudRefs.posts)[':id']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getDeleteCrudRefsPostsIdMutationOptions<TError>(clientOptions),
  })
}

export function getCrudRefsPostsIdCommentsQueryKey(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>,
) {
  return ['crudRefs', '/crudRefs/posts/:id/comments', args] as const
}

export function getCrudRefsPostsIdCommentsQueryOptions(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getCrudRefsPostsIdCommentsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.crudRefs.posts[':id'].comments.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCrudRefsPostsIdComments<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCrudRefsPostsIdCommentsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.posts[':id'].comments.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCrudRefsPostsIdComments<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCrudRefsPostsIdCommentsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.posts[':id'].comments.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostCrudRefsPostsIdCommentsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['comments']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$post']>
  >({
    mutationKey: ['crudRefs', '/crudRefs/posts/:id/comments', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$post']>,
    ) {
      return parseResponse(client.crudRefs.posts[':id'].comments.$post(args, options))
    },
  })
}

export function usePostCrudRefsPostsIdComments<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['comments']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCrudRefsPostsIdCommentsMutationOptions<TError>(clientOptions),
  })
}

export function getCrudRefsTagsQueryKey() {
  return ['crudRefs', '/crudRefs/tags'] as const
}

export function getCrudRefsTagsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCrudRefsTagsQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.crudRefs.tags.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useCrudRefsTags<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.tags.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.tags.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCrudRefsTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.tags.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCrudRefsTags<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.tags.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.tags.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCrudRefsTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.tags.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getComprehensiveUsersQueryKey(
  args: InferRequestType<typeof client.comprehensive.users.$get>,
) {
  return ['comprehensive', '/comprehensive/users', args] as const
}

export function getComprehensiveUsersQueryOptions(
  args: InferRequestType<typeof client.comprehensive.users.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getComprehensiveUsersQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.users.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useComprehensiveUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.users.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.comprehensive.users.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.users.$get>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getComprehensiveUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.users.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComprehensiveUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.users.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.comprehensive.users.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.users.$get>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getComprehensiveUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.users.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostComprehensiveUsersMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.users.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.comprehensive.users.$post>
  >({
    mutationKey: ['comprehensive', '/comprehensive/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.comprehensive.users.$post>) {
      return parseResponse(client.comprehensive.users.$post(args, options))
    },
  })
}

export function usePostComprehensiveUsers<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.users.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.comprehensive.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComprehensiveUsersMutationOptions<TError>(clientOptions),
  })
}

export function getComprehensiveUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$get']>,
) {
  return ['comprehensive', '/comprehensive/users/:userId', args] as const
}

export function getComprehensiveUsersUserIdQueryOptions(
  args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getComprehensiveUsersUserIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.users[':userId'].$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useComprehensiveUsersUserId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.comprehensive.users)[':userId']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comprehensive.users)[':userId']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getComprehensiveUsersUserIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.users[':userId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComprehensiveUsersUserId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.comprehensive.users)[':userId']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comprehensive.users)[':userId']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getComprehensiveUsersUserIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.users[':userId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPutComprehensiveUsersUserIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.comprehensive.users)[':userId']['$put']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.comprehensive.users)[':userId']['$put']>
  >({
    mutationKey: ['comprehensive', '/comprehensive/users/:userId', 'PUT'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$put']>,
    ) {
      return parseResponse(client.comprehensive.users[':userId'].$put(args, options))
    },
  })
}

export function usePutComprehensiveUsersUserId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.comprehensive.users)[':userId']['$put']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.comprehensive.users)[':userId']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutComprehensiveUsersUserIdMutationOptions<TError>(clientOptions),
  })
}

export function getDeleteComprehensiveUsersUserIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comprehensive.users)[':userId']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.comprehensive.users)[':userId']['$delete']>
  >({
    mutationKey: ['comprehensive', '/comprehensive/users/:userId', 'DELETE'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$delete']>,
    ) {
      return parseResponse(client.comprehensive.users[':userId'].$delete(args, options))
    },
  })
}

export function useDeleteComprehensiveUsersUserId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comprehensive.users)[':userId']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    InferRequestType<(typeof client.comprehensive.users)[':userId']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getDeleteComprehensiveUsersUserIdMutationOptions<TError>(clientOptions),
  })
}

export function getComprehensiveProductsQueryKey(
  args: InferRequestType<typeof client.comprehensive.products.$get>,
) {
  return ['comprehensive', '/comprehensive/products', args] as const
}

export function getComprehensiveProductsQueryOptions(
  args: InferRequestType<typeof client.comprehensive.products.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getComprehensiveProductsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.products.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useComprehensiveProducts<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.products.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.comprehensive.products.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.products.$get>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getComprehensiveProductsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.products.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComprehensiveProducts<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.products.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.comprehensive.products.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.products.$get>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getComprehensiveProductsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.products.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostComprehensiveProductsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.products.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.comprehensive.products.$post>
  >({
    mutationKey: ['comprehensive', '/comprehensive/products', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.comprehensive.products.$post>) {
      return parseResponse(client.comprehensive.products.$post(args, options))
    },
  })
}

export function usePostComprehensiveProducts<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.products.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.comprehensive.products.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComprehensiveProductsMutationOptions<TError>(clientOptions),
  })
}

export function getComprehensiveProductsProductIdQueryKey(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$get']>,
) {
  return ['comprehensive', '/comprehensive/products/:productId', args] as const
}

export function getComprehensiveProductsProductIdQueryOptions(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getComprehensiveProductsProductIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.products[':productId'].$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useComprehensiveProductsProductId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.comprehensive.products)[':productId']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comprehensive.products)[':productId']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getComprehensiveProductsProductIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.products[':productId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComprehensiveProductsProductId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.comprehensive.products)[':productId']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comprehensive.products)[':productId']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getComprehensiveProductsProductIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.products[':productId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPutComprehensiveProductsProductIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.comprehensive.products)[':productId']['$put']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.comprehensive.products)[':productId']['$put']>
  >({
    mutationKey: ['comprehensive', '/comprehensive/products/:productId', 'PUT'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$put']>,
    ) {
      return parseResponse(client.comprehensive.products[':productId'].$put(args, options))
    },
  })
}

export function usePutComprehensiveProductsProductId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.comprehensive.products)[':productId']['$put']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.comprehensive.products)[':productId']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutComprehensiveProductsProductIdMutationOptions<TError>(clientOptions),
  })
}

export function getComprehensiveProductsProductIdReviewsQueryKey(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>,
) {
  return ['comprehensive', '/comprehensive/products/:productId/reviews', args] as const
}

export function getComprehensiveProductsProductIdReviewsQueryOptions(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getComprehensiveProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.products[':productId'].reviews.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useComprehensiveProductsProductIdReviews<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>
            >
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getComprehensiveProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.products[':productId'].reviews.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComprehensiveProductsProductIdReviews<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>
            >
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getComprehensiveProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.products[':productId'].reviews.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostComprehensiveProductsProductIdReviewsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client.comprehensive.products)[':productId']['reviews']['$post']>
          >
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$post']>
  >({
    mutationKey: ['comprehensive', '/comprehensive/products/:productId/reviews', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<
        (typeof client.comprehensive.products)[':productId']['reviews']['$post']
      >,
    ) {
      return parseResponse(client.comprehensive.products[':productId'].reviews.$post(args, options))
    },
  })
}

export function usePostComprehensiveProductsProductIdReviews<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client.comprehensive.products)[':productId']['reviews']['$post']>
          >
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComprehensiveProductsProductIdReviewsMutationOptions<TError>(clientOptions),
  })
}

export function getComprehensiveOrdersQueryKey(
  args: InferRequestType<typeof client.comprehensive.orders.$get>,
) {
  return ['comprehensive', '/comprehensive/orders', args] as const
}

export function getComprehensiveOrdersQueryOptions(
  args: InferRequestType<typeof client.comprehensive.orders.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getComprehensiveOrdersQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.orders.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useComprehensiveOrders<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.orders.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.comprehensive.orders.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.orders.$get>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getComprehensiveOrdersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.orders.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComprehensiveOrders<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.orders.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.comprehensive.orders.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.orders.$get>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getComprehensiveOrdersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.orders.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostComprehensiveOrdersMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.orders.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.comprehensive.orders.$post>
  >({
    mutationKey: ['comprehensive', '/comprehensive/orders', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.comprehensive.orders.$post>) {
      return parseResponse(client.comprehensive.orders.$post(args, options))
    },
  })
}

export function usePostComprehensiveOrders<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.orders.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.comprehensive.orders.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComprehensiveOrdersMutationOptions<TError>(clientOptions),
  })
}

export function getComprehensiveOrdersOrderIdQueryKey(
  args: InferRequestType<(typeof client.comprehensive.orders)[':orderId']['$get']>,
) {
  return ['comprehensive', '/comprehensive/orders/:orderId', args] as const
}

export function getComprehensiveOrdersOrderIdQueryOptions(
  args: InferRequestType<(typeof client.comprehensive.orders)[':orderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getComprehensiveOrdersOrderIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.orders[':orderId'].$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useComprehensiveOrdersOrderId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.comprehensive.orders)[':orderId']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.comprehensive.orders)[':orderId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comprehensive.orders)[':orderId']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getComprehensiveOrdersOrderIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.orders[':orderId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComprehensiveOrdersOrderId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.comprehensive.orders)[':orderId']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.comprehensive.orders)[':orderId']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comprehensive.orders)[':orderId']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getComprehensiveOrdersOrderIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.orders[':orderId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getComprehensiveCategoriesQueryKey() {
  return ['comprehensive', '/comprehensive/categories'] as const
}

export function getComprehensiveCategoriesQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getComprehensiveCategoriesQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.categories.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useComprehensiveCategories<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.categories.$get>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.categories.$get>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getComprehensiveCategoriesQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.categories.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComprehensiveCategories<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.categories.$get>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.categories.$get>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getComprehensiveCategoriesQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.categories.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostComprehensiveUploadImageMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.upload.image.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.comprehensive.upload.image.$post>
  >({
    mutationKey: ['comprehensive', '/comprehensive/upload/image', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.comprehensive.upload.image.$post>) {
      return parseResponse(client.comprehensive.upload.image.$post(args, options))
    },
  })
}

export function usePostComprehensiveUploadImage<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.upload.image.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.comprehensive.upload.image.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComprehensiveUploadImageMutationOptions<TError>(clientOptions),
  })
}

export function getPostCompositionKeywordsOneOfMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['one-of']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.compositionKeywords)['one-of']['$post']>
  >({
    mutationKey: ['compositionKeywords', '/compositionKeywords/one-of', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.compositionKeywords)['one-of']['$post']>,
    ) {
      return parseResponse(client.compositionKeywords['one-of'].$post(args, options))
    },
  })
}

export function usePostCompositionKeywordsOneOf<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['one-of']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.compositionKeywords)['one-of']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCompositionKeywordsOneOfMutationOptions<TError>(clientOptions),
  })
}

export function getPostCompositionKeywordsAnyOfMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['any-of']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.compositionKeywords)['any-of']['$post']>
  >({
    mutationKey: ['compositionKeywords', '/compositionKeywords/any-of', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.compositionKeywords)['any-of']['$post']>,
    ) {
      return parseResponse(client.compositionKeywords['any-of'].$post(args, options))
    },
  })
}

export function usePostCompositionKeywordsAnyOf<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['any-of']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.compositionKeywords)['any-of']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCompositionKeywordsAnyOfMutationOptions<TError>(clientOptions),
  })
}

export function getPostCompositionKeywordsAllOfMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['all-of']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.compositionKeywords)['all-of']['$post']>
  >({
    mutationKey: ['compositionKeywords', '/compositionKeywords/all-of', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.compositionKeywords)['all-of']['$post']>,
    ) {
      return parseResponse(client.compositionKeywords['all-of'].$post(args, options))
    },
  })
}

export function usePostCompositionKeywordsAllOf<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['all-of']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.compositionKeywords)['all-of']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCompositionKeywordsAllOfMutationOptions<TError>(clientOptions),
  })
}

export function getPostCompositionKeywordsNotMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.compositionKeywords.not.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.compositionKeywords.not.$post>
  >({
    mutationKey: ['compositionKeywords', '/compositionKeywords/not', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.compositionKeywords.not.$post>) {
      return parseResponse(client.compositionKeywords.not.$post(args, options))
    },
  })
}

export function usePostCompositionKeywordsNot<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.compositionKeywords.not.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.compositionKeywords.not.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCompositionKeywordsNotMutationOptions<TError>(clientOptions),
  })
}

export function getCompositionKeywordsNotRefQueryKey() {
  return ['compositionKeywords', '/compositionKeywords/not-ref'] as const
}

export function getCompositionKeywordsNotRefQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCompositionKeywordsNotRefQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.compositionKeywords['not-ref'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCompositionKeywordsNotRef<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['not-ref']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['not-ref']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsNotRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-ref'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCompositionKeywordsNotRef<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['not-ref']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['not-ref']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsNotRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-ref'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getCompositionKeywordsNotEnumQueryKey() {
  return ['compositionKeywords', '/compositionKeywords/not-enum'] as const
}

export function getCompositionKeywordsNotEnumQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCompositionKeywordsNotEnumQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.compositionKeywords['not-enum'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCompositionKeywordsNotEnum<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['not-enum']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['not-enum']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsNotEnumQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-enum'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCompositionKeywordsNotEnum<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['not-enum']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['not-enum']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsNotEnumQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-enum'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getCompositionKeywordsNotConstQueryKey() {
  return ['compositionKeywords', '/compositionKeywords/not-const'] as const
}

export function getCompositionKeywordsNotConstQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCompositionKeywordsNotConstQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.compositionKeywords['not-const'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCompositionKeywordsNotConst<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['not-const']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['not-const']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsNotConstQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-const'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCompositionKeywordsNotConst<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['not-const']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['not-const']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsNotConstQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-const'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getCompositionKeywordsNotCompositionQueryKey() {
  return ['compositionKeywords', '/compositionKeywords/not-composition'] as const
}

export function getCompositionKeywordsNotCompositionQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCompositionKeywordsNotCompositionQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.compositionKeywords['not-composition'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCompositionKeywordsNotComposition<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['not-composition']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['not-composition']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsNotCompositionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-composition'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCompositionKeywordsNotComposition<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['not-composition']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['not-composition']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsNotCompositionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-composition'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getCompositionKeywordsAllOfSiblingQueryKey() {
  return ['compositionKeywords', '/compositionKeywords/all-of-sibling'] as const
}

export function getCompositionKeywordsAllOfSiblingQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCompositionKeywordsAllOfSiblingQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.compositionKeywords['all-of-sibling'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCompositionKeywordsAllOfSibling<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['all-of-sibling']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['all-of-sibling']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsAllOfSiblingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['all-of-sibling'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCompositionKeywordsAllOfSibling<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['all-of-sibling']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['all-of-sibling']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsAllOfSiblingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['all-of-sibling'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getCompositionKeywordsNullableOneOfQueryKey() {
  return ['compositionKeywords', '/compositionKeywords/nullable-one-of'] as const
}

export function getCompositionKeywordsNullableOneOfQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCompositionKeywordsNullableOneOfQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.compositionKeywords['nullable-one-of'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCompositionKeywordsNullableOneOf<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['nullable-one-of']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['nullable-one-of']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsNullableOneOfQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['nullable-one-of'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCompositionKeywordsNullableOneOf<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['nullable-one-of']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['nullable-one-of']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsNullableOneOfQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['nullable-one-of'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getCompositionKeywordsAnyOfThreeQueryKey() {
  return ['compositionKeywords', '/compositionKeywords/any-of-three'] as const
}

export function getCompositionKeywordsAnyOfThreeQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCompositionKeywordsAnyOfThreeQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.compositionKeywords['any-of-three'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCompositionKeywordsAnyOfThree<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['any-of-three']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['any-of-three']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsAnyOfThreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['any-of-three'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCompositionKeywordsAnyOfThree<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['any-of-three']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['any-of-three']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsAnyOfThreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['any-of-three'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getCompositionKeywordsAnyOfRefQueryKey() {
  return ['compositionKeywords', '/compositionKeywords/any-of-ref'] as const
}

export function getCompositionKeywordsAnyOfRefQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCompositionKeywordsAnyOfRefQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.compositionKeywords['any-of-ref'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCompositionKeywordsAnyOfRef<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['any-of-ref']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['any-of-ref']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsAnyOfRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['any-of-ref'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCompositionKeywordsAnyOfRef<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['any-of-ref']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['any-of-ref']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCompositionKeywordsAnyOfRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['any-of-ref'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostCallbacksFieldOrdersMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksField.orders.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksField.orders.$post>
  >({
    mutationKey: ['callbacksField', '/callbacksField/orders', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.callbacksField.orders.$post>) {
      return parseResponse(client.callbacksField.orders.$post(args, options))
    },
  })
}

export function usePostCallbacksFieldOrders<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksField.orders.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksField.orders.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCallbacksFieldOrdersMutationOptions<TError>(clientOptions),
  })
}

export function getPostCallbacksFieldPaymentsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksField.payments.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksField.payments.$post>
  >({
    mutationKey: ['callbacksField', '/callbacksField/payments', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.callbacksField.payments.$post>) {
      return parseResponse(client.callbacksField.payments.$post(args, options))
    },
  })
}

export function usePostCallbacksFieldPayments<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksField.payments.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.callbacksField.payments.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCallbacksFieldPaymentsMutationOptions<TError>(clientOptions),
  })
}

export function getCallbacksFieldItemsQueryKey() {
  return ['callbacksField', '/callbacksField/items'] as const
}

export function getCallbacksFieldItemsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCallbacksFieldItemsQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.callbacksField.items.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCallbacksFieldItems<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.callbacksField.items.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.callbacksField.items.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCallbacksFieldItemsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.callbacksField.items.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCallbacksFieldItems<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.callbacksField.items.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.callbacksField.items.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCallbacksFieldItemsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.callbacksField.items.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getArrayObjectConstraintsTagsQueryKey() {
  return ['arrayObjectConstraints', '/arrayObjectConstraints/tags'] as const
}

export function getArrayObjectConstraintsTagsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getArrayObjectConstraintsTagsQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.arrayObjectConstraints.tags.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useArrayObjectConstraintsTags<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.tags.$get>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.tags.$get>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getArrayObjectConstraintsTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.arrayObjectConstraints.tags.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseArrayObjectConstraintsTags<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.tags.$get>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.tags.$get>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getArrayObjectConstraintsTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.arrayObjectConstraints.tags.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostArrayObjectConstraintsTagsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.tags.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.tags.$post>
  >({
    mutationKey: ['arrayObjectConstraints', '/arrayObjectConstraints/tags', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.arrayObjectConstraints.tags.$post>) {
      return parseResponse(client.arrayObjectConstraints.tags.$post(args, options))
    },
  })
}

export function usePostArrayObjectConstraintsTags<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.tags.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.tags.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostArrayObjectConstraintsTagsMutationOptions<TError>(clientOptions),
  })
}

export function getArrayObjectConstraintsSettingsQueryKey(
  args: InferRequestType<typeof client.arrayObjectConstraints.settings.$get>,
) {
  return ['arrayObjectConstraints', '/arrayObjectConstraints/settings', args] as const
}

export function getArrayObjectConstraintsSettingsQueryOptions(
  args: InferRequestType<typeof client.arrayObjectConstraints.settings.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getArrayObjectConstraintsSettingsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.arrayObjectConstraints.settings.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useArrayObjectConstraintsSettings<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.settings.$get>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.arrayObjectConstraints.settings.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.arrayObjectConstraints.settings.$get>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getArrayObjectConstraintsSettingsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.arrayObjectConstraints.settings.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseArrayObjectConstraintsSettings<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.settings.$get>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.arrayObjectConstraints.settings.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.arrayObjectConstraints.settings.$get>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getArrayObjectConstraintsSettingsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.arrayObjectConstraints.settings.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPutArrayObjectConstraintsSettingsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.arrayObjectConstraints.settings.$put>>
        >
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.settings.$put>
  >({
    mutationKey: ['arrayObjectConstraints', '/arrayObjectConstraints/settings', 'PUT'] as const,
    async mutationFn(args: InferRequestType<typeof client.arrayObjectConstraints.settings.$put>) {
      return parseResponse(client.arrayObjectConstraints.settings.$put(args, options))
    },
  })
}

export function usePutArrayObjectConstraintsSettings<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.arrayObjectConstraints.settings.$put>>
        >
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.settings.$put>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutArrayObjectConstraintsSettingsMutationOptions<TError>(clientOptions),
  })
}

export function getPostArrayObjectConstraintsConfigMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.config.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.config.$post>
  >({
    mutationKey: ['arrayObjectConstraints', '/arrayObjectConstraints/config', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.arrayObjectConstraints.config.$post>) {
      return parseResponse(client.arrayObjectConstraints.config.$post(args, options))
    },
  })
}

export function usePostArrayObjectConstraintsConfig<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.config.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.config.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostArrayObjectConstraintsConfigMutationOptions<TError>(clientOptions),
  })
}

export function getPostArrayObjectConstraintsPaymentMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.arrayObjectConstraints.payment.$post>>
        >
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.payment.$post>
  >({
    mutationKey: ['arrayObjectConstraints', '/arrayObjectConstraints/payment', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.arrayObjectConstraints.payment.$post>) {
      return parseResponse(client.arrayObjectConstraints.payment.$post(args, options))
    },
  })
}

export function usePostArrayObjectConstraintsPayment<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.arrayObjectConstraints.payment.$post>>
        >
      >
    >,
    TError,
    InferRequestType<typeof client.arrayObjectConstraints.payment.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostArrayObjectConstraintsPaymentMutationOptions<TError>(clientOptions),
  })
}

export function getTrailingSlashApiReverseChibanIndexQueryKey() {
  return ['trailingSlash', '/trailingSlash/api/reverseChiban/'] as const
}

export function getTrailingSlashApiReverseChibanIndexQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getTrailingSlashApiReverseChibanIndexQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.trailingSlash.api.reverseChiban.index.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useTrailingSlashApiReverseChibanIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<typeof client.trailingSlash.api.reverseChiban.index.$get>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.trailingSlash.api.reverseChiban.index.$get>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getTrailingSlashApiReverseChibanIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.api.reverseChiban.index.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseTrailingSlashApiReverseChibanIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<typeof client.trailingSlash.api.reverseChiban.index.$get>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.trailingSlash.api.reverseChiban.index.$get>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getTrailingSlashApiReverseChibanIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.api.reverseChiban.index.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getTrailingSlashApiReverseChibanQueryKey() {
  return ['trailingSlash', '/trailingSlash/api/reverseChiban'] as const
}

export function getTrailingSlashApiReverseChibanQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getTrailingSlashApiReverseChibanQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.trailingSlash.api.reverseChiban.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useTrailingSlashApiReverseChiban<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.api.reverseChiban.$get>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.trailingSlash.api.reverseChiban.$get>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getTrailingSlashApiReverseChibanQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.api.reverseChiban.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseTrailingSlashApiReverseChiban<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.api.reverseChiban.$get>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.trailingSlash.api.reverseChiban.$get>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getTrailingSlashApiReverseChibanQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.api.reverseChiban.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getTrailingSlashPostsIndexQueryKey(
  args: InferRequestType<typeof client.trailingSlash.posts.index.$get>,
) {
  return ['trailingSlash', '/trailingSlash/posts/', args] as const
}

export function getTrailingSlashPostsIndexQueryOptions(
  args: InferRequestType<typeof client.trailingSlash.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getTrailingSlashPostsIndexQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.trailingSlash.posts.index.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useTrailingSlashPostsIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.posts.index.$get>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.trailingSlash.posts.index.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.posts.index.$get>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getTrailingSlashPostsIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.posts.index.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseTrailingSlashPostsIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.posts.index.$get>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.trailingSlash.posts.index.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.posts.index.$get>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getTrailingSlashPostsIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.posts.index.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostTrailingSlashPostsIndexMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.posts.index.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.trailingSlash.posts.index.$post>
  >({
    mutationKey: ['trailingSlash', '/trailingSlash/posts/', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.trailingSlash.posts.index.$post>) {
      return parseResponse(client.trailingSlash.posts.index.$post(args, options))
    },
  })
}

export function usePostTrailingSlashPostsIndex<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.posts.index.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.trailingSlash.posts.index.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostTrailingSlashPostsIndexMutationOptions<TError>(clientOptions),
  })
}

export function getTrailingSlashUsersIdIndexQueryKey(
  args: InferRequestType<(typeof client.trailingSlash.users)[':id']['index']['$get']>,
) {
  return ['trailingSlash', '/trailingSlash/users/:id/', args] as const
}

export function getTrailingSlashUsersIdIndexQueryOptions(
  args: InferRequestType<(typeof client.trailingSlash.users)[':id']['index']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getTrailingSlashUsersIdIndexQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.trailingSlash.users[':id'].index.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useTrailingSlashUsersIdIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.trailingSlash.users)[':id']['index']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.trailingSlash.users)[':id']['index']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.trailingSlash.users)[':id']['index']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getTrailingSlashUsersIdIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.users[':id'].index.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseTrailingSlashUsersIdIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.trailingSlash.users)[':id']['index']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.trailingSlash.users)[':id']['index']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.trailingSlash.users)[':id']['index']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getTrailingSlashUsersIdIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.users[':id'].index.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getTrailingSlashItemsIndexQueryKey() {
  return ['trailingSlash', '/trailingSlash/items/'] as const
}

export function getTrailingSlashItemsIndexQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getTrailingSlashItemsIndexQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.trailingSlash.items.index.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useTrailingSlashItemsIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.items.index.$get>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.items.index.$get>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getTrailingSlashItemsIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.items.index.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseTrailingSlashItemsIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.items.index.$get>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.items.index.$get>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getTrailingSlashItemsIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.items.index.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getReadonlyRefUsersQueryKey() {
  return ['readonlyRef', '/readonlyRef/users'] as const
}

export function getReadonlyRefUsersQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getReadonlyRefUsersQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.readonlyRef.users.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useReadonlyRefUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.users.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.users.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getReadonlyRefUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.readonlyRef.users.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseReadonlyRefUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.users.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.users.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getReadonlyRefUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.readonlyRef.users.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostReadonlyRefUsersMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.users.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.readonlyRef.users.$post>
  >({
    mutationKey: ['readonlyRef', '/readonlyRef/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.readonlyRef.users.$post>) {
      return parseResponse(client.readonlyRef.users.$post(args, options))
    },
  })
}

export function usePostReadonlyRefUsers<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.users.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.readonlyRef.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostReadonlyRefUsersMutationOptions<TError>(clientOptions),
  })
}

export function getReadonlyRefUsersIdQueryKey(
  args: InferRequestType<(typeof client.readonlyRef.users)[':id']['$get']>,
) {
  return ['readonlyRef', '/readonlyRef/users/:id', args] as const
}

export function getReadonlyRefUsersIdQueryOptions(
  args: InferRequestType<(typeof client.readonlyRef.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getReadonlyRefUsersIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.readonlyRef.users[':id'].$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useReadonlyRefUsersId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.readonlyRef.users)[':id']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.readonlyRef.users)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.readonlyRef.users)[':id']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getReadonlyRefUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.readonlyRef.users[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseReadonlyRefUsersId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.readonlyRef.users)[':id']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.readonlyRef.users)[':id']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.readonlyRef.users)[':id']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getReadonlyRefUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.readonlyRef.users[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPutReadonlyRefUsersIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.readonlyRef.users)[':id']['$put']>>>
      >
    >,
    TError,
    InferRequestType<(typeof client.readonlyRef.users)[':id']['$put']>
  >({
    mutationKey: ['readonlyRef', '/readonlyRef/users/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.readonlyRef.users)[':id']['$put']>) {
      return parseResponse(client.readonlyRef.users[':id'].$put(args, options))
    },
  })
}

export function usePutReadonlyRefUsersId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.readonlyRef.users)[':id']['$put']>>>
      >
    >,
    TError,
    InferRequestType<(typeof client.readonlyRef.users)[':id']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutReadonlyRefUsersIdMutationOptions<TError>(clientOptions),
  })
}

export function getReadonlyRefItemsQueryKey() {
  return ['readonlyRef', '/readonlyRef/items'] as const
}

export function getReadonlyRefItemsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getReadonlyRefItemsQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.readonlyRef.items.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useReadonlyRefItems<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.items.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.items.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getReadonlyRefItemsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.readonlyRef.items.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseReadonlyRefItems<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.items.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.items.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getReadonlyRefItemsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.readonlyRef.items.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getTrailingSlashRealApiReverseGeocodeIndexQueryKey(
  args: InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>,
) {
  return ['trailingSlashReal', '/trailingSlashReal/api/reverseGeocode/', args] as const
}

export function getTrailingSlashRealApiReverseGeocodeIndexQueryOptions(
  args: InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getTrailingSlashRealApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.trailingSlashReal.api.reverseGeocode.index.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useTrailingSlashRealApiReverseGeocodeIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getTrailingSlashRealApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlashReal.api.reverseGeocode.index.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseTrailingSlashRealApiReverseGeocodeIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getTrailingSlashRealApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlashReal.api.reverseGeocode.index.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndexMutationOptions<
  TError = unknown,
>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              typeof client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post
            >
          >
        >
      >
    >,
    TError,
    InferRequestType<
      typeof client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post
    >
  >({
    mutationKey: [
      'trailingSlashReal',
      '/trailingSlashReal/api/v2/public/booking/account/register/oauth/',
      'POST',
    ] as const,
    async mutationFn(
      args: InferRequestType<
        typeof client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post
      >,
    ) {
      return parseResponse(
        client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post(
          args,
          options,
        ),
      )
    },
  })
}

export function usePostTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndex<
  TError = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              typeof client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post
            >
          >
        >
      >
    >,
    TError,
    InferRequestType<
      typeof client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post
    >
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndexMutationOptions<TError>(
      clientOptions,
    ),
  })
}

export function getPostTrailingSlashRealApiV2PublicBookingAccountRegisterEmailMutationOptions<
  TError = unknown,
>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              typeof client.trailingSlashReal.api.v2.public.booking.account.register.email.$post
            >
          >
        >
      >
    >,
    TError,
    InferRequestType<
      typeof client.trailingSlashReal.api.v2.public.booking.account.register.email.$post
    >
  >({
    mutationKey: [
      'trailingSlashReal',
      '/trailingSlashReal/api/v2/public/booking/account/register/email',
      'POST',
    ] as const,
    async mutationFn(
      args: InferRequestType<
        typeof client.trailingSlashReal.api.v2.public.booking.account.register.email.$post
      >,
    ) {
      return parseResponse(
        client.trailingSlashReal.api.v2.public.booking.account.register.email.$post(args, options),
      )
    },
  })
}

export function usePostTrailingSlashRealApiV2PublicBookingAccountRegisterEmail<
  TError = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              typeof client.trailingSlashReal.api.v2.public.booking.account.register.email.$post
            >
          >
        >
      >
    >,
    TError,
    InferRequestType<
      typeof client.trailingSlashReal.api.v2.public.booking.account.register.email.$post
    >
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostTrailingSlashRealApiV2PublicBookingAccountRegisterEmailMutationOptions<TError>(
      clientOptions,
    ),
  })
}

export function getPostDefaultResponseItemsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.defaultResponse.items.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.defaultResponse.items.$post>
  >({
    mutationKey: ['defaultResponse', '/defaultResponse/items', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.defaultResponse.items.$post>) {
      return parseResponse(client.defaultResponse.items.$post(args, options))
    },
  })
}

export function usePostDefaultResponseItems<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.defaultResponse.items.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.defaultResponse.items.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostDefaultResponseItemsMutationOptions<TError>(clientOptions),
  })
}

export function getDefaultResponsePingQueryKey() {
  return ['defaultResponse', '/defaultResponse/ping'] as const
}

export function getDefaultResponsePingQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getDefaultResponsePingQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.defaultResponse.ping.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useDefaultResponsePing<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.defaultResponse.ping.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.defaultResponse.ping.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getDefaultResponsePingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.defaultResponse.ping.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseDefaultResponsePing<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.defaultResponse.ping.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.defaultResponse.ping.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getDefaultResponsePingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.defaultResponse.ping.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostComplexSchemasExpressionsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.expressions.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.expressions.$post>
  >({
    mutationKey: ['complexSchemas', '/complexSchemas/expressions', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.complexSchemas.expressions.$post>) {
      return parseResponse(client.complexSchemas.expressions.$post(args, options))
    },
  })
}

export function usePostComplexSchemasExpressions<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.expressions.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.expressions.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComplexSchemasExpressionsMutationOptions<TError>(clientOptions),
  })
}

export function getPostComplexSchemasShapesMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.shapes.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.shapes.$post>
  >({
    mutationKey: ['complexSchemas', '/complexSchemas/shapes', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.complexSchemas.shapes.$post>) {
      return parseResponse(client.complexSchemas.shapes.$post(args, options))
    },
  })
}

export function usePostComplexSchemasShapes<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.shapes.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.shapes.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComplexSchemasShapesMutationOptions<TError>(clientOptions),
  })
}

export function getPostComplexSchemasDocumentsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.documents.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.documents.$post>
  >({
    mutationKey: ['complexSchemas', '/complexSchemas/documents', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.complexSchemas.documents.$post>) {
      return parseResponse(client.complexSchemas.documents.$post(args, options))
    },
  })
}

export function usePostComplexSchemasDocuments<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.documents.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.documents.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComplexSchemasDocumentsMutationOptions<TError>(clientOptions),
  })
}

export function getPostComplexSchemasConfigsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.configs.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.configs.$post>
  >({
    mutationKey: ['complexSchemas', '/complexSchemas/configs', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.complexSchemas.configs.$post>) {
      return parseResponse(client.complexSchemas.configs.$post(args, options))
    },
  })
}

export function usePostComplexSchemasConfigs<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.configs.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.complexSchemas.configs.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostComplexSchemasConfigsMutationOptions<TError>(clientOptions),
  })
}

export function getComplexSchemasNullableUnionQueryKey() {
  return ['complexSchemas', '/complexSchemas/nullable-union'] as const
}

export function getComplexSchemasNullableUnionQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getComplexSchemasNullableUnionQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.complexSchemas['nullable-union'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useComplexSchemasNullableUnion<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.complexSchemas)['nullable-union']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.complexSchemas)['nullable-union']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getComplexSchemasNullableUnionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.complexSchemas['nullable-union'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComplexSchemasNullableUnion<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.complexSchemas)['nullable-union']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.complexSchemas)['nullable-union']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getComplexSchemasNullableUnionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.complexSchemas['nullable-union'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getComplexSchemasNestedCircularQueryKey() {
  return ['complexSchemas', '/complexSchemas/nested-circular'] as const
}

export function getComplexSchemasNestedCircularQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getComplexSchemasNestedCircularQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.complexSchemas['nested-circular'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useComplexSchemasNestedCircular<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.complexSchemas)['nested-circular']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.complexSchemas)['nested-circular']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getComplexSchemasNestedCircularQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.complexSchemas['nested-circular'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComplexSchemasNestedCircular<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.complexSchemas)['nested-circular']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.complexSchemas)['nested-circular']['$get']>>
        >
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getComplexSchemasNestedCircularQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.complexSchemas['nested-circular'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostVendorExtensionsUsersMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.users.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.users.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.users.$post>) {
      return parseResponse(client.vendorExtensions.users.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsUsers<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.users.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsUsersMutationOptions<TError>(clientOptions),
  })
}

export function getVendorExtensionsUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.vendorExtensions.users)[':userId']['$get']>,
) {
  return ['vendorExtensions', '/vendorExtensions/users/:userId', args] as const
}

export function getVendorExtensionsUsersUserIdQueryOptions(
  args: InferRequestType<(typeof client.vendorExtensions.users)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getVendorExtensionsUsersUserIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.vendorExtensions.users[':userId'].$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useVendorExtensionsUsersUserId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.vendorExtensions.users)[':userId']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.vendorExtensions.users)[':userId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.vendorExtensions.users)[':userId']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getVendorExtensionsUsersUserIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.vendorExtensions.users[':userId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseVendorExtensionsUsersUserId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.vendorExtensions.users)[':userId']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.vendorExtensions.users)[':userId']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.vendorExtensions.users)[':userId']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getVendorExtensionsUsersUserIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.vendorExtensions.users[':userId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostVendorExtensionsPostsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.posts.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.posts.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/posts', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.posts.$post>) {
      return parseResponse(client.vendorExtensions.posts.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsPosts<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.posts.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.posts.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsPostsMutationOptions<TError>(clientOptions),
  })
}

export function getPostVendorExtensionsTransformsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.transforms.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.transforms.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/transforms', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.transforms.$post>) {
      return parseResponse(client.vendorExtensions.transforms.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsTransforms<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.transforms.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.transforms.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsTransformsMutationOptions<TError>(clientOptions),
  })
}

export function getPostVendorExtensionsCoerceMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.coerce.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.coerce.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/coerce', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.coerce.$post>) {
      return parseResponse(client.vendorExtensions.coerce.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsCoerce<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.coerce.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.coerce.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsCoerceMutationOptions<TError>(clientOptions),
  })
}

export function getPostVendorExtensionsReplacementsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.replacements.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.replacements.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/replacements', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.replacements.$post>) {
      return parseResponse(client.vendorExtensions.replacements.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsReplacements<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.replacements.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.replacements.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsReplacementsMutationOptions<TError>(clientOptions),
  })
}

export function getPostVendorExtensionsFormatsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.formats.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.formats.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/formats', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.formats.$post>) {
      return parseResponse(client.vendorExtensions.formats.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsFormats<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.formats.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.formats.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsFormatsMutationOptions<TError>(clientOptions),
  })
}

export function getPostVendorExtensionsCustomMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.custom.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.custom.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/custom', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.custom.$post>) {
      return parseResponse(client.vendorExtensions.custom.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsCustom<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.custom.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.custom.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsCustomMutationOptions<TError>(clientOptions),
  })
}

export function getPostVendorExtensionsMessagesMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.messages.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.messages.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/messages', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.messages.$post>) {
      return parseResponse(client.vendorExtensions.messages.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsMessages<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.messages.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.messages.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsMessagesMutationOptions<TError>(clientOptions),
  })
}

export function getPostVendorExtensionsCompositionMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.composition.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.composition.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/composition', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.composition.$post>) {
      return parseResponse(client.vendorExtensions.composition.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsComposition<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.composition.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.composition.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsCompositionMutationOptions<TError>(clientOptions),
  })
}

export function getPostVendorExtensionsConditionalMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.conditional.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.conditional.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/conditional', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.conditional.$post>) {
      return parseResponse(client.vendorExtensions.conditional.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsConditional<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.conditional.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.conditional.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsConditionalMutationOptions<TError>(clientOptions),
  })
}

export function getPostVendorExtensionsApplicatorsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.applicators.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.applicators.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/applicators', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.applicators.$post>) {
      return parseResponse(client.vendorExtensions.applicators.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsApplicators<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.applicators.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.applicators.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsApplicatorsMutationOptions<TError>(clientOptions),
  })
}

export function getPaginationItemsQueryKey(
  args: InferRequestType<typeof client.pagination.items.$get>,
) {
  return ['pagination', '/pagination/items', args] as const
}

export function getPaginationItemsQueryOptions(
  args: InferRequestType<typeof client.pagination.items.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPaginationItemsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.pagination.items.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function usePaginationItems<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.pagination.items.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPaginationItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.items.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspensePaginationItems<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.pagination.items.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getPaginationItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.items.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPaginationItemsInfiniteQueryKey(
  args: InferRequestType<typeof client.pagination.items.$get>,
) {
  return ['pagination', '/pagination/items', args, 'infinite'] as const
}

export function getPaginationItemsInfiniteQueryOptions<TPageParam = unknown>(
  args: InferRequestType<typeof client.pagination.items.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getPaginationItemsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.items.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfinitePaginationItems<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
    >
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.pagination.items.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
      >,
      TError,
      TData,
      ReturnType<typeof getPaginationItemsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getPaginationItemsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.items.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useSuspenseInfinitePaginationItems<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
    >
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.pagination.items.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
      >,
      TError,
      TData,
      ReturnType<typeof getPaginationItemsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    queryKey: getPaginationItemsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.items.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function getPaginationFeedsQueryKey() {
  return ['pagination', '/pagination/feeds'] as const
}

export function getPaginationFeedsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getPaginationFeedsQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.pagination.feeds.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function usePaginationFeeds<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPaginationFeedsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.feeds.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspensePaginationFeeds<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getPaginationFeedsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.feeds.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPaginationFeedsInfiniteQueryKey() {
  return ['pagination', '/pagination/feeds', 'infinite'] as const
}

export function getPaginationFeedsInfiniteQueryOptions<TPageParam = unknown>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getPaginationFeedsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.feeds.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfinitePaginationFeeds<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
    >
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
      >,
      TError,
      TData,
      ReturnType<typeof getPaginationFeedsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getPaginationFeedsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.feeds.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useSuspenseInfinitePaginationFeeds<
  TData = InfiniteData<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
    >
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
      >,
      TError,
      TData,
      ReturnType<typeof getPaginationFeedsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    queryKey: getPaginationFeedsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.feeds.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function getPaginationUsersUserIdPostsQueryKey(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
) {
  return ['pagination', '/pagination/users/:userId/posts', args] as const
}

export function getPaginationUsersUserIdPostsQueryOptions(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPaginationUsersUserIdPostsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function usePaginationUsersUserIdPosts<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPaginationUsersUserIdPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspensePaginationUsersUserIdPosts<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getPaginationUsersUserIdPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPaginationUsersUserIdPostsInfiniteQueryKey(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
) {
  return ['pagination', '/pagination/users/:userId/posts', args, 'infinite'] as const
}

export function getPaginationUsersUserIdPostsInfiniteQueryOptions<TPageParam = unknown>(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      allPages: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getPaginationUsersUserIdPostsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfinitePaginationUsersUserIdPosts<
  TData = InfiniteData<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
        >
      >
    >
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      allPages: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      TError,
      TData,
      ReturnType<typeof getPaginationUsersUserIdPostsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getPaginationUsersUserIdPostsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useSuspenseInfinitePaginationUsersUserIdPosts<
  TData = InfiniteData<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
        >
      >
    >
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      allPages: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      TError,
      TData,
      ReturnType<typeof getPaginationUsersUserIdPostsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    queryKey: getPaginationUsersUserIdPostsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

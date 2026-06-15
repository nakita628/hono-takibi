import { useQuery, useInfiniteQuery, useMutation } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
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
  return {
    queryKey: getMinimalHealthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.minimal.health.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  args: MaybeRefOrGetter<InferRequestType<typeof client.allExports.users.$get>>,
) {
  return ['allExports', '/allExports/users', args] as const
}

export function getAllExportsUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.allExports.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getAllExportsUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.allExports.users.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useAllExportsUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.allExports.users.$get>>>>
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.allExports.users.$get>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.allExports.users.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostAllExportsUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['allExports', '/allExports/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.allExports.users.$post>) {
      return parseResponse(client.allExports.users.$post(args, options))
    },
  }
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
    ...getPostAllExportsUsersMutationOptions(clientOptions),
  })
}

export function getAllExportsUsersIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.allExports.users)[':id']['$get']>>,
) {
  return ['allExports', '/allExports/users/:id', args] as const
}

export function getAllExportsUsersIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.allExports.users)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getAllExportsUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.allExports.users[':id'].$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useAllExportsUsersId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.allExports.users)[':id']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.allExports.users)[':id']['$get']>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.allExports.users[':id'].$get(toValue(args), {
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
  return {
    queryKey: getCircularRefsTreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.circularRefs.tree.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
      return parseResponse(
        client.circularRefs.tree.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostCircularRefsTreeMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['circularRefs', '/circularRefs/tree', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.circularRefs.tree.$post>) {
      return parseResponse(client.circularRefs.tree.$post(args, options))
    },
  }
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
    ...getPostCircularRefsTreeMutationOptions(clientOptions),
  })
}

export function getCircularRefsGraphQueryKey() {
  return ['circularRefs', '/circularRefs/graph'] as const
}

export function getCircularRefsGraphQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getCircularRefsGraphQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.circularRefs.graph.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getSecuritySchemesPublicQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes.public.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getSecuritySchemesBearerProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes['bearer-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getSecuritySchemesApiKeyProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes['api-key-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getSecuritySchemesBasicProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes['basic-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getSecuritySchemesOauthProtectedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes['oauth-protected'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getSecuritySchemesMultiAuthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.securitySchemes['multi-auth'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
      return parseResponse(
        client.securitySchemes['multi-auth'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostContentTypesJsonMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['contentTypes', '/contentTypes/json', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.contentTypes.json.$post>) {
      return parseResponse(client.contentTypes.json.$post(args, options))
    },
  }
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
    ...getPostContentTypesJsonMutationOptions(clientOptions),
  })
}

export function getPostContentTypesFormMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['contentTypes', '/contentTypes/form', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.contentTypes.form.$post>) {
      return parseResponse(client.contentTypes.form.$post(args, options))
    },
  }
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
    ...getPostContentTypesFormMutationOptions(clientOptions),
  })
}

export function getPostContentTypesUploadMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['contentTypes', '/contentTypes/upload', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.contentTypes.upload.$post>) {
      return parseResponse(client.contentTypes.upload.$post(args, options))
    },
  }
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
    ...getPostContentTypesUploadMutationOptions(clientOptions),
  })
}

export function getPostContentTypesTextMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['contentTypes', '/contentTypes/text', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.contentTypes.text.$post>) {
      return parseResponse(client.contentTypes.text.$post(args, options))
    },
  }
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
    ...getPostContentTypesTextMutationOptions(clientOptions),
  })
}

export function getPostContentTypesMultiContentMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['contentTypes', '/contentTypes/multi-content', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.contentTypes)['multi-content']['$post']>,
    ) {
      return parseResponse(client.contentTypes['multi-content'].$post(args, options))
    },
  }
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
    ...getPostContentTypesMultiContentMutationOptions(clientOptions),
  })
}

export function getParametersMergeItemsItemIdQueryKey(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$get']>
  >,
) {
  const { header: _, ...keyArgs } = toValue(args)
  return ['parametersMerge', '/parametersMerge/items/:itemId', keyArgs] as const
}

export function getParametersMergeItemsItemIdQueryOptions(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$get']>
  >,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getParametersMergeItemsItemIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.parametersMerge.items[':itemId'].$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$get']>
  >,
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
    queryFn({ signal }) {
      return parseResponse(
        client.parametersMerge.items[':itemId'].$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPutParametersMergeItemsItemIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['parametersMerge', '/parametersMerge/items/:itemId', 'PUT'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$put']>,
    ) {
      return parseResponse(client.parametersMerge.items[':itemId'].$put(args, options))
    },
  }
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
    ...getPutParametersMergeItemsItemIdMutationOptions(clientOptions),
  })
}

export function getDeleteParametersMergeItemsItemIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['parametersMerge', '/parametersMerge/items/:itemId', 'DELETE'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$delete']>,
    ) {
      return parseResponse(client.parametersMerge.items[':itemId'].$delete(args, options))
    },
  }
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
    ...getDeleteParametersMergeItemsItemIdMutationOptions(clientOptions),
  })
}

export function getParametersMergeItemsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.parametersMerge.items.$get>>,
) {
  return ['parametersMerge', '/parametersMerge/items', args] as const
}

export function getParametersMergeItemsQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.parametersMerge.items.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getParametersMergeItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.parametersMerge.items.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useParametersMergeItems<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.parametersMerge.items.$get>>>>
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.parametersMerge.items.$get>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.parametersMerge.items.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostSchemaEdgeCasesNullableMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['schemaEdgeCases', '/schemaEdgeCases/nullable', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.schemaEdgeCases.nullable.$post>) {
      return parseResponse(client.schemaEdgeCases.nullable.$post(args, options))
    },
  }
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
    ...getPostSchemaEdgeCasesNullableMutationOptions(clientOptions),
  })
}

export function getPostSchemaEdgeCasesDiscriminatedMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['schemaEdgeCases', '/schemaEdgeCases/discriminated', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.schemaEdgeCases.discriminated.$post>) {
      return parseResponse(client.schemaEdgeCases.discriminated.$post(args, options))
    },
  }
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
    ...getPostSchemaEdgeCasesDiscriminatedMutationOptions(clientOptions),
  })
}

export function getSchemaEdgeCasesComposedQueryKey() {
  return ['schemaEdgeCases', '/schemaEdgeCases/composed'] as const
}

export function getSchemaEdgeCasesComposedQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getSchemaEdgeCasesComposedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.schemaEdgeCases.composed.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getSchemaEdgeCasesDeepNestedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.schemaEdgeCases['deep-nested'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getSchemaEdgeCasesAdditionalPropsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.schemaEdgeCases['additional-props'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
      return parseResponse(
        client.schemaEdgeCases['additional-props'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostCallbacksLinksSubscriptionsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['callbacksLinks', '/callbacksLinks/subscriptions', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.callbacksLinks.subscriptions.$post>) {
      return parseResponse(client.callbacksLinks.subscriptions.$post(args, options))
    },
  }
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
    ...getPostCallbacksLinksSubscriptionsMutationOptions(clientOptions),
  })
}

export function getCallbacksLinksSubscriptionsIdQueryKey(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>
  >,
) {
  return ['callbacksLinks', '/callbacksLinks/subscriptions/:id', args] as const
}

export function getCallbacksLinksSubscriptionsIdQueryOptions(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>
  >,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getCallbacksLinksSubscriptionsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.callbacksLinks.subscriptions[':id'].$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>
  >,
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
    queryFn({ signal }) {
      return parseResponse(
        client.callbacksLinks.subscriptions[':id'].$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getDeleteCallbacksLinksSubscriptionsIdMutationOptions(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['callbacksLinks', '/callbacksLinks/subscriptions/:id', 'DELETE'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$delete']>,
    ) {
      return parseResponse(client.callbacksLinks.subscriptions[':id'].$delete(args, options))
    },
  }
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
    ...getDeleteCallbacksLinksSubscriptionsIdMutationOptions(clientOptions),
  })
}

export function getPostCallbacksLinksWebhooksTestMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['callbacksLinks', '/callbacksLinks/webhooks/test', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.callbacksLinks.webhooks.test.$post>) {
      return parseResponse(client.callbacksLinks.webhooks.test.$post(args, options))
    },
  }
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
    ...getPostCallbacksLinksWebhooksTestMutationOptions(clientOptions),
  })
}

export function getCrudRefsPostsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.crudRefs.posts.$get>>,
) {
  return ['crudRefs', '/crudRefs/posts', args] as const
}

export function getCrudRefsPostsQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.crudRefs.posts.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getCrudRefsPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.posts.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useCrudRefsPosts<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.posts.$get>>>>
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.crudRefs.posts.$get>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.crudRefs.posts.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostCrudRefsPostsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['crudRefs', '/crudRefs/posts', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.crudRefs.posts.$post>) {
      return parseResponse(client.crudRefs.posts.$post(args, options))
    },
  }
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
  return useMutation({ ...mutationOptions, ...getPostCrudRefsPostsMutationOptions(clientOptions) })
}

export function getCrudRefsPostsIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.crudRefs.posts)[':id']['$get']>>,
) {
  return ['crudRefs', '/crudRefs/posts/:id', args] as const
}

export function getCrudRefsPostsIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.crudRefs.posts)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getCrudRefsPostsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.posts[':id'].$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useCrudRefsPostsId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.crudRefs.posts)[':id']['$get']>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.crudRefs.posts[':id'].$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPutCrudRefsPostsIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['crudRefs', '/crudRefs/posts/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$put']>) {
      return parseResponse(client.crudRefs.posts[':id'].$put(args, options))
    },
  }
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
  return useMutation({ ...mutationOptions, ...getPutCrudRefsPostsIdMutationOptions(clientOptions) })
}

export function getDeleteCrudRefsPostsIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['crudRefs', '/crudRefs/posts/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$delete']>) {
      return parseResponse(client.crudRefs.posts[':id'].$delete(args, options))
    },
  }
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
    ...getDeleteCrudRefsPostsIdMutationOptions(clientOptions),
  })
}

export function getCrudRefsPostsIdCommentsQueryKey(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>
  >,
) {
  return ['crudRefs', '/crudRefs/posts/:id/comments', args] as const
}

export function getCrudRefsPostsIdCommentsQueryOptions(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>
  >,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getCrudRefsPostsIdCommentsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.posts[':id'].comments.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>
  >,
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
    queryFn({ signal }) {
      return parseResponse(
        client.crudRefs.posts[':id'].comments.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostCrudRefsPostsIdCommentsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['crudRefs', '/crudRefs/posts/:id/comments', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$post']>,
    ) {
      return parseResponse(client.crudRefs.posts[':id'].comments.$post(args, options))
    },
  }
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
    ...getPostCrudRefsPostsIdCommentsMutationOptions(clientOptions),
  })
}

export function getCrudRefsTagsQueryKey() {
  return ['crudRefs', '/crudRefs/tags'] as const
}

export function getCrudRefsTagsQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getCrudRefsTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.tags.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  args: MaybeRefOrGetter<InferRequestType<typeof client.comprehensive.users.$get>>,
) {
  return ['comprehensive', '/comprehensive/users', args] as const
}

export function getComprehensiveUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.comprehensive.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getComprehensiveUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.users.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useComprehensiveUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.users.$get>>>>
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.comprehensive.users.$get>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.users.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostComprehensiveUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['comprehensive', '/comprehensive/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.comprehensive.users.$post>) {
      return parseResponse(client.comprehensive.users.$post(args, options))
    },
  }
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
    ...getPostComprehensiveUsersMutationOptions(clientOptions),
  })
}

export function getComprehensiveUsersUserIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.comprehensive.users)[':userId']['$get']>>,
) {
  return ['comprehensive', '/comprehensive/users/:userId', args] as const
}

export function getComprehensiveUsersUserIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.comprehensive.users)[':userId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getComprehensiveUsersUserIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.users[':userId'].$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
  args: MaybeRefOrGetter<InferRequestType<(typeof client.comprehensive.users)[':userId']['$get']>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.users[':userId'].$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPutComprehensiveUsersUserIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['comprehensive', '/comprehensive/users/:userId', 'PUT'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$put']>,
    ) {
      return parseResponse(client.comprehensive.users[':userId'].$put(args, options))
    },
  }
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
    ...getPutComprehensiveUsersUserIdMutationOptions(clientOptions),
  })
}

export function getDeleteComprehensiveUsersUserIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['comprehensive', '/comprehensive/users/:userId', 'DELETE'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$delete']>,
    ) {
      return parseResponse(client.comprehensive.users[':userId'].$delete(args, options))
    },
  }
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
    ...getDeleteComprehensiveUsersUserIdMutationOptions(clientOptions),
  })
}

export function getComprehensiveProductsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.comprehensive.products.$get>>,
) {
  return ['comprehensive', '/comprehensive/products', args] as const
}

export function getComprehensiveProductsQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.comprehensive.products.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getComprehensiveProductsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.products.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useComprehensiveProducts<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.products.$get>>>>
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.comprehensive.products.$get>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.products.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostComprehensiveProductsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['comprehensive', '/comprehensive/products', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.comprehensive.products.$post>) {
      return parseResponse(client.comprehensive.products.$post(args, options))
    },
  }
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
    ...getPostComprehensiveProductsMutationOptions(clientOptions),
  })
}

export function getComprehensiveProductsProductIdQueryKey(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.comprehensive.products)[':productId']['$get']>
  >,
) {
  return ['comprehensive', '/comprehensive/products/:productId', args] as const
}

export function getComprehensiveProductsProductIdQueryOptions(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.comprehensive.products)[':productId']['$get']>
  >,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getComprehensiveProductsProductIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.products[':productId'].$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.comprehensive.products)[':productId']['$get']>
  >,
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
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.products[':productId'].$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPutComprehensiveProductsProductIdMutationOptions(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['comprehensive', '/comprehensive/products/:productId', 'PUT'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$put']>,
    ) {
      return parseResponse(client.comprehensive.products[':productId'].$put(args, options))
    },
  }
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
    ...getPutComprehensiveProductsProductIdMutationOptions(clientOptions),
  })
}

export function getComprehensiveProductsProductIdReviewsQueryKey(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>
  >,
) {
  return ['comprehensive', '/comprehensive/products/:productId/reviews', args] as const
}

export function getComprehensiveProductsProductIdReviewsQueryOptions(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>
  >,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getComprehensiveProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.products[':productId'].reviews.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>
  >,
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
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.products[':productId'].reviews.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostComprehensiveProductsProductIdReviewsMutationOptions(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['comprehensive', '/comprehensive/products/:productId/reviews', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<
        (typeof client.comprehensive.products)[':productId']['reviews']['$post']
      >,
    ) {
      return parseResponse(client.comprehensive.products[':productId'].reviews.$post(args, options))
    },
  }
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
    ...getPostComprehensiveProductsProductIdReviewsMutationOptions(clientOptions),
  })
}

export function getComprehensiveOrdersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.comprehensive.orders.$get>>,
) {
  return ['comprehensive', '/comprehensive/orders', args] as const
}

export function getComprehensiveOrdersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.comprehensive.orders.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getComprehensiveOrdersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.orders.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useComprehensiveOrders<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.orders.$get>>>>
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.comprehensive.orders.$get>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.orders.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostComprehensiveOrdersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['comprehensive', '/comprehensive/orders', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.comprehensive.orders.$post>) {
      return parseResponse(client.comprehensive.orders.$post(args, options))
    },
  }
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
    ...getPostComprehensiveOrdersMutationOptions(clientOptions),
  })
}

export function getComprehensiveOrdersOrderIdQueryKey(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.comprehensive.orders)[':orderId']['$get']>
  >,
) {
  return ['comprehensive', '/comprehensive/orders/:orderId', args] as const
}

export function getComprehensiveOrdersOrderIdQueryOptions(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.comprehensive.orders)[':orderId']['$get']>
  >,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getComprehensiveOrdersOrderIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.orders[':orderId'].$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.comprehensive.orders)[':orderId']['$get']>
  >,
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
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.orders[':orderId'].$get(toValue(args), {
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
  return {
    queryKey: getComprehensiveCategoriesQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.categories.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.categories.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostComprehensiveUploadImageMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['comprehensive', '/comprehensive/upload/image', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.comprehensive.upload.image.$post>) {
      return parseResponse(client.comprehensive.upload.image.$post(args, options))
    },
  }
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
    ...getPostComprehensiveUploadImageMutationOptions(clientOptions),
  })
}

export function getPostCompositionKeywordsOneOfMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['compositionKeywords', '/compositionKeywords/one-of', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.compositionKeywords)['one-of']['$post']>,
    ) {
      return parseResponse(client.compositionKeywords['one-of'].$post(args, options))
    },
  }
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
    ...getPostCompositionKeywordsOneOfMutationOptions(clientOptions),
  })
}

export function getPostCompositionKeywordsAnyOfMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['compositionKeywords', '/compositionKeywords/any-of', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.compositionKeywords)['any-of']['$post']>,
    ) {
      return parseResponse(client.compositionKeywords['any-of'].$post(args, options))
    },
  }
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
    ...getPostCompositionKeywordsAnyOfMutationOptions(clientOptions),
  })
}

export function getPostCompositionKeywordsAllOfMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['compositionKeywords', '/compositionKeywords/all-of', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.compositionKeywords)['all-of']['$post']>,
    ) {
      return parseResponse(client.compositionKeywords['all-of'].$post(args, options))
    },
  }
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
    ...getPostCompositionKeywordsAllOfMutationOptions(clientOptions),
  })
}

export function getPostCompositionKeywordsNotMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['compositionKeywords', '/compositionKeywords/not', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.compositionKeywords.not.$post>) {
      return parseResponse(client.compositionKeywords.not.$post(args, options))
    },
  }
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
    ...getPostCompositionKeywordsNotMutationOptions(clientOptions),
  })
}

export function getCompositionKeywordsNotRefQueryKey() {
  return ['compositionKeywords', '/compositionKeywords/not-ref'] as const
}

export function getCompositionKeywordsNotRefQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getCompositionKeywordsNotRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-ref'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getCompositionKeywordsNotEnumQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-enum'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getCompositionKeywordsNotConstQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-const'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getCompositionKeywordsNotCompositionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-composition'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getCompositionKeywordsAllOfSiblingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['all-of-sibling'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getCompositionKeywordsNullableOneOfQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['nullable-one-of'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getCompositionKeywordsAnyOfThreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['any-of-three'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getCompositionKeywordsAnyOfRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['any-of-ref'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
      return parseResponse(
        client.compositionKeywords['any-of-ref'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostCallbacksFieldOrdersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['callbacksField', '/callbacksField/orders', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.callbacksField.orders.$post>) {
      return parseResponse(client.callbacksField.orders.$post(args, options))
    },
  }
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
    ...getPostCallbacksFieldOrdersMutationOptions(clientOptions),
  })
}

export function getPostCallbacksFieldPaymentsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['callbacksField', '/callbacksField/payments', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.callbacksField.payments.$post>) {
      return parseResponse(client.callbacksField.payments.$post(args, options))
    },
  }
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
    ...getPostCallbacksFieldPaymentsMutationOptions(clientOptions),
  })
}

export function getCallbacksFieldItemsQueryKey() {
  return ['callbacksField', '/callbacksField/items'] as const
}

export function getCallbacksFieldItemsQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getCallbacksFieldItemsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.callbacksField.items.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getArrayObjectConstraintsTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.arrayObjectConstraints.tags.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
      return parseResponse(
        client.arrayObjectConstraints.tags.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostArrayObjectConstraintsTagsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['arrayObjectConstraints', '/arrayObjectConstraints/tags', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.arrayObjectConstraints.tags.$post>) {
      return parseResponse(client.arrayObjectConstraints.tags.$post(args, options))
    },
  }
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
    ...getPostArrayObjectConstraintsTagsMutationOptions(clientOptions),
  })
}

export function getArrayObjectConstraintsSettingsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.arrayObjectConstraints.settings.$get>>,
) {
  return ['arrayObjectConstraints', '/arrayObjectConstraints/settings', args] as const
}

export function getArrayObjectConstraintsSettingsQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.arrayObjectConstraints.settings.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getArrayObjectConstraintsSettingsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.arrayObjectConstraints.settings.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useArrayObjectConstraintsSettings<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.settings.$get>>>
    >
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.arrayObjectConstraints.settings.$get>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.arrayObjectConstraints.settings.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPutArrayObjectConstraintsSettingsMutationOptions(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['arrayObjectConstraints', '/arrayObjectConstraints/settings', 'PUT'] as const,
    async mutationFn(args: InferRequestType<typeof client.arrayObjectConstraints.settings.$put>) {
      return parseResponse(client.arrayObjectConstraints.settings.$put(args, options))
    },
  }
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
    ...getPutArrayObjectConstraintsSettingsMutationOptions(clientOptions),
  })
}

export function getPostArrayObjectConstraintsConfigMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['arrayObjectConstraints', '/arrayObjectConstraints/config', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.arrayObjectConstraints.config.$post>) {
      return parseResponse(client.arrayObjectConstraints.config.$post(args, options))
    },
  }
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
    ...getPostArrayObjectConstraintsConfigMutationOptions(clientOptions),
  })
}

export function getPostArrayObjectConstraintsPaymentMutationOptions(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['arrayObjectConstraints', '/arrayObjectConstraints/payment', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.arrayObjectConstraints.payment.$post>) {
      return parseResponse(client.arrayObjectConstraints.payment.$post(args, options))
    },
  }
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
    ...getPostArrayObjectConstraintsPaymentMutationOptions(clientOptions),
  })
}

export function getTrailingSlashApiReverseChibanIndexQueryKey() {
  return ['trailingSlash', '/trailingSlash/api/reverseChiban/'] as const
}

export function getTrailingSlashApiReverseChibanIndexQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getTrailingSlashApiReverseChibanIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.api.reverseChiban.index.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getTrailingSlashApiReverseChibanQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.api.reverseChiban.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  args: MaybeRefOrGetter<InferRequestType<typeof client.trailingSlash.posts.index.$get>>,
) {
  return ['trailingSlash', '/trailingSlash/posts/', args] as const
}

export function getTrailingSlashPostsIndexQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.trailingSlash.posts.index.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getTrailingSlashPostsIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.posts.index.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useTrailingSlashPostsIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.posts.index.$get>>>
    >
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.trailingSlash.posts.index.$get>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.trailingSlash.posts.index.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostTrailingSlashPostsIndexMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['trailingSlash', '/trailingSlash/posts/', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.trailingSlash.posts.index.$post>) {
      return parseResponse(client.trailingSlash.posts.index.$post(args, options))
    },
  }
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
    ...getPostTrailingSlashPostsIndexMutationOptions(clientOptions),
  })
}

export function getTrailingSlashUsersIdIndexQueryKey(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.trailingSlash.users)[':id']['index']['$get']>
  >,
) {
  return ['trailingSlash', '/trailingSlash/users/:id/', args] as const
}

export function getTrailingSlashUsersIdIndexQueryOptions(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.trailingSlash.users)[':id']['index']['$get']>
  >,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getTrailingSlashUsersIdIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.users[':id'].index.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.trailingSlash.users)[':id']['index']['$get']>
  >,
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
    queryFn({ signal }) {
      return parseResponse(
        client.trailingSlash.users[':id'].index.$get(toValue(args), {
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
  return {
    queryKey: getTrailingSlashItemsIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.items.index.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getReadonlyRefUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.readonlyRef.users.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
      return parseResponse(
        client.readonlyRef.users.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostReadonlyRefUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['readonlyRef', '/readonlyRef/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.readonlyRef.users.$post>) {
      return parseResponse(client.readonlyRef.users.$post(args, options))
    },
  }
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
    ...getPostReadonlyRefUsersMutationOptions(clientOptions),
  })
}

export function getReadonlyRefUsersIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.readonlyRef.users)[':id']['$get']>>,
) {
  return ['readonlyRef', '/readonlyRef/users/:id', args] as const
}

export function getReadonlyRefUsersIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.readonlyRef.users)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getReadonlyRefUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.readonlyRef.users[':id'].$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useReadonlyRefUsersId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.readonlyRef.users)[':id']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.readonlyRef.users)[':id']['$get']>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.readonlyRef.users[':id'].$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPutReadonlyRefUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['readonlyRef', '/readonlyRef/users/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.readonlyRef.users)[':id']['$put']>) {
      return parseResponse(client.readonlyRef.users[':id'].$put(args, options))
    },
  }
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
    ...getPutReadonlyRefUsersIdMutationOptions(clientOptions),
  })
}

export function getReadonlyRefItemsQueryKey() {
  return ['readonlyRef', '/readonlyRef/items'] as const
}

export function getReadonlyRefItemsQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getReadonlyRefItemsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.readonlyRef.items.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  args: MaybeRefOrGetter<
    InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>
  >,
) {
  return ['trailingSlashReal', '/trailingSlashReal/api/reverseGeocode/', args] as const
}

export function getTrailingSlashRealApiReverseGeocodeIndexQueryOptions(
  args: MaybeRefOrGetter<
    InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>
  >,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getTrailingSlashRealApiReverseGeocodeIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlashReal.api.reverseGeocode.index.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
  args: MaybeRefOrGetter<
    InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>
  >,
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
    queryFn({ signal }) {
      return parseResponse(
        client.trailingSlashReal.api.reverseGeocode.index.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndexMutationOptions(
  options?: ClientRequestOptions,
) {
  return {
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
  }
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
    ...getPostTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndexMutationOptions(
      clientOptions,
    ),
  })
}

export function getPostTrailingSlashRealApiV2PublicBookingAccountRegisterEmailMutationOptions(
  options?: ClientRequestOptions,
) {
  return {
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
  }
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
    ...getPostTrailingSlashRealApiV2PublicBookingAccountRegisterEmailMutationOptions(clientOptions),
  })
}

export function getPostDefaultResponseItemsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['defaultResponse', '/defaultResponse/items', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.defaultResponse.items.$post>) {
      return parseResponse(client.defaultResponse.items.$post(args, options))
    },
  }
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
    ...getPostDefaultResponseItemsMutationOptions(clientOptions),
  })
}

export function getDefaultResponsePingQueryKey() {
  return ['defaultResponse', '/defaultResponse/ping'] as const
}

export function getDefaultResponsePingQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getDefaultResponsePingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.defaultResponse.ping.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
      return parseResponse(
        client.defaultResponse.ping.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostComplexSchemasExpressionsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['complexSchemas', '/complexSchemas/expressions', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.complexSchemas.expressions.$post>) {
      return parseResponse(client.complexSchemas.expressions.$post(args, options))
    },
  }
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
    ...getPostComplexSchemasExpressionsMutationOptions(clientOptions),
  })
}

export function getPostComplexSchemasShapesMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['complexSchemas', '/complexSchemas/shapes', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.complexSchemas.shapes.$post>) {
      return parseResponse(client.complexSchemas.shapes.$post(args, options))
    },
  }
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
    ...getPostComplexSchemasShapesMutationOptions(clientOptions),
  })
}

export function getPostComplexSchemasDocumentsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['complexSchemas', '/complexSchemas/documents', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.complexSchemas.documents.$post>) {
      return parseResponse(client.complexSchemas.documents.$post(args, options))
    },
  }
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
    ...getPostComplexSchemasDocumentsMutationOptions(clientOptions),
  })
}

export function getPostComplexSchemasConfigsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['complexSchemas', '/complexSchemas/configs', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.complexSchemas.configs.$post>) {
      return parseResponse(client.complexSchemas.configs.$post(args, options))
    },
  }
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
    ...getPostComplexSchemasConfigsMutationOptions(clientOptions),
  })
}

export function getComplexSchemasNullableUnionQueryKey() {
  return ['complexSchemas', '/complexSchemas/nullable-union'] as const
}

export function getComplexSchemasNullableUnionQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getComplexSchemasNullableUnionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.complexSchemas['nullable-union'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
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
  return {
    queryKey: getComplexSchemasNestedCircularQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.complexSchemas['nested-circular'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
    queryFn({ signal }) {
      return parseResponse(
        client.complexSchemas['nested-circular'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostVendorExtensionsUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['vendorExtensions', '/vendorExtensions/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.users.$post>) {
      return parseResponse(client.vendorExtensions.users.$post(args, options))
    },
  }
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
    ...getPostVendorExtensionsUsersMutationOptions(clientOptions),
  })
}

export function getVendorExtensionsUsersUserIdQueryKey(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.vendorExtensions.users)[':userId']['$get']>
  >,
) {
  return ['vendorExtensions', '/vendorExtensions/users/:userId', args] as const
}

export function getVendorExtensionsUsersUserIdQueryOptions(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.vendorExtensions.users)[':userId']['$get']>
  >,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getVendorExtensionsUsersUserIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.vendorExtensions.users[':userId'].$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.vendorExtensions.users)[':userId']['$get']>
  >,
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
    queryFn({ signal }) {
      return parseResponse(
        client.vendorExtensions.users[':userId'].$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostVendorExtensionsPostsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['vendorExtensions', '/vendorExtensions/posts', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.posts.$post>) {
      return parseResponse(client.vendorExtensions.posts.$post(args, options))
    },
  }
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
    ...getPostVendorExtensionsPostsMutationOptions(clientOptions),
  })
}

export function getPostVendorExtensionsTransformsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['vendorExtensions', '/vendorExtensions/transforms', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.transforms.$post>) {
      return parseResponse(client.vendorExtensions.transforms.$post(args, options))
    },
  }
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
    ...getPostVendorExtensionsTransformsMutationOptions(clientOptions),
  })
}

export function getPostVendorExtensionsCoerceMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['vendorExtensions', '/vendorExtensions/coerce', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.coerce.$post>) {
      return parseResponse(client.vendorExtensions.coerce.$post(args, options))
    },
  }
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
    ...getPostVendorExtensionsCoerceMutationOptions(clientOptions),
  })
}

export function getPostVendorExtensionsReplacementsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['vendorExtensions', '/vendorExtensions/replacements', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.replacements.$post>) {
      return parseResponse(client.vendorExtensions.replacements.$post(args, options))
    },
  }
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
    ...getPostVendorExtensionsReplacementsMutationOptions(clientOptions),
  })
}

export function getPostVendorExtensionsFormatsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['vendorExtensions', '/vendorExtensions/formats', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.formats.$post>) {
      return parseResponse(client.vendorExtensions.formats.$post(args, options))
    },
  }
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
    ...getPostVendorExtensionsFormatsMutationOptions(clientOptions),
  })
}

export function getPostVendorExtensionsCustomMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['vendorExtensions', '/vendorExtensions/custom', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.custom.$post>) {
      return parseResponse(client.vendorExtensions.custom.$post(args, options))
    },
  }
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
    ...getPostVendorExtensionsCustomMutationOptions(clientOptions),
  })
}

export function getPostVendorExtensionsMessagesMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['vendorExtensions', '/vendorExtensions/messages', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.messages.$post>) {
      return parseResponse(client.vendorExtensions.messages.$post(args, options))
    },
  }
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
    ...getPostVendorExtensionsMessagesMutationOptions(clientOptions),
  })
}

export function getPostVendorExtensionsCompositionMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['vendorExtensions', '/vendorExtensions/composition', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.composition.$post>) {
      return parseResponse(client.vendorExtensions.composition.$post(args, options))
    },
  }
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
    ...getPostVendorExtensionsCompositionMutationOptions(clientOptions),
  })
}

export function getPostVendorExtensionsConditionalMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['vendorExtensions', '/vendorExtensions/conditional', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.conditional.$post>) {
      return parseResponse(client.vendorExtensions.conditional.$post(args, options))
    },
  }
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
    ...getPostVendorExtensionsConditionalMutationOptions(clientOptions),
  })
}

export function getPostVendorExtensionsApplicatorsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['vendorExtensions', '/vendorExtensions/applicators', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.applicators.$post>) {
      return parseResponse(client.vendorExtensions.applicators.$post(args, options))
    },
  }
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
    ...getPostVendorExtensionsApplicatorsMutationOptions(clientOptions),
  })
}

export function getPaginationItemsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.pagination.items.$get>>,
) {
  return ['pagination', '/pagination/items', args] as const
}

export function getPaginationItemsQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.pagination.items.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPaginationItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.items.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function usePaginationItems<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.pagination.items.$get>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.pagination.items.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPaginationItemsInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.pagination.items.$get>>,
) {
  return ['pagination', '/pagination/items', args, 'infinite'] as const
}

export function getPaginationItemsInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.pagination.items.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPaginationItemsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.items.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useInfinitePaginationItems<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.pagination.items.$get>>,
  options: {
    query: UseInfiniteQueryOptions<
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
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getPaginationItemsInfiniteQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.pagination.items.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPaginationFeedsQueryKey() {
  return ['pagination', '/pagination/feeds'] as const
}

export function getPaginationFeedsQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getPaginationFeedsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.feeds.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
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
    queryFn({ signal }) {
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

export function getPaginationFeedsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getPaginationFeedsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.feeds.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useInfinitePaginationFeeds<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(options: {
  query: UseInfiniteQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
    >,
    TError,
    TData,
    ReturnType<typeof getPaginationFeedsInfiniteQueryKey>,
    TPageParam
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getPaginationFeedsInfiniteQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.pagination.feeds.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPaginationUsersUserIdPostsQueryKey(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>
  >,
) {
  return ['pagination', '/pagination/users/:userId/posts', args] as const
}

export function getPaginationUsersUserIdPostsQueryOptions(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>
  >,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPaginationUsersUserIdPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
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
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>
  >,
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
    queryFn({ signal }) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPaginationUsersUserIdPostsInfiniteQueryKey(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>
  >,
) {
  return ['pagination', '/pagination/users/:userId/posts', args, 'infinite'] as const
}

export function getPaginationUsersUserIdPostsInfiniteQueryOptions(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>
  >,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPaginationUsersUserIdPostsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useInfinitePaginationUsersUserIdPosts<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
      >
    >
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>
  >,
  options: {
    query: UseInfiniteQueryOptions<
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
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getPaginationUsersUserIdPostsInfiniteQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

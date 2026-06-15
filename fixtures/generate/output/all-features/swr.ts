import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
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

export function getGetMinimalHealthKey() {
  return ['minimal', '/minimal/health'] as const
}

export function useGetMinimalHealth(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetMinimalHealthKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.minimal.health.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetMinimalHealth(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetMinimalHealthKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.minimal.health.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetAllExportsUsersKey(
  args: InferRequestType<typeof client.allExports.users.$get>,
) {
  return ['allExports', '/allExports/users', args] as const
}

export function useGetAllExportsUsers(
  args: InferRequestType<typeof client.allExports.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetAllExportsUsersKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.allExports.users.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAllExportsUsers(
  args: InferRequestType<typeof client.allExports.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetAllExportsUsersKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.allExports.users.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostAllExportsUsers<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.allExports.users.$post>>>>
    >,
    TError,
    Key,
    InferRequestType<typeof client.allExports.users.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['allExports', '/allExports/users', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.allExports.users.$post> }) =>
        parseResponse(client.allExports.users.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetAllExportsUsersIdKey(
  args: InferRequestType<(typeof client.allExports.users)[':id']['$get']>,
) {
  return ['allExports', '/allExports/users/:id', args] as const
}

export function useGetAllExportsUsersId(
  args: InferRequestType<(typeof client.allExports.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetAllExportsUsersIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.allExports.users[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAllExportsUsersId(
  args: InferRequestType<(typeof client.allExports.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetAllExportsUsersIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.allExports.users[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetCircularRefsTreeKey() {
  return ['circularRefs', '/circularRefs/tree'] as const
}

export function useGetCircularRefsTree(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCircularRefsTreeKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.circularRefs.tree.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCircularRefsTree(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCircularRefsTreeKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.circularRefs.tree.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostCircularRefsTree<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.circularRefs.tree.$post>>>>
    >,
    TError,
    Key,
    InferRequestType<typeof client.circularRefs.tree.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['circularRefs', '/circularRefs/tree', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.circularRefs.tree.$post> }) =>
        parseResponse(client.circularRefs.tree.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetCircularRefsGraphKey() {
  return ['circularRefs', '/circularRefs/graph'] as const
}

export function useGetCircularRefsGraph(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCircularRefsGraphKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.circularRefs.graph.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCircularRefsGraph(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCircularRefsGraphKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.circularRefs.graph.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetSecuritySchemesPublicKey() {
  return ['securitySchemes', '/securitySchemes/public'] as const
}

export function useGetSecuritySchemesPublic(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSecuritySchemesPublicKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.securitySchemes.public.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSecuritySchemesPublic(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSecuritySchemesPublicKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.securitySchemes.public.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetSecuritySchemesBearerProtectedKey() {
  return ['securitySchemes', '/securitySchemes/bearer-protected'] as const
}

export function useGetSecuritySchemesBearerProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSecuritySchemesBearerProtectedKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.securitySchemes['bearer-protected'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSecuritySchemesBearerProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSecuritySchemesBearerProtectedKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.securitySchemes['bearer-protected'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetSecuritySchemesApiKeyProtectedKey() {
  return ['securitySchemes', '/securitySchemes/api-key-protected'] as const
}

export function useGetSecuritySchemesApiKeyProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSecuritySchemesApiKeyProtectedKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.securitySchemes['api-key-protected'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSecuritySchemesApiKeyProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSecuritySchemesApiKeyProtectedKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.securitySchemes['api-key-protected'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetSecuritySchemesBasicProtectedKey() {
  return ['securitySchemes', '/securitySchemes/basic-protected'] as const
}

export function useGetSecuritySchemesBasicProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSecuritySchemesBasicProtectedKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.securitySchemes['basic-protected'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSecuritySchemesBasicProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSecuritySchemesBasicProtectedKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.securitySchemes['basic-protected'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetSecuritySchemesOauthProtectedKey() {
  return ['securitySchemes', '/securitySchemes/oauth-protected'] as const
}

export function useGetSecuritySchemesOauthProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSecuritySchemesOauthProtectedKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.securitySchemes['oauth-protected'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSecuritySchemesOauthProtected(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSecuritySchemesOauthProtectedKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.securitySchemes['oauth-protected'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetSecuritySchemesMultiAuthKey() {
  return ['securitySchemes', '/securitySchemes/multi-auth'] as const
}

export function useGetSecuritySchemesMultiAuth(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSecuritySchemesMultiAuthKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.securitySchemes['multi-auth'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSecuritySchemesMultiAuth(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSecuritySchemesMultiAuthKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.securitySchemes['multi-auth'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostContentTypesJson<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.json.$post>>>>
    >,
    TError,
    Key,
    InferRequestType<typeof client.contentTypes.json.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['contentTypes', '/contentTypes/json', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.contentTypes.json.$post> }) =>
        parseResponse(client.contentTypes.json.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostContentTypesForm<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.form.$post>>>>
    >,
    TError,
    Key,
    InferRequestType<typeof client.contentTypes.form.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['contentTypes', '/contentTypes/form', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.contentTypes.form.$post> }) =>
        parseResponse(client.contentTypes.form.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostContentTypesUpload<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.upload.$post>>>>
    >,
    TError,
    Key,
    InferRequestType<typeof client.contentTypes.upload.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['contentTypes', '/contentTypes/upload', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.contentTypes.upload.$post> }) =>
        parseResponse(client.contentTypes.upload.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostContentTypesText<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.text.$post>>>>
    >,
    TError,
    Key,
    InferRequestType<typeof client.contentTypes.text.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['contentTypes', '/contentTypes/text', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.contentTypes.text.$post> }) =>
        parseResponse(client.contentTypes.text.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostContentTypesMultiContent<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.contentTypes)['multi-content']['$post']>>
        >
      >
    >,
    TError,
    Key,
    InferRequestType<(typeof client.contentTypes)['multi-content']['$post']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['contentTypes', '/contentTypes/multi-content', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.contentTypes)['multi-content']['$post']> },
      ) => parseResponse(client.contentTypes['multi-content'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetParametersMergeItemsItemIdKey(
  args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$get']>,
) {
  const { header: _, ...keyArgs } = args
  return ['parametersMerge', '/parametersMerge/items/:itemId', keyArgs] as const
}

export function useGetParametersMergeItemsItemId(
  args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetParametersMergeItemsItemIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.parametersMerge.items[':itemId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetParametersMergeItemsItemId(
  args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetParametersMergeItemsItemIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.parametersMerge.items[':itemId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePutParametersMergeItemsItemId<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.parametersMerge.items)[':itemId']['$put']>>
        >
      >
    >,
    TError,
    Key,
    InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$put']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['parametersMerge', '/parametersMerge/items/:itemId', 'PUT'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$put']> },
      ) => parseResponse(client.parametersMerge.items[':itemId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function useDeleteParametersMergeItemsItemId<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.parametersMerge.items)[':itemId']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    Key,
    InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$delete']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['parametersMerge', '/parametersMerge/items/:itemId', 'DELETE'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$delete']> },
      ) => parseResponse(client.parametersMerge.items[':itemId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetParametersMergeItemsKey(
  args: InferRequestType<typeof client.parametersMerge.items.$get>,
) {
  return ['parametersMerge', '/parametersMerge/items', args] as const
}

export function useGetParametersMergeItems(
  args: InferRequestType<typeof client.parametersMerge.items.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetParametersMergeItemsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.parametersMerge.items.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetParametersMergeItems(
  args: InferRequestType<typeof client.parametersMerge.items.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetParametersMergeItemsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.parametersMerge.items.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostSchemaEdgeCasesNullable<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.nullable.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.schemaEdgeCases.nullable.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['schemaEdgeCases', '/schemaEdgeCases/nullable', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.schemaEdgeCases.nullable.$post> },
      ) => parseResponse(client.schemaEdgeCases.nullable.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostSchemaEdgeCasesDiscriminated<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.discriminated.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.schemaEdgeCases.discriminated.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['schemaEdgeCases', '/schemaEdgeCases/discriminated', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.schemaEdgeCases.discriminated.$post> },
      ) => parseResponse(client.schemaEdgeCases.discriminated.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetSchemaEdgeCasesComposedKey() {
  return ['schemaEdgeCases', '/schemaEdgeCases/composed'] as const
}

export function useGetSchemaEdgeCasesComposed(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSchemaEdgeCasesComposedKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.schemaEdgeCases.composed.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSchemaEdgeCasesComposed(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSchemaEdgeCasesComposedKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.schemaEdgeCases.composed.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetSchemaEdgeCasesDeepNestedKey() {
  return ['schemaEdgeCases', '/schemaEdgeCases/deep-nested'] as const
}

export function useGetSchemaEdgeCasesDeepNested(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSchemaEdgeCasesDeepNestedKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.schemaEdgeCases['deep-nested'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSchemaEdgeCasesDeepNested(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSchemaEdgeCasesDeepNestedKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.schemaEdgeCases['deep-nested'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetSchemaEdgeCasesAdditionalPropsKey() {
  return ['schemaEdgeCases', '/schemaEdgeCases/additional-props'] as const
}

export function useGetSchemaEdgeCasesAdditionalProps(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSchemaEdgeCasesAdditionalPropsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.schemaEdgeCases['additional-props'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSchemaEdgeCasesAdditionalProps(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSchemaEdgeCasesAdditionalPropsKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.schemaEdgeCases['additional-props'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostCallbacksLinksSubscriptions<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksLinks.subscriptions.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.callbacksLinks.subscriptions.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['callbacksLinks', '/callbacksLinks/subscriptions', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.callbacksLinks.subscriptions.$post> },
      ) => parseResponse(client.callbacksLinks.subscriptions.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetCallbacksLinksSubscriptionsIdKey(
  args: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>,
) {
  return ['callbacksLinks', '/callbacksLinks/subscriptions/:id', args] as const
}

export function useGetCallbacksLinksSubscriptionsId(
  args: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetCallbacksLinksSubscriptionsIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.callbacksLinks.subscriptions[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCallbacksLinksSubscriptionsId(
  args: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetCallbacksLinksSubscriptionsIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.callbacksLinks.subscriptions[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useDeleteCallbacksLinksSubscriptionsId<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.callbacksLinks.subscriptions)[':id']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    Key,
    InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$delete']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['callbacksLinks', '/callbacksLinks/subscriptions/:id', 'DELETE'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$delete']>
        },
      ) => parseResponse(client.callbacksLinks.subscriptions[':id'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostCallbacksLinksWebhooksTest<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksLinks.webhooks.test.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.callbacksLinks.webhooks.test.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['callbacksLinks', '/callbacksLinks/webhooks/test', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.callbacksLinks.webhooks.test.$post> },
      ) => parseResponse(client.callbacksLinks.webhooks.test.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetCrudRefsPostsKey(args: InferRequestType<typeof client.crudRefs.posts.$get>) {
  return ['crudRefs', '/crudRefs/posts', args] as const
}

export function useGetCrudRefsPosts(
  args: InferRequestType<typeof client.crudRefs.posts.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCrudRefsPostsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.crudRefs.posts.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCrudRefsPosts(
  args: InferRequestType<typeof client.crudRefs.posts.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCrudRefsPostsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.crudRefs.posts.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostCrudRefsPosts<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.posts.$post>>>>
    >,
    TError,
    Key,
    InferRequestType<typeof client.crudRefs.posts.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['crudRefs', '/crudRefs/posts', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.crudRefs.posts.$post> }) =>
        parseResponse(client.crudRefs.posts.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetCrudRefsPostsIdKey(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$get']>,
) {
  return ['crudRefs', '/crudRefs/posts/:id', args] as const
}

export function useGetCrudRefsPostsId(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCrudRefsPostsIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.crudRefs.posts[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCrudRefsPostsId(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCrudRefsPostsIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.crudRefs.posts[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePutCrudRefsPostsId<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['$put']>>>
      >
    >,
    TError,
    Key,
    InferRequestType<(typeof client.crudRefs.posts)[':id']['$put']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['crudRefs', '/crudRefs/posts/:id', 'PUT'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.crudRefs.posts)[':id']['$put']> },
      ) => parseResponse(client.crudRefs.posts[':id'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function useDeleteCrudRefsPostsId<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    Key,
    InferRequestType<(typeof client.crudRefs.posts)[':id']['$delete']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['crudRefs', '/crudRefs/posts/:id', 'DELETE'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.crudRefs.posts)[':id']['$delete']> },
      ) => parseResponse(client.crudRefs.posts[':id'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetCrudRefsPostsIdCommentsKey(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>,
) {
  return ['crudRefs', '/crudRefs/posts/:id/comments', args] as const
}

export function useGetCrudRefsPostsIdComments(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCrudRefsPostsIdCommentsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.crudRefs.posts[':id'].comments.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCrudRefsPostsIdComments(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCrudRefsPostsIdCommentsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.crudRefs.posts[':id'].comments.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostCrudRefsPostsIdComments<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['comments']['$post']>>
        >
      >
    >,
    TError,
    Key,
    InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$post']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['crudRefs', '/crudRefs/posts/:id/comments', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$post']> },
      ) => parseResponse(client.crudRefs.posts[':id'].comments.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetCrudRefsTagsKey() {
  return ['crudRefs', '/crudRefs/tags'] as const
}

export function useGetCrudRefsTags(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCrudRefsTagsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.crudRefs.tags.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCrudRefsTags(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCrudRefsTagsKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.crudRefs.tags.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetComprehensiveUsersKey(
  args: InferRequestType<typeof client.comprehensive.users.$get>,
) {
  return ['comprehensive', '/comprehensive/users', args] as const
}

export function useGetComprehensiveUsers(
  args: InferRequestType<typeof client.comprehensive.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveUsersKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.comprehensive.users.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetComprehensiveUsers(
  args: InferRequestType<typeof client.comprehensive.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveUsersKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.comprehensive.users.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostComprehensiveUsers<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.users.$post>>>>
    >,
    TError,
    Key,
    InferRequestType<typeof client.comprehensive.users.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['comprehensive', '/comprehensive/users', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.comprehensive.users.$post> }) =>
        parseResponse(client.comprehensive.users.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetComprehensiveUsersUserIdKey(
  args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$get']>,
) {
  return ['comprehensive', '/comprehensive/users/:userId', args] as const
}

export function useGetComprehensiveUsersUserId(
  args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveUsersUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.comprehensive.users[':userId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetComprehensiveUsersUserId(
  args: InferRequestType<(typeof client.comprehensive.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveUsersUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.comprehensive.users[':userId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePutComprehensiveUsersUserId<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.comprehensive.users)[':userId']['$put']>>
        >
      >
    >,
    TError,
    Key,
    InferRequestType<(typeof client.comprehensive.users)[':userId']['$put']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['comprehensive', '/comprehensive/users/:userId', 'PUT'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.comprehensive.users)[':userId']['$put']> },
      ) => parseResponse(client.comprehensive.users[':userId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function useDeleteComprehensiveUsersUserId<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comprehensive.users)[':userId']['$delete']>>
          >
        >
      >
    | undefined,
    TError,
    Key,
    InferRequestType<(typeof client.comprehensive.users)[':userId']['$delete']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['comprehensive', '/comprehensive/users/:userId', 'DELETE'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.comprehensive.users)[':userId']['$delete']> },
      ) => parseResponse(client.comprehensive.users[':userId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetComprehensiveProductsKey(
  args: InferRequestType<typeof client.comprehensive.products.$get>,
) {
  return ['comprehensive', '/comprehensive/products', args] as const
}

export function useGetComprehensiveProducts(
  args: InferRequestType<typeof client.comprehensive.products.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveProductsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.comprehensive.products.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetComprehensiveProducts(
  args: InferRequestType<typeof client.comprehensive.products.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveProductsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.comprehensive.products.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostComprehensiveProducts<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.products.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.comprehensive.products.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['comprehensive', '/comprehensive/products', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.comprehensive.products.$post> },
      ) => parseResponse(client.comprehensive.products.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetComprehensiveProductsProductIdKey(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$get']>,
) {
  return ['comprehensive', '/comprehensive/products/:productId', args] as const
}

export function useGetComprehensiveProductsProductId(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetComprehensiveProductsProductIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.comprehensive.products[':productId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetComprehensiveProductsProductId(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetComprehensiveProductsProductIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.comprehensive.products[':productId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePutComprehensiveProductsProductId<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.comprehensive.products)[':productId']['$put']>>
        >
      >
    >,
    TError,
    Key,
    InferRequestType<(typeof client.comprehensive.products)[':productId']['$put']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['comprehensive', '/comprehensive/products/:productId', 'PUT'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.comprehensive.products)[':productId']['$put']> },
      ) => parseResponse(client.comprehensive.products[':productId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetComprehensiveProductsProductIdReviewsKey(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>,
) {
  return ['comprehensive', '/comprehensive/products/:productId/reviews', args] as const
}

export function useGetComprehensiveProductsProductIdReviews(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetComprehensiveProductsProductIdReviewsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.comprehensive.products[':productId'].reviews.$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetComprehensiveProductsProductIdReviews(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetComprehensiveProductsProductIdReviewsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(
          client.comprehensive.products[':productId'].reviews.$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

export function usePostComprehensiveProductsProductIdReviews<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.comprehensive.products)[':productId']['reviews']['$post']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['comprehensive', '/comprehensive/products/:productId/reviews', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.comprehensive.products)[':productId']['reviews']['$post']
          >
        },
      ) =>
        parseResponse(
          client.comprehensive.products[':productId'].reviews.$post(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

export function getGetComprehensiveOrdersKey(
  args: InferRequestType<typeof client.comprehensive.orders.$get>,
) {
  return ['comprehensive', '/comprehensive/orders', args] as const
}

export function useGetComprehensiveOrders(
  args: InferRequestType<typeof client.comprehensive.orders.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveOrdersKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.comprehensive.orders.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetComprehensiveOrders(
  args: InferRequestType<typeof client.comprehensive.orders.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveOrdersKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.comprehensive.orders.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostComprehensiveOrders<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.orders.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.comprehensive.orders.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['comprehensive', '/comprehensive/orders', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.comprehensive.orders.$post> },
      ) => parseResponse(client.comprehensive.orders.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetComprehensiveOrdersOrderIdKey(
  args: InferRequestType<(typeof client.comprehensive.orders)[':orderId']['$get']>,
) {
  return ['comprehensive', '/comprehensive/orders/:orderId', args] as const
}

export function useGetComprehensiveOrdersOrderId(
  args: InferRequestType<(typeof client.comprehensive.orders)[':orderId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveOrdersOrderIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.comprehensive.orders[':orderId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetComprehensiveOrdersOrderId(
  args: InferRequestType<(typeof client.comprehensive.orders)[':orderId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveOrdersOrderIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.comprehensive.orders[':orderId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetComprehensiveCategoriesKey() {
  return ['comprehensive', '/comprehensive/categories'] as const
}

export function useGetComprehensiveCategories(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveCategoriesKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.comprehensive.categories.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetComprehensiveCategories(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComprehensiveCategoriesKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.comprehensive.categories.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostComprehensiveUploadImage<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.upload.image.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.comprehensive.upload.image.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['comprehensive', '/comprehensive/upload/image', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.comprehensive.upload.image.$post> },
      ) => parseResponse(client.comprehensive.upload.image.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostCompositionKeywordsOneOf<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['one-of']['$post']>>
        >
      >
    >,
    TError,
    Key,
    InferRequestType<(typeof client.compositionKeywords)['one-of']['$post']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['compositionKeywords', '/compositionKeywords/one-of', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.compositionKeywords)['one-of']['$post']> },
      ) => parseResponse(client.compositionKeywords['one-of'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostCompositionKeywordsAnyOf<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['any-of']['$post']>>
        >
      >
    >,
    TError,
    Key,
    InferRequestType<(typeof client.compositionKeywords)['any-of']['$post']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['compositionKeywords', '/compositionKeywords/any-of', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.compositionKeywords)['any-of']['$post']> },
      ) => parseResponse(client.compositionKeywords['any-of'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostCompositionKeywordsAllOf<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['all-of']['$post']>>
        >
      >
    >,
    TError,
    Key,
    InferRequestType<(typeof client.compositionKeywords)['all-of']['$post']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['compositionKeywords', '/compositionKeywords/all-of', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.compositionKeywords)['all-of']['$post']> },
      ) => parseResponse(client.compositionKeywords['all-of'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostCompositionKeywordsNot<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.compositionKeywords.not.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.compositionKeywords.not.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['compositionKeywords', '/compositionKeywords/not', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.compositionKeywords.not.$post> },
      ) => parseResponse(client.compositionKeywords.not.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetCompositionKeywordsNotRefKey() {
  return ['compositionKeywords', '/compositionKeywords/not-ref'] as const
}

export function useGetCompositionKeywordsNotRef(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCompositionKeywordsNotRefKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['not-ref'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCompositionKeywordsNotRef(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCompositionKeywordsNotRefKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['not-ref'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetCompositionKeywordsNotEnumKey() {
  return ['compositionKeywords', '/compositionKeywords/not-enum'] as const
}

export function useGetCompositionKeywordsNotEnum(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCompositionKeywordsNotEnumKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['not-enum'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCompositionKeywordsNotEnum(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCompositionKeywordsNotEnumKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['not-enum'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetCompositionKeywordsNotConstKey() {
  return ['compositionKeywords', '/compositionKeywords/not-const'] as const
}

export function useGetCompositionKeywordsNotConst(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCompositionKeywordsNotConstKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['not-const'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCompositionKeywordsNotConst(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCompositionKeywordsNotConstKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['not-const'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetCompositionKeywordsNotCompositionKey() {
  return ['compositionKeywords', '/compositionKeywords/not-composition'] as const
}

export function useGetCompositionKeywordsNotComposition(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetCompositionKeywordsNotCompositionKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['not-composition'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCompositionKeywordsNotComposition(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetCompositionKeywordsNotCompositionKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['not-composition'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetCompositionKeywordsAllOfSiblingKey() {
  return ['compositionKeywords', '/compositionKeywords/all-of-sibling'] as const
}

export function useGetCompositionKeywordsAllOfSibling(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetCompositionKeywordsAllOfSiblingKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['all-of-sibling'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCompositionKeywordsAllOfSibling(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetCompositionKeywordsAllOfSiblingKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['all-of-sibling'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetCompositionKeywordsNullableOneOfKey() {
  return ['compositionKeywords', '/compositionKeywords/nullable-one-of'] as const
}

export function useGetCompositionKeywordsNullableOneOf(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetCompositionKeywordsNullableOneOfKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['nullable-one-of'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCompositionKeywordsNullableOneOf(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetCompositionKeywordsNullableOneOfKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['nullable-one-of'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetCompositionKeywordsAnyOfThreeKey() {
  return ['compositionKeywords', '/compositionKeywords/any-of-three'] as const
}

export function useGetCompositionKeywordsAnyOfThree(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCompositionKeywordsAnyOfThreeKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['any-of-three'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCompositionKeywordsAnyOfThree(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCompositionKeywordsAnyOfThreeKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['any-of-three'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetCompositionKeywordsAnyOfRefKey() {
  return ['compositionKeywords', '/compositionKeywords/any-of-ref'] as const
}

export function useGetCompositionKeywordsAnyOfRef(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCompositionKeywordsAnyOfRefKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['any-of-ref'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCompositionKeywordsAnyOfRef(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCompositionKeywordsAnyOfRefKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.compositionKeywords['any-of-ref'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostCallbacksFieldOrders<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksField.orders.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.callbacksField.orders.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['callbacksField', '/callbacksField/orders', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.callbacksField.orders.$post> },
      ) => parseResponse(client.callbacksField.orders.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostCallbacksFieldPayments<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.callbacksField.payments.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.callbacksField.payments.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['callbacksField', '/callbacksField/payments', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.callbacksField.payments.$post> },
      ) => parseResponse(client.callbacksField.payments.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetCallbacksFieldItemsKey() {
  return ['callbacksField', '/callbacksField/items'] as const
}

export function useGetCallbacksFieldItems(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCallbacksFieldItemsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.callbacksField.items.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCallbacksFieldItems(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCallbacksFieldItemsKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.callbacksField.items.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetArrayObjectConstraintsTagsKey() {
  return ['arrayObjectConstraints', '/arrayObjectConstraints/tags'] as const
}

export function useGetArrayObjectConstraintsTags(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetArrayObjectConstraintsTagsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.arrayObjectConstraints.tags.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetArrayObjectConstraintsTags(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetArrayObjectConstraintsTagsKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.arrayObjectConstraints.tags.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostArrayObjectConstraintsTags<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.tags.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.arrayObjectConstraints.tags.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['arrayObjectConstraints', '/arrayObjectConstraints/tags', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.arrayObjectConstraints.tags.$post> },
      ) => parseResponse(client.arrayObjectConstraints.tags.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetArrayObjectConstraintsSettingsKey(
  args: InferRequestType<typeof client.arrayObjectConstraints.settings.$get>,
) {
  return ['arrayObjectConstraints', '/arrayObjectConstraints/settings', args] as const
}

export function useGetArrayObjectConstraintsSettings(
  args: InferRequestType<typeof client.arrayObjectConstraints.settings.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetArrayObjectConstraintsSettingsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.arrayObjectConstraints.settings.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetArrayObjectConstraintsSettings(
  args: InferRequestType<typeof client.arrayObjectConstraints.settings.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetArrayObjectConstraintsSettingsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.arrayObjectConstraints.settings.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePutArrayObjectConstraintsSettings<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.arrayObjectConstraints.settings.$put>>
        >
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.arrayObjectConstraints.settings.$put>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['arrayObjectConstraints', '/arrayObjectConstraints/settings', 'PUT'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.arrayObjectConstraints.settings.$put> },
      ) => parseResponse(client.arrayObjectConstraints.settings.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostArrayObjectConstraintsConfig<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.config.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.arrayObjectConstraints.config.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['arrayObjectConstraints', '/arrayObjectConstraints/config', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.arrayObjectConstraints.config.$post> },
      ) => parseResponse(client.arrayObjectConstraints.config.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostArrayObjectConstraintsPayment<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<typeof client.arrayObjectConstraints.payment.$post>>
        >
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.arrayObjectConstraints.payment.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['arrayObjectConstraints', '/arrayObjectConstraints/payment', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.arrayObjectConstraints.payment.$post> },
      ) => parseResponse(client.arrayObjectConstraints.payment.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetTrailingSlashApiReverseChibanIndexKey() {
  return ['trailingSlash', '/trailingSlash/api/reverseChiban/'] as const
}

export function useGetTrailingSlashApiReverseChibanIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetTrailingSlashApiReverseChibanIndexKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.trailingSlash.api.reverseChiban.index.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetTrailingSlashApiReverseChibanIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetTrailingSlashApiReverseChibanIndexKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.trailingSlash.api.reverseChiban.index.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetTrailingSlashApiReverseChibanKey() {
  return ['trailingSlash', '/trailingSlash/api/reverseChiban'] as const
}

export function useGetTrailingSlashApiReverseChiban(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTrailingSlashApiReverseChibanKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.trailingSlash.api.reverseChiban.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetTrailingSlashApiReverseChiban(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTrailingSlashApiReverseChibanKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.trailingSlash.api.reverseChiban.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetTrailingSlashPostsIndexKey(
  args: InferRequestType<typeof client.trailingSlash.posts.index.$get>,
) {
  return ['trailingSlash', '/trailingSlash/posts/', args] as const
}

export function useGetTrailingSlashPostsIndex(
  args: InferRequestType<typeof client.trailingSlash.posts.index.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTrailingSlashPostsIndexKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.trailingSlash.posts.index.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetTrailingSlashPostsIndex(
  args: InferRequestType<typeof client.trailingSlash.posts.index.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTrailingSlashPostsIndexKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.trailingSlash.posts.index.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostTrailingSlashPostsIndex<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.posts.index.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.trailingSlash.posts.index.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['trailingSlash', '/trailingSlash/posts/', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.trailingSlash.posts.index.$post> },
      ) => parseResponse(client.trailingSlash.posts.index.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetTrailingSlashUsersIdIndexKey(
  args: InferRequestType<(typeof client.trailingSlash.users)[':id']['index']['$get']>,
) {
  return ['trailingSlash', '/trailingSlash/users/:id/', args] as const
}

export function useGetTrailingSlashUsersIdIndex(
  args: InferRequestType<(typeof client.trailingSlash.users)[':id']['index']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTrailingSlashUsersIdIndexKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.trailingSlash.users[':id'].index.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetTrailingSlashUsersIdIndex(
  args: InferRequestType<(typeof client.trailingSlash.users)[':id']['index']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTrailingSlashUsersIdIndexKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.trailingSlash.users[':id'].index.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetTrailingSlashItemsIndexKey() {
  return ['trailingSlash', '/trailingSlash/items/'] as const
}

export function useGetTrailingSlashItemsIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTrailingSlashItemsIndexKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.trailingSlash.items.index.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetTrailingSlashItemsIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTrailingSlashItemsIndexKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.trailingSlash.items.index.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetReadonlyRefUsersKey() {
  return ['readonlyRef', '/readonlyRef/users'] as const
}

export function useGetReadonlyRefUsers(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetReadonlyRefUsersKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.readonlyRef.users.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetReadonlyRefUsers(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetReadonlyRefUsersKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.readonlyRef.users.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostReadonlyRefUsers<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.users.$post>>>>
    >,
    TError,
    Key,
    InferRequestType<typeof client.readonlyRef.users.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['readonlyRef', '/readonlyRef/users', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.readonlyRef.users.$post> }) =>
        parseResponse(client.readonlyRef.users.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetReadonlyRefUsersIdKey(
  args: InferRequestType<(typeof client.readonlyRef.users)[':id']['$get']>,
) {
  return ['readonlyRef', '/readonlyRef/users/:id', args] as const
}

export function useGetReadonlyRefUsersId(
  args: InferRequestType<(typeof client.readonlyRef.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetReadonlyRefUsersIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.readonlyRef.users[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetReadonlyRefUsersId(
  args: InferRequestType<(typeof client.readonlyRef.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetReadonlyRefUsersIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.readonlyRef.users[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePutReadonlyRefUsersId<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.readonlyRef.users)[':id']['$put']>>>
      >
    >,
    TError,
    Key,
    InferRequestType<(typeof client.readonlyRef.users)[':id']['$put']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['readonlyRef', '/readonlyRef/users/:id', 'PUT'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.readonlyRef.users)[':id']['$put']> },
      ) => parseResponse(client.readonlyRef.users[':id'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetReadonlyRefItemsKey() {
  return ['readonlyRef', '/readonlyRef/items'] as const
}

export function useGetReadonlyRefItems(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetReadonlyRefItemsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.readonlyRef.items.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetReadonlyRefItems(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetReadonlyRefItemsKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.readonlyRef.items.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetTrailingSlashRealApiReverseGeocodeIndexKey(
  args: InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>,
) {
  return ['trailingSlashReal', '/trailingSlashReal/api/reverseGeocode/', args] as const
}

export function useGetTrailingSlashRealApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetTrailingSlashRealApiReverseGeocodeIndexKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.trailingSlashReal.api.reverseGeocode.index.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetTrailingSlashRealApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.trailingSlashReal.api.reverseGeocode.index.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetTrailingSlashRealApiReverseGeocodeIndexKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.trailingSlashReal.api.reverseGeocode.index.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostTrailingSlashRealApiV2PublicBookingAccountRegisterOauthIndex<
  TError = unknown,
>(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      typeof client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post
    >
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    ([
      'trailingSlashReal',
      '/trailingSlashReal/api/v2/public/booking/account/register/oauth/',
      'POST',
    ] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            typeof client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post
          >
        },
      ) =>
        parseResponse(
          client.trailingSlashReal.api.v2.public.booking.account.register.oauth.index.$post(
            arg,
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

export function usePostTrailingSlashRealApiV2PublicBookingAccountRegisterEmail<
  TError = unknown,
>(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      typeof client.trailingSlashReal.api.v2.public.booking.account.register.email.$post
    >
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    ([
      'trailingSlashReal',
      '/trailingSlashReal/api/v2/public/booking/account/register/email',
      'POST',
    ] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            typeof client.trailingSlashReal.api.v2.public.booking.account.register.email.$post
          >
        },
      ) =>
        parseResponse(
          client.trailingSlashReal.api.v2.public.booking.account.register.email.$post(
            arg,
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

export function usePostDefaultResponseItems<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.defaultResponse.items.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.defaultResponse.items.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['defaultResponse', '/defaultResponse/items', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.defaultResponse.items.$post> },
      ) => parseResponse(client.defaultResponse.items.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetDefaultResponsePingKey() {
  return ['defaultResponse', '/defaultResponse/ping'] as const
}

export function useGetDefaultResponsePing(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetDefaultResponsePingKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.defaultResponse.ping.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetDefaultResponsePing(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetDefaultResponsePingKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.defaultResponse.ping.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostComplexSchemasExpressions<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.expressions.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.complexSchemas.expressions.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['complexSchemas', '/complexSchemas/expressions', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.complexSchemas.expressions.$post> },
      ) => parseResponse(client.complexSchemas.expressions.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostComplexSchemasShapes<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.shapes.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.complexSchemas.shapes.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['complexSchemas', '/complexSchemas/shapes', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.complexSchemas.shapes.$post> },
      ) => parseResponse(client.complexSchemas.shapes.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostComplexSchemasDocuments<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.documents.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.complexSchemas.documents.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['complexSchemas', '/complexSchemas/documents', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.complexSchemas.documents.$post> },
      ) => parseResponse(client.complexSchemas.documents.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostComplexSchemasConfigs<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.complexSchemas.configs.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.complexSchemas.configs.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['complexSchemas', '/complexSchemas/configs', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.complexSchemas.configs.$post> },
      ) => parseResponse(client.complexSchemas.configs.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetComplexSchemasNullableUnionKey() {
  return ['complexSchemas', '/complexSchemas/nullable-union'] as const
}

export function useGetComplexSchemasNullableUnion(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComplexSchemasNullableUnionKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.complexSchemas['nullable-union'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetComplexSchemasNullableUnion(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComplexSchemasNullableUnionKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.complexSchemas['nullable-union'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetComplexSchemasNestedCircularKey() {
  return ['complexSchemas', '/complexSchemas/nested-circular'] as const
}

export function useGetComplexSchemasNestedCircular(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComplexSchemasNestedCircularKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.complexSchemas['nested-circular'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetComplexSchemasNestedCircular(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetComplexSchemasNestedCircularKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.complexSchemas['nested-circular'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostVendorExtensionsUsers<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.users.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.vendorExtensions.users.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['vendorExtensions', '/vendorExtensions/users', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.vendorExtensions.users.$post> },
      ) => parseResponse(client.vendorExtensions.users.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetVendorExtensionsUsersUserIdKey(
  args: InferRequestType<(typeof client.vendorExtensions.users)[':userId']['$get']>,
) {
  return ['vendorExtensions', '/vendorExtensions/users/:userId', args] as const
}

export function useGetVendorExtensionsUsersUserId(
  args: InferRequestType<(typeof client.vendorExtensions.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetVendorExtensionsUsersUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.vendorExtensions.users[':userId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVendorExtensionsUsersUserId(
  args: InferRequestType<(typeof client.vendorExtensions.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetVendorExtensionsUsersUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.vendorExtensions.users[':userId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function usePostVendorExtensionsPosts<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.posts.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.vendorExtensions.posts.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['vendorExtensions', '/vendorExtensions/posts', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.vendorExtensions.posts.$post> },
      ) => parseResponse(client.vendorExtensions.posts.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostVendorExtensionsTransforms<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.transforms.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.vendorExtensions.transforms.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['vendorExtensions', '/vendorExtensions/transforms', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.vendorExtensions.transforms.$post> },
      ) => parseResponse(client.vendorExtensions.transforms.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostVendorExtensionsCoerce<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.coerce.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.vendorExtensions.coerce.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['vendorExtensions', '/vendorExtensions/coerce', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.vendorExtensions.coerce.$post> },
      ) => parseResponse(client.vendorExtensions.coerce.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostVendorExtensionsReplacements<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.replacements.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.vendorExtensions.replacements.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['vendorExtensions', '/vendorExtensions/replacements', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.vendorExtensions.replacements.$post> },
      ) => parseResponse(client.vendorExtensions.replacements.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostVendorExtensionsFormats<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.formats.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.vendorExtensions.formats.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['vendorExtensions', '/vendorExtensions/formats', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.vendorExtensions.formats.$post> },
      ) => parseResponse(client.vendorExtensions.formats.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostVendorExtensionsCustom<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.custom.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.vendorExtensions.custom.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['vendorExtensions', '/vendorExtensions/custom', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.vendorExtensions.custom.$post> },
      ) => parseResponse(client.vendorExtensions.custom.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostVendorExtensionsMessages<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.messages.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.vendorExtensions.messages.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['vendorExtensions', '/vendorExtensions/messages', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.vendorExtensions.messages.$post> },
      ) => parseResponse(client.vendorExtensions.messages.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostVendorExtensionsComposition<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.composition.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.vendorExtensions.composition.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['vendorExtensions', '/vendorExtensions/composition', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.vendorExtensions.composition.$post> },
      ) => parseResponse(client.vendorExtensions.composition.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostVendorExtensionsConditional<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.conditional.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.vendorExtensions.conditional.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['vendorExtensions', '/vendorExtensions/conditional', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.vendorExtensions.conditional.$post> },
      ) => parseResponse(client.vendorExtensions.conditional.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function usePostVendorExtensionsApplicators<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.applicators.$post>>>
      >
    >,
    TError,
    Key,
    InferRequestType<typeof client.vendorExtensions.applicators.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? (['vendorExtensions', '/vendorExtensions/applicators', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.vendorExtensions.applicators.$post> },
      ) => parseResponse(client.vendorExtensions.applicators.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

export function getGetPaginationItemsKey(
  args: InferRequestType<typeof client.pagination.items.$get>,
) {
  return ['pagination', '/pagination/items', args] as const
}

export function useGetPaginationItems(
  args: InferRequestType<typeof client.pagination.items.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPaginationItemsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.pagination.items.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPaginationItems(
  args: InferRequestType<typeof client.pagination.items.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPaginationItemsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.pagination.items.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetPaginationItemsInfiniteKey(
  args: InferRequestType<typeof client.pagination.items.$get>,
) {
  return ['pagination', '/pagination/items', args, 'infinite'] as const
}

export function useInfiniteGetPaginationItems<TError = unknown>(
  args: InferRequestType<typeof client.pagination.items.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
      >,
      TError
    > & { swrKey?: SWRInfiniteKeyLoader }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ??
    ((index: number) => [...getGetPaginationItemsInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.pagination.items.$get(args, clientOptions)),
    restSwrOptions,
  )
}

export function getGetPaginationFeedsKey() {
  return ['pagination', '/pagination/feeds'] as const
}

export function useGetPaginationFeeds(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPaginationFeedsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.pagination.feeds.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPaginationFeeds(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPaginationFeedsKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.pagination.feeds.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetPaginationFeedsInfiniteKey() {
  return ['pagination', '/pagination/feeds', 'infinite'] as const
}

export function useInfiniteGetPaginationFeeds<TError = unknown>(options: {
  swr?: SWRInfiniteConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.feeds.$get>>>>
    >,
    TError
  > & { swrKey?: SWRInfiniteKeyLoader }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetPaginationFeedsInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.pagination.feeds.$get(undefined, clientOptions)),
    restSwrOptions,
  )
}

export function getGetPaginationUsersUserIdPostsKey(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
) {
  return ['pagination', '/pagination/users/:userId/posts', args] as const
}

export function useGetPaginationUsersUserIdPosts(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPaginationUsersUserIdPostsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.pagination.users[':userId'].posts.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPaginationUsersUserIdPosts(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPaginationUsersUserIdPostsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.pagination.users[':userId'].posts.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetPaginationUsersUserIdPostsInfiniteKey(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
) {
  return ['pagination', '/pagination/users/:userId/posts', args, 'infinite'] as const
}

export function useInfiniteGetPaginationUsersUserIdPosts<TError = unknown>(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      TError
    > & { swrKey?: SWRInfiniteKeyLoader }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ??
    ((index: number) => [...getGetPaginationUsersUserIdPostsInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.pagination.users[':userId'].posts.$get(args, clientOptions)),
    restSwrOptions,
  )
}

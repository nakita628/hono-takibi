import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/12-edge-cases'

/**
 * Generates SWR cache key for GET /all-methods
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetAllMethodsKey() {
  return ['/all-methods'] as const
}

/**
 * GET /all-methods
 */
export function useGetAllMethods(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAllMethodsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['all-methods'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /all-methods
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutAllMethodsMutationKey() {
  return ['PUT', '/all-methods'] as const
}

/**
 * PUT /all-methods
 */
export function usePutAllMethods(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['all-methods']['$put']>>>>
    >,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutAllMethodsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['all-methods'].$put(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /all-methods
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostAllMethodsMutationKey() {
  return ['POST', '/all-methods'] as const
}

/**
 * POST /all-methods
 */
export function usePostAllMethods(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['all-methods']['$post']>>>>
    >,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAllMethodsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['all-methods'].$post(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /all-methods
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getDeleteAllMethodsMutationKey() {
  return ['DELETE', '/all-methods'] as const
}

/**
 * DELETE /all-methods
 */
export function useDeleteAllMethods(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['all-methods']['$delete']>>>
      >
    >,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteAllMethodsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['all-methods'].$delete(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for OPTIONS /all-methods
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getOptionsAllMethodsMutationKey() {
  return ['OPTIONS', '/all-methods'] as const
}

/**
 * OPTIONS /all-methods
 */
export function useOptionsAllMethods(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['all-methods']['$options']>>>
      >
    >,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getOptionsAllMethodsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['all-methods'].$options(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for HEAD /all-methods
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getHeadAllMethodsMutationKey() {
  return ['HEAD', '/all-methods'] as const
}

/**
 * HEAD /all-methods
 */
export function useHeadAllMethods(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['all-methods']['$head']>>>>
    >,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getHeadAllMethodsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['all-methods'].$head(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /all-methods
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPatchAllMethodsMutationKey() {
  return ['PATCH', '/all-methods'] as const
}

/**
 * PATCH /all-methods
 */
export function usePatchAllMethods(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['all-methods']['$patch']>>>
      >
    >,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchAllMethodsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['all-methods'].$patch(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for TRACE /all-methods
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getTraceAllMethodsMutationKey() {
  return ['TRACE', '/all-methods'] as const
}

/**
 * TRACE /all-methods
 */
export function useTraceAllMethods(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['all-methods']['$trace']>>>
      >
    >,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getTraceAllMethodsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['all-methods'].$trace(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{userId}/posts/{postId}/comments/{commentId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetUsersUserIdPostsPostIdCommentsCommentIdKey(
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
) {
  return [
    `/users/${args.param.userId}/posts/${args.param.postId}/comments/${args.param.commentId}`,
    args,
  ] as const
}

/**
 * GET /users/{userId}/posts/{postId}/comments/{commentId}
 */
export function useGetUsersUserIdPostsPostIdCommentsCommentId(
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetUsersUserIdPostsPostIdCommentsCommentIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.users[':userId'].posts[':postId'].comments[':commentId'].$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /params-test/{pathParam}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetParamsTestPathParamKey(
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
) {
  return [`/params-test/${args.param.pathParam}`, args] as const
}

/**
 * GET /params-test/{pathParam}
 */
export function useGetParamsTestPathParam(
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetParamsTestPathParamKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['params-test'][':pathParam'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /no-content
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostNoContentMutationKey() {
  return ['POST', '/no-content'] as const
}

/**
 * POST /no-content
 */
export function usePostNoContent(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['no-content']['$post']>>>
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
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostNoContentMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['no-content'].$post(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /multi-content
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetMultiContentKey() {
  return ['/multi-content'] as const
}

/**
 * GET /multi-content
 */
export function useGetMultiContent(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMultiContentKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['multi-content'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /multi-content
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostMultiContentMutationKey() {
  return ['POST', '/multi-content'] as const
}

/**
 * POST /multi-content
 */
export function usePostMultiContent(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-content']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['multi-content']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMultiContentMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['multi-content']['$post']> },
      ) => parseResponse(client['multi-content'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /response-ranges
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetResponseRangesKey() {
  return ['/response-ranges'] as const
}

/**
 * GET /response-ranges
 */
export function useGetResponseRanges(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetResponseRangesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['response-ranges'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /deprecated
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetDeprecatedKey() {
  return ['/deprecated'] as const
}

/**
 * GET /deprecated
 *
 * This operation is deprecated
 */
export function useGetDeprecated(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetDeprecatedKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.deprecated.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /no-operation-id
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetNoOperationIdKey() {
  return ['/no-operation-id'] as const
}

/**
 * GET /no-operation-id
 *
 * Operation without operationId
 */
export function useGetNoOperationId(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetNoOperationIdKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['no-operation-id'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /empty-body
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostEmptyBodyMutationKey() {
  return ['POST', '/empty-body'] as const
}

/**
 * POST /empty-body
 */
export function usePostEmptyBody(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['empty-body']['$post']>>>>
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['empty-body']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostEmptyBodyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client)['empty-body']['$post']> }) =>
        parseResponse(client['empty-body'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /circular
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetCircularKey() {
  return ['/circular'] as const
}

/**
 * GET /circular
 */
export function useGetCircular(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetCircularKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.circular.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /deep-nesting
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetDeepNestingKey() {
  return ['/deep-nesting'] as const
}

/**
 * GET /deep-nesting
 */
export function useGetDeepNesting(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetDeepNestingKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['deep-nesting'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /array-params
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetArrayParamsKey(
  args: InferRequestType<(typeof client)['array-params']['$get']>,
) {
  return ['/array-params', args] as const
}

/**
 * GET /array-params
 */
export function useGetArrayParams(
  args: InferRequestType<(typeof client)['array-params']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetArrayParamsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['array-params'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /object-param
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetObjectParamKey(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
) {
  return ['/object-param', args] as const
}

/**
 * GET /object-param
 */
export function useGetObjectParam(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetObjectParamKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['object-param'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

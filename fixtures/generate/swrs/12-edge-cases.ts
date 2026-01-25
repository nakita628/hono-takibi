import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/12-edge-cases'

/**
 * GET /all-methods
 */
export function useGetAllMethods(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAllMethodsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['all-methods'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /all-methods
 */
export function getGetAllMethodsKey() {
  return ['/all-methods'] as const
}

/**
 * PUT /all-methods
 */
export function usePutAllMethods(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['all-methods']['$put']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /all-methods',
    async () => parseResponse(client['all-methods'].$put(undefined, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /all-methods
 */
export function usePostAllMethods(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['all-methods']['$post']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /all-methods',
    async () => parseResponse(client['all-methods'].$post(undefined, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /all-methods
 */
export function useDeleteAllMethods(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['all-methods']['$delete']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /all-methods',
    async () => parseResponse(client['all-methods'].$delete(undefined, options?.client)),
    mutationOptions,
  )
}

/**
 * OPTIONS /all-methods
 */
export function useOptionsAllMethods(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['all-methods']['$options']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'OPTIONS /all-methods',
    async () => parseResponse(client['all-methods'].$options(undefined, options?.client)),
    mutationOptions,
  )
}

/**
 * HEAD /all-methods
 */
export function useHeadAllMethods(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['all-methods']['$head']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'HEAD /all-methods',
    async () => parseResponse(client['all-methods'].$head(undefined, options?.client)),
    mutationOptions,
  )
}

/**
 * PATCH /all-methods
 */
export function usePatchAllMethods(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['all-methods']['$patch']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /all-methods',
    async () => parseResponse(client['all-methods'].$patch(undefined, options?.client)),
    mutationOptions,
  )
}

/**
 * TRACE /all-methods
 */
export function useTraceAllMethods(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['all-methods']['$trace']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'TRACE /all-methods',
    async () => parseResponse(client['all-methods'].$trace(undefined, options?.client)),
    mutationOptions,
  )
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetUsersUserIdPostsPostIdCommentsCommentIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.users[':userId'].posts[':postId'].comments[':commentId'].$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{userId}/posts/{postId}/comments/{commentId}
 */
export function getGetUsersUserIdPostsPostIdCommentsCommentIdKey(
  args?: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
) {
  return ['/users/:userId/posts/:postId/comments/:commentId', ...(args ? [args] : [])] as const
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetParamsTestPathParamKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['params-test'][':pathParam'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /params-test/{pathParam}
 */
export function getGetParamsTestPathParamKey(
  args?: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
) {
  return ['/params-test/:pathParam', ...(args ? [args] : [])] as const
}

/**
 * POST /no-content
 */
export function usePostNoContent(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['no-content']['$post']> | undefined,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /no-content',
    async () => parseResponse(client['no-content'].$post(undefined, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /multi-content
 */
export function useGetMultiContent(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetMultiContentKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['multi-content'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /multi-content
 */
export function getGetMultiContentKey() {
  return ['/multi-content'] as const
}

/**
 * POST /multi-content
 */
export function usePostMultiContent(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['multi-content']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['multi-content']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /multi-content',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['multi-content']['$post']> },
    ) => parseResponse(client['multi-content'].$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /response-ranges
 */
export function useGetResponseRanges(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetResponseRangesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['response-ranges'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /response-ranges
 */
export function getGetResponseRangesKey() {
  return ['/response-ranges'] as const
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetDeprecatedKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.deprecated.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /deprecated
 */
export function getGetDeprecatedKey() {
  return ['/deprecated'] as const
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetNoOperationIdKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['no-operation-id'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /no-operation-id
 */
export function getGetNoOperationIdKey() {
  return ['/no-operation-id'] as const
}

/**
 * POST /empty-body
 */
export function usePostEmptyBody(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['empty-body']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['empty-body']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /empty-body',
    async (_: string, { arg }: { arg: InferRequestType<(typeof client)['empty-body']['$post']> }) =>
      parseResponse(client['empty-body'].$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /circular
 */
export function useGetCircular(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCircularKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.circular.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /circular
 */
export function getGetCircularKey() {
  return ['/circular'] as const
}

/**
 * GET /deep-nesting
 */
export function useGetDeepNesting(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetDeepNestingKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['deep-nesting'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /deep-nesting
 */
export function getGetDeepNestingKey() {
  return ['/deep-nesting'] as const
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetArrayParamsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['array-params'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /array-params
 */
export function getGetArrayParamsKey(
  args?: InferRequestType<(typeof client)['array-params']['$get']>,
) {
  return ['/array-params', ...(args ? [args] : [])] as const
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetObjectParamKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['object-param'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /object-param
 */
export function getGetObjectParamKey(
  args?: InferRequestType<(typeof client)['object-param']['$get']>,
) {
  return ['/object-param', ...(args ? [args] : [])] as const
}

import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/12-edge-cases'

/**
 * GET /all-methods
 */
export function useGetAllMethods(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['all-methods']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/all-methods'] as const) : null
  return useSWR<InferResponseType<(typeof client)['all-methods']['$get']>, Error>(
    key,
    async () => parseResponse(client['all-methods'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /all-methods
 */
export function getGetAllMethodsKey() {
  return ['GET', '/all-methods'] as const
}

/**
 * PUT /all-methods
 */
export function usePutAllMethods(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['all-methods']['$put']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['all-methods']['$put']>,
    Error,
    string,
    void
  >(
    'PUT /all-methods',
    async () => parseResponse(client['all-methods'].$put(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * POST /all-methods
 */
export function usePostAllMethods(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['all-methods']['$post']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['all-methods']['$post']>,
    Error,
    string,
    void
  >(
    'POST /all-methods',
    async () => parseResponse(client['all-methods'].$post(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /all-methods
 */
export function useDeleteAllMethods(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['all-methods']['$delete']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['all-methods']['$delete']>,
    Error,
    string,
    void
  >(
    'DELETE /all-methods',
    async () => parseResponse(client['all-methods'].$delete(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * OPTIONS /all-methods
 */
export function useOptionsAllMethods(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['all-methods']['$options']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['all-methods']['$options']>,
    Error,
    string,
    void
  >(
    'OPTIONS /all-methods',
    async () => parseResponse(client['all-methods'].$options(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * HEAD /all-methods
 */
export function useHeadAllMethods(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['all-methods']['$head']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['all-methods']['$head']>,
    Error,
    string,
    void
  >(
    'HEAD /all-methods',
    async () => parseResponse(client['all-methods'].$head(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /all-methods
 */
export function usePatchAllMethods(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['all-methods']['$patch']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['all-methods']['$patch']>,
    Error,
    string,
    void
  >(
    'PATCH /all-methods',
    async () => parseResponse(client['all-methods'].$patch(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * TRACE /all-methods
 */
export function useTraceAllMethods(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['all-methods']['$trace']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['all-methods']['$trace']>,
    Error,
    string,
    void
  >(
    'TRACE /all-methods',
    async () => parseResponse(client['all-methods'].$trace(undefined, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/users/:userId/posts/:postId/comments/:commentId', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.users[':userId'].posts[':postId'].comments[':commentId'].$get(args, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /users/{userId}/posts/{postId}/comments/{commentId}
 */
export function getGetUsersUserIdPostsPostIdCommentsCommentIdKey(
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
) {
  return ['GET', '/users/:userId/posts/:postId/comments/:commentId', args] as const
}

/**
 * GET /params-test/{pathParam}
 */
export function useGetParamsTestPathParam(
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client)['params-test'][':pathParam']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/params-test/:pathParam', args] as const) : null
  return useSWR<InferResponseType<(typeof client)['params-test'][':pathParam']['$get']>, Error>(
    key,
    async () => parseResponse(client['params-test'][':pathParam'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /params-test/{pathParam}
 */
export function getGetParamsTestPathParamKey(
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
) {
  return ['GET', '/params-test/:pathParam', args] as const
}

/**
 * POST /no-content
 */
export function usePostNoContent(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['no-content']['$post']>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['no-content']['$post']>,
    Error,
    string,
    void
  >(
    'POST /no-content',
    async () => parseResponse(client['no-content'].$post(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * GET /multi-content
 */
export function useGetMultiContent(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['multi-content']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/multi-content'] as const) : null
  return useSWR<InferResponseType<(typeof client)['multi-content']['$get']>, Error>(
    key,
    async () => parseResponse(client['multi-content'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /multi-content
 */
export function getGetMultiContentKey() {
  return ['GET', '/multi-content'] as const
}

/**
 * POST /multi-content
 */
export function usePostMultiContent(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['multi-content']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['multi-content']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['multi-content']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['multi-content']['$post']>
  >(
    'POST /multi-content',
    async (_, { arg }) => parseResponse(client['multi-content'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /response-ranges
 */
export function useGetResponseRanges(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['response-ranges']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/response-ranges'] as const) : null
  return useSWR<InferResponseType<(typeof client)['response-ranges']['$get']>, Error>(
    key,
    async () => parseResponse(client['response-ranges'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /response-ranges
 */
export function getGetResponseRangesKey() {
  return ['GET', '/response-ranges'] as const
}

/**
 * GET /deprecated
 *
 * This operation is deprecated
 */
export function useGetDeprecated(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.deprecated.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/deprecated'] as const) : null
  return useSWR<InferResponseType<typeof client.deprecated.$get>, Error>(
    key,
    async () => parseResponse(client.deprecated.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /deprecated
 */
export function getGetDeprecatedKey() {
  return ['GET', '/deprecated'] as const
}

/**
 * GET /no-operation-id
 *
 * Operation without operationId
 */
export function useGetNoOperationId(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['no-operation-id']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/no-operation-id'] as const) : null
  return useSWR<InferResponseType<(typeof client)['no-operation-id']['$get']>, Error>(
    key,
    async () => parseResponse(client['no-operation-id'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /no-operation-id
 */
export function getGetNoOperationIdKey() {
  return ['GET', '/no-operation-id'] as const
}

/**
 * POST /empty-body
 */
export function usePostEmptyBody(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['empty-body']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['empty-body']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['empty-body']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['empty-body']['$post']>
  >(
    'POST /empty-body',
    async (_, { arg }) => parseResponse(client['empty-body'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /circular
 */
export function useGetCircular(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.circular.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/circular'] as const) : null
  return useSWR<InferResponseType<typeof client.circular.$get>, Error>(
    key,
    async () => parseResponse(client.circular.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /circular
 */
export function getGetCircularKey() {
  return ['GET', '/circular'] as const
}

/**
 * GET /deep-nesting
 */
export function useGetDeepNesting(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['deep-nesting']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/deep-nesting'] as const) : null
  return useSWR<InferResponseType<(typeof client)['deep-nesting']['$get']>, Error>(
    key,
    async () => parseResponse(client['deep-nesting'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /deep-nesting
 */
export function getGetDeepNestingKey() {
  return ['GET', '/deep-nesting'] as const
}

/**
 * GET /array-params
 */
export function useGetArrayParams(
  args: InferRequestType<(typeof client)['array-params']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client)['array-params']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/array-params', args] as const) : null
  return useSWR<InferResponseType<(typeof client)['array-params']['$get']>, Error>(
    key,
    async () => parseResponse(client['array-params'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /array-params
 */
export function getGetArrayParamsKey(
  args: InferRequestType<(typeof client)['array-params']['$get']>,
) {
  return ['GET', '/array-params', args] as const
}

/**
 * GET /object-param
 */
export function useGetObjectParam(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client)['object-param']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/object-param', args] as const) : null
  return useSWR<InferResponseType<(typeof client)['object-param']['$get']>, Error>(
    key,
    async () => parseResponse(client['object-param'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /object-param
 */
export function getGetObjectParamKey(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
) {
  return ['GET', '/object-param', args] as const
}

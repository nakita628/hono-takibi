import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/12-edge-cases'

/**
 * GET /all-methods
 */
export function useGetAllMethods(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetAllMethodsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['all-methods'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /all-methods
 */
export function getGetAllMethodsQueryKey() {
  return ['/all-methods'] as const
}

/**
 * PUT /all-methods
 */
export function usePutAllMethods(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['all-methods']['$put']> | undefined,
    Error,
    void
  >({ mutationFn: async () => parseResponse(client['all-methods'].$put(undefined, clientOptions)) })
}

/**
 * POST /all-methods
 */
export function usePostAllMethods(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['all-methods']['$post']> | undefined,
    Error,
    void
  >({
    mutationFn: async () => parseResponse(client['all-methods'].$post(undefined, clientOptions)),
  })
}

/**
 * DELETE /all-methods
 */
export function useDeleteAllMethods(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['all-methods']['$delete']> | undefined,
    Error,
    void
  >({
    mutationFn: async () => parseResponse(client['all-methods'].$delete(undefined, clientOptions)),
  })
}

/**
 * OPTIONS /all-methods
 */
export function useOptionsAllMethods(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['all-methods']['$options']> | undefined,
    Error,
    void
  >({
    mutationFn: async () => parseResponse(client['all-methods'].$options(undefined, clientOptions)),
  })
}

/**
 * HEAD /all-methods
 */
export function useHeadAllMethods(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['all-methods']['$head']> | undefined,
    Error,
    void
  >({
    mutationFn: async () => parseResponse(client['all-methods'].$head(undefined, clientOptions)),
  })
}

/**
 * PATCH /all-methods
 */
export function usePatchAllMethods(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['all-methods']['$patch']> | undefined,
    Error,
    void
  >({
    mutationFn: async () => parseResponse(client['all-methods'].$patch(undefined, clientOptions)),
  })
}

/**
 * TRACE /all-methods
 */
export function useTraceAllMethods(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['all-methods']['$trace']> | undefined,
    Error,
    void
  >({
    mutationFn: async () => parseResponse(client['all-methods'].$trace(undefined, clientOptions)),
  })
}

/**
 * GET /users/{userId}/posts/{postId}/comments/{commentId}
 */
export function useGetUsersUserIdPostsPostIdCommentsCommentId(
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersUserIdPostsPostIdCommentsCommentIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.users[':userId'].posts[':postId'].comments[':commentId'].$get(args, clientOptions),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /users/{userId}/posts/{postId}/comments/{commentId}
 */
export function getGetUsersUserIdPostsPostIdCommentsCommentIdQueryKey(
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
) {
  return ['/users/:userId/posts/:postId/comments/:commentId', args] as const
}

/**
 * GET /params-test/{pathParam}
 */
export function useGetParamsTestPathParam(
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetParamsTestPathParamQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client['params-test'][':pathParam'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /params-test/{pathParam}
 */
export function getGetParamsTestPathParamQueryKey(
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
) {
  return ['/params-test/:pathParam', args] as const
}

/**
 * POST /no-content
 */
export function usePostNoContent(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['no-content']['$post']> | undefined,
    Error,
    void
  >({ mutationFn: async () => parseResponse(client['no-content'].$post(undefined, clientOptions)) })
}

/**
 * GET /multi-content
 */
export function useGetMultiContent(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetMultiContentQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['multi-content'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /multi-content
 */
export function getGetMultiContentQueryKey() {
  return ['/multi-content'] as const
}

/**
 * POST /multi-content
 */
export function usePostMultiContent(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['multi-content']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['multi-content']['$post']>
  >({
    mutationFn: async (args) => parseResponse(client['multi-content'].$post(args, clientOptions)),
  })
}

/**
 * GET /response-ranges
 */
export function useGetResponseRanges(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetResponseRangesQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['response-ranges'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /response-ranges
 */
export function getGetResponseRangesQueryKey() {
  return ['/response-ranges'] as const
}

/**
 * GET /deprecated
 *
 * This operation is deprecated
 */
export function useGetDeprecated(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetDeprecatedQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.deprecated.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /deprecated
 */
export function getGetDeprecatedQueryKey() {
  return ['/deprecated'] as const
}

/**
 * GET /no-operation-id
 *
 * Operation without operationId
 */
export function useGetNoOperationId(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetNoOperationIdQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['no-operation-id'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /no-operation-id
 */
export function getGetNoOperationIdQueryKey() {
  return ['/no-operation-id'] as const
}

/**
 * POST /empty-body
 */
export function usePostEmptyBody(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['empty-body']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['empty-body']['$post']>
  >({ mutationFn: async (args) => parseResponse(client['empty-body'].$post(args, clientOptions)) })
}

/**
 * GET /circular
 */
export function useGetCircular(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetCircularQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.circular.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /circular
 */
export function getGetCircularQueryKey() {
  return ['/circular'] as const
}

/**
 * GET /deep-nesting
 */
export function useGetDeepNesting(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetDeepNestingQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['deep-nesting'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /deep-nesting
 */
export function getGetDeepNestingQueryKey() {
  return ['/deep-nesting'] as const
}

/**
 * GET /array-params
 */
export function useGetArrayParams(
  args: InferRequestType<(typeof client)['array-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetArrayParamsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['array-params'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /array-params
 */
export function getGetArrayParamsQueryKey(
  args: InferRequestType<(typeof client)['array-params']['$get']>,
) {
  return ['/array-params', args] as const
}

/**
 * GET /object-param
 */
export function useGetObjectParam(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetObjectParamQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['object-param'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /object-param
 */
export function getGetObjectParamQueryKey(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
) {
  return ['/object-param', args] as const
}

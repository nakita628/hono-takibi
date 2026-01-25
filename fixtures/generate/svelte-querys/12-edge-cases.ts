import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/12-edge-cases'

/**
 * GET /all-methods
 */
export function createGetAllMethods(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAllMethodsQueryKey(),
    queryFn: async () => parseResponse(client['all-methods'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /all-methods
 */
export function getGetAllMethodsQueryKey() {
  return ['/all-methods'] as const
}

/**
 * Returns Svelte Query query options for GET /all-methods
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAllMethodsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetAllMethodsQueryKey(),
    queryFn: async () => parseResponse(client['all-methods'].$get(undefined, clientOptions)),
  }
}

/**
 * PUT /all-methods
 */
export function createPutAllMethods(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['all-methods']['$put']>,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['all-methods']['$put']> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async () => parseResponse(client['all-methods'].$put(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /all-methods
 */
export function createPostAllMethods(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['all-methods']['$post']>,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['all-methods']['$post']> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async () => parseResponse(client['all-methods'].$post(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /all-methods
 */
export function createDeleteAllMethods(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['all-methods']['$delete']>,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['all-methods']['$delete']> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async () => parseResponse(client['all-methods'].$delete(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * OPTIONS /all-methods
 */
export function createOptionsAllMethods(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['all-methods']['$options']>,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['all-methods']['$options']> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async () => parseResponse(client['all-methods'].$options(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * HEAD /all-methods
 */
export function createHeadAllMethods(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['all-methods']['$head']>,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['all-methods']['$head']> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async () => parseResponse(client['all-methods'].$head(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /all-methods
 */
export function createPatchAllMethods(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['all-methods']['$patch']>,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['all-methods']['$patch']> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async () => parseResponse(client['all-methods'].$patch(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * TRACE /all-methods
 */
export function createTraceAllMethods(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['all-methods']['$trace']>,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['all-methods']['$trace']> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async () => parseResponse(client['all-methods'].$trace(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /users/{userId}/posts/{postId}/comments/{commentId}
 */
export function createGetUsersUserIdPostsPostIdCommentsCommentId(
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUsersUserIdPostsPostIdCommentsCommentIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.users[':userId'].posts[':postId'].comments[':commentId'].$get(args, clientOptions),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /users/{userId}/posts/{postId}/comments/{commentId}
 */
export function getGetUsersUserIdPostsPostIdCommentsCommentIdQueryKey(
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
) {
  return ['/users/:userId/posts/:postId/comments/:commentId', args] as const
}

/**
 * Returns Svelte Query query options for GET /users/{userId}/posts/{postId}/comments/{commentId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersUserIdPostsPostIdCommentsCommentIdQueryOptions(
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersUserIdPostsPostIdCommentsCommentIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.users[':userId'].posts[':postId'].comments[':commentId'].$get(args, clientOptions),
      ),
  }
}

/**
 * GET /params-test/{pathParam}
 */
export function createGetParamsTestPathParam(
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetParamsTestPathParamQueryKey(args),
    queryFn: async () =>
      parseResponse(client['params-test'][':pathParam'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /params-test/{pathParam}
 */
export function getGetParamsTestPathParamQueryKey(
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
) {
  return ['/params-test/:pathParam', args] as const
}

/**
 * Returns Svelte Query query options for GET /params-test/{pathParam}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetParamsTestPathParamQueryOptions(
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetParamsTestPathParamQueryKey(args),
    queryFn: async () =>
      parseResponse(client['params-test'][':pathParam'].$get(args, clientOptions)),
  }
}

/**
 * POST /no-content
 */
export function createPostNoContent(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['no-content']['$post']> | undefined,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['no-content']['$post']> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async () => parseResponse(client['no-content'].$post(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /multi-content
 */
export function createGetMultiContent(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetMultiContentQueryKey(),
    queryFn: async () => parseResponse(client['multi-content'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /multi-content
 */
export function getGetMultiContentQueryKey() {
  return ['/multi-content'] as const
}

/**
 * Returns Svelte Query query options for GET /multi-content
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMultiContentQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetMultiContentQueryKey(),
    queryFn: async () => parseResponse(client['multi-content'].$get(undefined, clientOptions)),
  }
}

/**
 * POST /multi-content
 */
export function createPostMultiContent(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['multi-content']['$post']>,
      variables: InferRequestType<(typeof client)['multi-content']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['multi-content']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['multi-content']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['multi-content']['$post']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)['multi-content']['$post']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['multi-content']['$post']>) =>
      parseResponse(client['multi-content'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /response-ranges
 */
export function createGetResponseRanges(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetResponseRangesQueryKey(),
    queryFn: async () => parseResponse(client['response-ranges'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /response-ranges
 */
export function getGetResponseRangesQueryKey() {
  return ['/response-ranges'] as const
}

/**
 * Returns Svelte Query query options for GET /response-ranges
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetResponseRangesQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetResponseRangesQueryKey(),
    queryFn: async () => parseResponse(client['response-ranges'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /deprecated
 *
 * This operation is deprecated
 */
export function createGetDeprecated(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetDeprecatedQueryKey(),
    queryFn: async () => parseResponse(client.deprecated.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /deprecated
 */
export function getGetDeprecatedQueryKey() {
  return ['/deprecated'] as const
}

/**
 * Returns Svelte Query query options for GET /deprecated
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetDeprecatedQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetDeprecatedQueryKey(),
    queryFn: async () => parseResponse(client.deprecated.$get(undefined, clientOptions)),
  }
}

/**
 * GET /no-operation-id
 *
 * Operation without operationId
 */
export function createGetNoOperationId(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetNoOperationIdQueryKey(),
    queryFn: async () => parseResponse(client['no-operation-id'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /no-operation-id
 */
export function getGetNoOperationIdQueryKey() {
  return ['/no-operation-id'] as const
}

/**
 * Returns Svelte Query query options for GET /no-operation-id
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNoOperationIdQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetNoOperationIdQueryKey(),
    queryFn: async () => parseResponse(client['no-operation-id'].$get(undefined, clientOptions)),
  }
}

/**
 * POST /empty-body
 */
export function createPostEmptyBody(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['empty-body']['$post']>,
      variables: InferRequestType<(typeof client)['empty-body']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['empty-body']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['empty-body']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['empty-body']['$post']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)['empty-body']['$post']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['empty-body']['$post']>) =>
      parseResponse(client['empty-body'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /circular
 */
export function createGetCircular(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetCircularQueryKey(),
    queryFn: async () => parseResponse(client.circular.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /circular
 */
export function getGetCircularQueryKey() {
  return ['/circular'] as const
}

/**
 * Returns Svelte Query query options for GET /circular
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetCircularQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetCircularQueryKey(),
    queryFn: async () => parseResponse(client.circular.$get(undefined, clientOptions)),
  }
}

/**
 * GET /deep-nesting
 */
export function createGetDeepNesting(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetDeepNestingQueryKey(),
    queryFn: async () => parseResponse(client['deep-nesting'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /deep-nesting
 */
export function getGetDeepNestingQueryKey() {
  return ['/deep-nesting'] as const
}

/**
 * Returns Svelte Query query options for GET /deep-nesting
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetDeepNestingQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetDeepNestingQueryKey(),
    queryFn: async () => parseResponse(client['deep-nesting'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /array-params
 */
export function createGetArrayParams(
  args: InferRequestType<(typeof client)['array-params']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetArrayParamsQueryKey(args),
    queryFn: async () => parseResponse(client['array-params'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /array-params
 */
export function getGetArrayParamsQueryKey(
  args: InferRequestType<(typeof client)['array-params']['$get']>,
) {
  return ['/array-params', args] as const
}

/**
 * Returns Svelte Query query options for GET /array-params
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetArrayParamsQueryOptions(
  args: InferRequestType<(typeof client)['array-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetArrayParamsQueryKey(args),
    queryFn: async () => parseResponse(client['array-params'].$get(args, clientOptions)),
  }
}

/**
 * GET /object-param
 */
export function createGetObjectParam(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetObjectParamQueryKey(args),
    queryFn: async () => parseResponse(client['object-param'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /object-param
 */
export function getGetObjectParamQueryKey(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
) {
  return ['/object-param', args] as const
}

/**
 * Returns Svelte Query query options for GET /object-param
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetObjectParamQueryOptions(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetObjectParamQueryKey(args),
    queryFn: async () => parseResponse(client['object-param'].$get(args, clientOptions)),
  }
}

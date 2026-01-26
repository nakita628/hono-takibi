import { useQuery, useMutation, queryOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/12-edge-cases'

/**
 * GET /all-methods
 */
export function useGetAllMethods(options?: {
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
  return useQuery({ ...getGetAllMethodsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /all-methods
 */
export function getGetAllMethodsQueryKey() {
  return ['/all-methods'] as const
}

/**
 * Returns TanStack Query query options for GET /all-methods
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAllMethodsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetAllMethodsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['all-methods'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /all-methods
 */
export function usePutAllMethods(options?: {
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client['all-methods'].$put(undefined, clientOptions)),
  })
}

/**
 * POST /all-methods
 */
export function usePostAllMethods(options?: {
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client['all-methods'].$post(undefined, clientOptions)),
  })
}

/**
 * DELETE /all-methods
 */
export function useDeleteAllMethods(options?: {
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client['all-methods'].$delete(undefined, clientOptions)),
  })
}

/**
 * OPTIONS /all-methods
 */
export function useOptionsAllMethods(options?: {
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client['all-methods'].$options(undefined, clientOptions)),
  })
}

/**
 * HEAD /all-methods
 */
export function useHeadAllMethods(options?: {
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client['all-methods'].$head(undefined, clientOptions)),
  })
}

/**
 * PATCH /all-methods
 */
export function usePatchAllMethods(options?: {
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client['all-methods'].$patch(undefined, clientOptions)),
  })
}

/**
 * TRACE /all-methods
 */
export function useTraceAllMethods(options?: {
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
  return useMutation({
    ...mutationOptions,
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
  return useQuery({
    ...getGetUsersUserIdPostsPostIdCommentsCommentIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/{userId}/posts/{postId}/comments/{commentId}
 */
export function getGetUsersUserIdPostsPostIdCommentsCommentIdQueryKey(
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
) {
  return ['/users/:userId/posts/:postId/comments/:commentId', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/{userId}/posts/{postId}/comments/{commentId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdPostsPostIdCommentsCommentIdQueryOptions = (
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetUsersUserIdPostsPostIdCommentsCommentIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.users[':userId'].posts[':postId'].comments[':commentId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /params-test/{pathParam}
 */
export function useGetParamsTestPathParam(
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
  return useQuery({
    ...getGetParamsTestPathParamQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /params-test/{pathParam}
 */
export function getGetParamsTestPathParamQueryKey(
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
) {
  return ['/params-test/:pathParam', args] as const
}

/**
 * Returns TanStack Query query options for GET /params-test/{pathParam}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetParamsTestPathParamQueryOptions = (
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetParamsTestPathParamQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['params-test'][':pathParam'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /no-content
 */
export function usePostNoContent(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['no-content']['$post']> | undefined,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['no-content']['$post']> | undefined | undefined,
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client['no-content'].$post(undefined, clientOptions)),
  })
}

/**
 * GET /multi-content
 */
export function useGetMultiContent(options?: {
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
  return useQuery({ ...getGetMultiContentQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /multi-content
 */
export function getGetMultiContentQueryKey() {
  return ['/multi-content'] as const
}

/**
 * Returns TanStack Query query options for GET /multi-content
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMultiContentQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetMultiContentQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['multi-content'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /multi-content
 */
export function usePostMultiContent(options?: {
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['multi-content']['$post']>) =>
      parseResponse(client['multi-content'].$post(args, clientOptions)),
  })
}

/**
 * GET /response-ranges
 */
export function useGetResponseRanges(options?: {
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
  return useQuery({ ...getGetResponseRangesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /response-ranges
 */
export function getGetResponseRangesQueryKey() {
  return ['/response-ranges'] as const
}

/**
 * Returns TanStack Query query options for GET /response-ranges
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetResponseRangesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetResponseRangesQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['response-ranges'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /deprecated
 *
 * This operation is deprecated
 */
export function useGetDeprecated(options?: {
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
  return useQuery({ ...getGetDeprecatedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /deprecated
 */
export function getGetDeprecatedQueryKey() {
  return ['/deprecated'] as const
}

/**
 * Returns TanStack Query query options for GET /deprecated
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDeprecatedQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetDeprecatedQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.deprecated.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /no-operation-id
 *
 * Operation without operationId
 */
export function useGetNoOperationId(options?: {
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
  return useQuery({ ...getGetNoOperationIdQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /no-operation-id
 */
export function getGetNoOperationIdQueryKey() {
  return ['/no-operation-id'] as const
}

/**
 * Returns TanStack Query query options for GET /no-operation-id
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNoOperationIdQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetNoOperationIdQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['no-operation-id'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /empty-body
 */
export function usePostEmptyBody(options?: {
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['empty-body']['$post']>) =>
      parseResponse(client['empty-body'].$post(args, clientOptions)),
  })
}

/**
 * GET /circular
 */
export function useGetCircular(options?: {
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
  return useQuery({ ...getGetCircularQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /circular
 */
export function getGetCircularQueryKey() {
  return ['/circular'] as const
}

/**
 * Returns TanStack Query query options for GET /circular
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCircularQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetCircularQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.circular.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /deep-nesting
 */
export function useGetDeepNesting(options?: {
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
  return useQuery({ ...getGetDeepNestingQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /deep-nesting
 */
export function getGetDeepNestingQueryKey() {
  return ['/deep-nesting'] as const
}

/**
 * Returns TanStack Query query options for GET /deep-nesting
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDeepNestingQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetDeepNestingQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['deep-nesting'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /array-params
 */
export function useGetArrayParams(
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
  return useQuery({ ...getGetArrayParamsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /array-params
 */
export function getGetArrayParamsQueryKey(
  args: InferRequestType<(typeof client)['array-params']['$get']>,
) {
  return ['/array-params', args] as const
}

/**
 * Returns TanStack Query query options for GET /array-params
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArrayParamsQueryOptions = (
  args: InferRequestType<(typeof client)['array-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetArrayParamsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['array-params'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /object-param
 */
export function useGetObjectParam(
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
  return useQuery({ ...getGetObjectParamQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /object-param
 */
export function getGetObjectParamQueryKey(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
) {
  return ['/object-param', args] as const
}

/**
 * Returns TanStack Query query options for GET /object-param
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetObjectParamQueryOptions = (
  args: InferRequestType<(typeof client)['object-param']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetObjectParamQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['object-param'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

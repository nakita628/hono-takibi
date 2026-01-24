import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/12-edge-cases'

/**
 * GET /all-methods
 */
export function createGetAllMethods(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['all-methods']['$get']>,
      Error,
      InferResponseType<(typeof client)['all-methods']['$get']>,
      readonly ['/all-methods']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAllMethodsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['all-methods'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /all-methods
 */
export function getGetAllMethodsQueryKey() {
  return ['/all-methods'] as const
}

/**
 * PUT /all-methods
 */
export function createPutAllMethods(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async () => parseResponse(client['all-methods'].$put(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /all-methods
 */
export function createPostAllMethods(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async () =>
        parseResponse(client['all-methods'].$post(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /all-methods
 */
export function createDeleteAllMethods(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async () =>
        parseResponse(client['all-methods'].$delete(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * OPTIONS /all-methods
 */
export function createOptionsAllMethods(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async () =>
        parseResponse(client['all-methods'].$options(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * HEAD /all-methods
 */
export function createHeadAllMethods(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async () =>
        parseResponse(client['all-methods'].$head(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /all-methods
 */
export function createPatchAllMethods(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async () =>
        parseResponse(client['all-methods'].$patch(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * TRACE /all-methods
 */
export function createTraceAllMethods(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async () =>
        parseResponse(client['all-methods'].$trace(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /users/{userId}/posts/{postId}/comments/{commentId}
 */
export function createGetUsersUserIdPostsPostIdCommentsCommentId(
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
      >,
      Error,
      InferResponseType<
        (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
      >,
      readonly [
        '/users/:userId/posts/:postId/comments/:commentId',
        InferRequestType<
          (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
        >,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdPostsPostIdCommentsCommentIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.users[':userId'].posts[':postId'].comments[':commentId'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * GET /params-test/{pathParam}
 */
export function createGetParamsTestPathParam(
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['params-test'][':pathParam']['$get']>,
      Error,
      InferResponseType<(typeof client)['params-test'][':pathParam']['$get']>,
      readonly [
        '/params-test/:pathParam',
        InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetParamsTestPathParamQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['params-test'][':pathParam'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * POST /no-content
 */
export function createPostNoContent(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async () => parseResponse(client['no-content'].$post(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /multi-content
 */
export function createGetMultiContent(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['multi-content']['$get']>,
      Error,
      InferResponseType<(typeof client)['multi-content']['$get']>,
      readonly ['/multi-content']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMultiContentQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['multi-content'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /multi-content
 */
export function getGetMultiContentQueryKey() {
  return ['/multi-content'] as const
}

/**
 * POST /multi-content
 */
export function createPostMultiContent(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client)['multi-content']['$post']>) =>
        parseResponse(client['multi-content'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /response-ranges
 */
export function createGetResponseRanges(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['response-ranges']['$get']>,
      Error,
      InferResponseType<(typeof client)['response-ranges']['$get']>,
      readonly ['/response-ranges']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetResponseRangesQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['response-ranges'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /response-ranges
 */
export function getGetResponseRangesQueryKey() {
  return ['/response-ranges'] as const
}

/**
 * GET /deprecated
 *
 * This operation is deprecated
 */
export function createGetDeprecated(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.deprecated.$get>,
      Error,
      InferResponseType<typeof client.deprecated.$get>,
      readonly ['/deprecated']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDeprecatedQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.deprecated.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /deprecated
 */
export function getGetDeprecatedQueryKey() {
  return ['/deprecated'] as const
}

/**
 * GET /no-operation-id
 *
 * Operation without operationId
 */
export function createGetNoOperationId(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['no-operation-id']['$get']>,
      Error,
      InferResponseType<(typeof client)['no-operation-id']['$get']>,
      readonly ['/no-operation-id']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNoOperationIdQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['no-operation-id'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /no-operation-id
 */
export function getGetNoOperationIdQueryKey() {
  return ['/no-operation-id'] as const
}

/**
 * POST /empty-body
 */
export function createPostEmptyBody(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client)['empty-body']['$post']>) =>
        parseResponse(client['empty-body'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /circular
 */
export function createGetCircular(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.circular.$get>,
      Error,
      InferResponseType<typeof client.circular.$get>,
      readonly ['/circular']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCircularQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.circular.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /circular
 */
export function getGetCircularQueryKey() {
  return ['/circular'] as const
}

/**
 * GET /deep-nesting
 */
export function createGetDeepNesting(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['deep-nesting']['$get']>,
      Error,
      InferResponseType<(typeof client)['deep-nesting']['$get']>,
      readonly ['/deep-nesting']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDeepNestingQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['deep-nesting'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /deep-nesting
 */
export function getGetDeepNestingQueryKey() {
  return ['/deep-nesting'] as const
}

/**
 * GET /array-params
 */
export function createGetArrayParams(
  args: InferRequestType<(typeof client)['array-params']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['array-params']['$get']>,
      Error,
      InferResponseType<(typeof client)['array-params']['$get']>,
      readonly ['/array-params', InferRequestType<(typeof client)['array-params']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetArrayParamsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['array-params'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * GET /object-param
 */
export function createGetObjectParam(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['object-param']['$get']>,
      Error,
      InferResponseType<(typeof client)['object-param']['$get']>,
      readonly ['/object-param', InferRequestType<(typeof client)['object-param']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetObjectParamQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['object-param'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /object-param
 */
export function getGetObjectParamQueryKey(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
) {
  return ['/object-param', args] as const
}

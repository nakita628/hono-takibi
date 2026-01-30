import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/12-edge-cases'

/**
 * Generates Svelte Query cache key for GET /all-methods
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAllMethodsQueryKey() {
  return ['all-methods', 'GET', '/all-methods'] as const
}

/**
 * Returns Svelte Query query options for GET /all-methods
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAllMethodsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAllMethodsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['all-methods'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /all-methods
 */
export function createGetAllMethods(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['all-methods']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAllMethodsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /all-methods
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutAllMethodsMutationKey() {
  return ['all-methods', 'PUT', '/all-methods'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /all-methods
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutAllMethodsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutAllMethodsMutationKey(),
  mutationFn: async () => parseResponse(client['all-methods'].$put(undefined, clientOptions)),
})

/**
 * PUT /all-methods
 */
export function createPutAllMethods(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['all-methods']['$put']>>>
        >
      >,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutAllMethodsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /all-methods
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAllMethodsMutationKey() {
  return ['all-methods', 'POST', '/all-methods'] as const
}

/**
 * Returns Svelte Query mutation options for POST /all-methods
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostAllMethodsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostAllMethodsMutationKey(),
  mutationFn: async () => parseResponse(client['all-methods'].$post(undefined, clientOptions)),
})

/**
 * POST /all-methods
 */
export function createPostAllMethods(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['all-methods']['$post']>>>
        >
      >,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostAllMethodsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /all-methods
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteAllMethodsMutationKey() {
  return ['all-methods', 'DELETE', '/all-methods'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /all-methods
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteAllMethodsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteAllMethodsMutationKey(),
  mutationFn: async () => parseResponse(client['all-methods'].$delete(undefined, clientOptions)),
})

/**
 * DELETE /all-methods
 */
export function createDeleteAllMethods(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['all-methods']['$delete']>>>
        >
      >,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteAllMethodsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for OPTIONS /all-methods
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getOptionsAllMethodsMutationKey() {
  return ['all-methods', 'OPTIONS', '/all-methods'] as const
}

/**
 * Returns Svelte Query mutation options for OPTIONS /all-methods
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getOptionsAllMethodsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getOptionsAllMethodsMutationKey(),
  mutationFn: async () => parseResponse(client['all-methods'].$options(undefined, clientOptions)),
})

/**
 * OPTIONS /all-methods
 */
export function createOptionsAllMethods(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['all-methods']['$options']>>>
        >
      >,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getOptionsAllMethodsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for HEAD /all-methods
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getHeadAllMethodsMutationKey() {
  return ['all-methods', 'HEAD', '/all-methods'] as const
}

/**
 * Returns Svelte Query mutation options for HEAD /all-methods
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getHeadAllMethodsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getHeadAllMethodsMutationKey(),
  mutationFn: async () => parseResponse(client['all-methods'].$head(undefined, clientOptions)),
})

/**
 * HEAD /all-methods
 */
export function createHeadAllMethods(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['all-methods']['$head']>>>
        >
      >,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getHeadAllMethodsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for PATCH /all-methods
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchAllMethodsMutationKey() {
  return ['all-methods', 'PATCH', '/all-methods'] as const
}

/**
 * Returns Svelte Query mutation options for PATCH /all-methods
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchAllMethodsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchAllMethodsMutationKey(),
  mutationFn: async () => parseResponse(client['all-methods'].$patch(undefined, clientOptions)),
})

/**
 * PATCH /all-methods
 */
export function createPatchAllMethods(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['all-methods']['$patch']>>>
        >
      >,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPatchAllMethodsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for TRACE /all-methods
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getTraceAllMethodsMutationKey() {
  return ['all-methods', 'TRACE', '/all-methods'] as const
}

/**
 * Returns Svelte Query mutation options for TRACE /all-methods
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getTraceAllMethodsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getTraceAllMethodsMutationKey(),
  mutationFn: async () => parseResponse(client['all-methods'].$trace(undefined, clientOptions)),
})

/**
 * TRACE /all-methods
 */
export function createTraceAllMethods(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['all-methods']['$trace']>>>
        >
      >,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getTraceAllMethodsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /users/{userId}/posts/{postId}/comments/{commentId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersUserIdPostsPostIdCommentsCommentIdQueryKey(
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
) {
  return ['users', 'GET', '/users/:userId/posts/:postId/comments/:commentId', args] as const
}

/**
 * Returns Svelte Query query options for GET /users/{userId}/posts/{postId}/comments/{commentId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdPostsPostIdCommentsCommentIdQueryOptions = (
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersUserIdPostsPostIdCommentsCommentIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users[':userId'].posts[':postId'].comments[':commentId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/{userId}/posts/{postId}/comments/{commentId}
 */
export function createGetUsersUserIdPostsPostIdCommentsCommentId(
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } =
      getGetUsersUserIdPostsPostIdCommentsCommentIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /params-test/{pathParam}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetParamsTestPathParamQueryKey(
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
) {
  return ['params-test', 'GET', '/params-test/:pathParam', args] as const
}

/**
 * Returns Svelte Query query options for GET /params-test/{pathParam}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetParamsTestPathParamQueryOptions = (
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetParamsTestPathParamQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['params-test'][':pathParam'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /params-test/{pathParam}
 */
export function createGetParamsTestPathParam(
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['params-test'][':pathParam']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetParamsTestPathParamQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /no-content
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostNoContentMutationKey() {
  return ['no-content', 'POST', '/no-content'] as const
}

/**
 * Returns Svelte Query mutation options for POST /no-content
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostNoContentMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostNoContentMutationKey(),
  mutationFn: async () => parseResponse(client['no-content'].$post(undefined, clientOptions)),
})

/**
 * POST /no-content
 */
export function createPostNoContent(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['no-content']['$post']>>>
          >
        >
      | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostNoContentMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /multi-content
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMultiContentQueryKey() {
  return ['multi-content', 'GET', '/multi-content'] as const
}

/**
 * Returns Svelte Query query options for GET /multi-content
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMultiContentQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMultiContentQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['multi-content'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /multi-content
 */
export function createGetMultiContent(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-content']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMultiContentQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /multi-content
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMultiContentMutationKey() {
  return ['multi-content', 'POST', '/multi-content'] as const
}

/**
 * Returns Svelte Query mutation options for POST /multi-content
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMultiContentMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMultiContentMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['multi-content']['$post']>) =>
    parseResponse(client['multi-content'].$post(args, clientOptions)),
})

/**
 * POST /multi-content
 */
export function createPostMultiContent(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-content']['$post']>>>
        >
      >,
      Error,
      InferRequestType<(typeof client)['multi-content']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMultiContentMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /response-ranges
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetResponseRangesQueryKey() {
  return ['response-ranges', 'GET', '/response-ranges'] as const
}

/**
 * Returns Svelte Query query options for GET /response-ranges
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetResponseRangesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetResponseRangesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['response-ranges'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /response-ranges
 */
export function createGetResponseRanges(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['response-ranges']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetResponseRangesQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /deprecated
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetDeprecatedQueryKey() {
  return ['deprecated', 'GET', '/deprecated'] as const
}

/**
 * Returns Svelte Query query options for GET /deprecated
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDeprecatedQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetDeprecatedQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.deprecated.$get(undefined, {
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
export function createGetDeprecated(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.deprecated.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetDeprecatedQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /no-operation-id
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNoOperationIdQueryKey() {
  return ['no-operation-id', 'GET', '/no-operation-id'] as const
}

/**
 * Returns Svelte Query query options for GET /no-operation-id
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNoOperationIdQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetNoOperationIdQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['no-operation-id'].$get(undefined, {
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
export function createGetNoOperationId(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['no-operation-id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNoOperationIdQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /empty-body
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostEmptyBodyMutationKey() {
  return ['empty-body', 'POST', '/empty-body'] as const
}

/**
 * Returns Svelte Query mutation options for POST /empty-body
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostEmptyBodyMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostEmptyBodyMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['empty-body']['$post']>) =>
    parseResponse(client['empty-body'].$post(args, clientOptions)),
})

/**
 * POST /empty-body
 */
export function createPostEmptyBody(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['empty-body']['$post']>>>
        >
      >,
      Error,
      InferRequestType<(typeof client)['empty-body']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostEmptyBodyMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /circular
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetCircularQueryKey() {
  return ['circular', 'GET', '/circular'] as const
}

/**
 * Returns Svelte Query query options for GET /circular
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCircularQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCircularQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.circular.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /circular
 */
export function createGetCircular(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.circular.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetCircularQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /deep-nesting
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetDeepNestingQueryKey() {
  return ['deep-nesting', 'GET', '/deep-nesting'] as const
}

/**
 * Returns Svelte Query query options for GET /deep-nesting
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDeepNestingQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetDeepNestingQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['deep-nesting'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /deep-nesting
 */
export function createGetDeepNesting(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['deep-nesting']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetDeepNestingQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /array-params
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetArrayParamsQueryKey(
  args: InferRequestType<(typeof client)['array-params']['$get']>,
) {
  return ['array-params', 'GET', '/array-params', args] as const
}

/**
 * Returns Svelte Query query options for GET /array-params
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArrayParamsQueryOptions = (
  args: InferRequestType<(typeof client)['array-params']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetArrayParamsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['array-params'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /array-params
 */
export function createGetArrayParams(
  args: InferRequestType<(typeof client)['array-params']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['array-params']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetArrayParamsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /object-param
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetObjectParamQueryKey(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
) {
  return ['object-param', 'GET', '/object-param', args] as const
}

/**
 * Returns Svelte Query query options for GET /object-param
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetObjectParamQueryOptions = (
  args: InferRequestType<(typeof client)['object-param']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetObjectParamQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['object-param'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /object-param
 */
export function createGetObjectParam(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['object-param']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetObjectParamQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
 * Uses $url() for type-safe key generation
 */
export function getGetAllMethodsKey() {
  return client['all-methods'].$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutAllMethodsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['all-methods'].$put(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /all-methods
 * Uses $url() for type-safe key generation
 */
export function getPutAllMethodsMutationKey() {
  return `PUT ${client['all-methods'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostAllMethodsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['all-methods'].$post(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /all-methods
 * Uses $url() for type-safe key generation
 */
export function getPostAllMethodsMutationKey() {
  return `POST ${client['all-methods'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteAllMethodsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['all-methods'].$delete(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /all-methods
 * Uses $url() for type-safe key generation
 */
export function getDeleteAllMethodsMutationKey() {
  return `DELETE ${client['all-methods'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getOptionsAllMethodsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['all-methods'].$options(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for OPTIONS /all-methods
 * Uses $url() for type-safe key generation
 */
export function getOptionsAllMethodsMutationKey() {
  return `OPTIONS ${client['all-methods'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getHeadAllMethodsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['all-methods'].$head(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for HEAD /all-methods
 * Uses $url() for type-safe key generation
 */
export function getHeadAllMethodsMutationKey() {
  return `HEAD ${client['all-methods'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchAllMethodsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['all-methods'].$patch(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /all-methods
 * Uses $url() for type-safe key generation
 */
export function getPatchAllMethodsMutationKey() {
  return `PATCH ${client['all-methods'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getTraceAllMethodsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['all-methods'].$trace(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for TRACE /all-methods
 * Uses $url() for type-safe key generation
 */
export function getTraceAllMethodsMutationKey() {
  return `TRACE ${client['all-methods'].$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetUsersUserIdPostsPostIdCommentsCommentIdKey(
  args: InferRequestType<
    (typeof client.users)[':userId']['posts'][':postId']['comments'][':commentId']['$get']
  >,
) {
  return client.users[':userId'].posts[':postId'].comments[':commentId'].$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetParamsTestPathParamKey(
  args: InferRequestType<(typeof client)['params-test'][':pathParam']['$get']>,
) {
  return client['params-test'][':pathParam'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostNoContentMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client['no-content'].$post(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /no-content
 * Uses $url() for type-safe key generation
 */
export function getPostNoContentMutationKey() {
  return `POST ${client['no-content'].$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetMultiContentKey() {
  return client['multi-content'].$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostMultiContentMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['multi-content']['$post']> },
      ) => parseResponse(client['multi-content'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /multi-content
 * Uses $url() for type-safe key generation
 */
export function getPostMultiContentMutationKey() {
  return `POST ${client['multi-content'].$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetResponseRangesKey() {
  return client['response-ranges'].$url().pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetDeprecatedKey() {
  return client.deprecated.$url().pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetNoOperationIdKey() {
  return client['no-operation-id'].$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostEmptyBodyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client)['empty-body']['$post']> }) =>
        parseResponse(client['empty-body'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /empty-body
 * Uses $url() for type-safe key generation
 */
export function getPostEmptyBodyMutationKey() {
  return `POST ${client['empty-body'].$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetCircularKey() {
  return client.circular.$url().pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetDeepNestingKey() {
  return client['deep-nesting'].$url().pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetArrayParamsKey(
  args: InferRequestType<(typeof client)['array-params']['$get']>,
) {
  return client['array-params'].$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetObjectParamKey(
  args: InferRequestType<(typeof client)['object-param']['$get']>,
) {
  return client['object-param'].$url(args).pathname
}

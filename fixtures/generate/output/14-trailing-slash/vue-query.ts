import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query cache key for GET /api/reverseChiban/
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetApiReverseChibanIndexQueryKey() {
  return ['api', 'GET', '/api/reverseChiban/'] as const
}

/**
 * Returns Vue Query query options for GET /api/reverseChiban/
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApiReverseChibanIndexQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetApiReverseChibanIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.api.reverseChiban.index.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /api/reverseChiban/
 *
 * Reverse Chiban (trailing slash)
 */
export function useGetApiReverseChibanIndex(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.api.reverseChiban.index.$get>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetApiReverseChibanIndexQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /api/reverseChiban
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetApiReverseChibanQueryKey() {
  return ['api', 'GET', '/api/reverseChiban'] as const
}

/**
 * Returns Vue Query query options for GET /api/reverseChiban
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApiReverseChibanQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetApiReverseChibanQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.api.reverseChiban.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /api/reverseChiban
 *
 * Reverse Chiban (no trailing slash)
 */
export function useGetApiReverseChiban(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.api.reverseChiban.$get>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetApiReverseChibanQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /posts/
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsIndexQueryKey(
  args: MaybeRef<InferRequestType<typeof client.posts.index.$get>>,
) {
  return ['posts', 'GET', '/posts/', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /posts/
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPostsIndexQueryOptions(
  args: InferRequestType<typeof client.posts.index.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPostsIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.posts.index.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /posts/
 *
 * List posts (trailing slash only)
 */
export function useGetPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.index.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPostsIndexQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /posts/
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPostsIndexMutationKey() {
  return ['posts', 'POST', '/posts/'] as const
}

/**
 * Returns Vue Query mutation options for POST /posts/
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPostsIndexMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostPostsIndexMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.posts.index.$post>) {
      return parseResponse(client.posts.index.$post(args, clientOptions))
    },
  }
}

/**
 * POST /posts/
 *
 * Create post (trailing slash only)
 */
export function usePostPostsIndex(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.index.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.posts.index.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostPostsIndexMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /users/{id}/
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersIdIndexQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
) {
  return ['users', 'GET', '/users/:id/', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /users/{id}/
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersIdIndexQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersIdIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':id'].index.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /users/{id}/
 *
 * Get user (trailing slash with path param)
 */
export function useGetUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.users)[':id']['index']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersIdIndexQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /items/
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetItemsIndexQueryKey() {
  return ['items', 'GET', '/items/'] as const
}

/**
 * Returns Vue Query query options for GET /items/
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetItemsIndexQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetItemsIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.items.index.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /items/
 *
 * List items (trailing slash only)
 */
export function useGetItemsIndex(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.index.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetItemsIndexQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

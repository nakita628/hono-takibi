import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/hono-rest-example'

/**
 * Generates Vue Query cache key for GET /
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetQueryKey() {
  return ['', '/'] as const
}

/**
 * Returns Vue Query query options for GET /
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.index.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /
 *
 * Welcome message
 *
 * Retrieve a simple welcome message from the Hono API.
 */
export function useGet(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.index.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /posts
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetPostsQueryKey(args: MaybeRef<InferRequestType<typeof client.posts.$get>>) {
  return ['posts', '/posts', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /posts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsQueryOptions = (
  args: InferRequestType<typeof client.posts.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPostsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.posts.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /posts
 *
 * Retrieve a list of posts
 *
 * Retrieve a paginated list of posts. Specify the page number and the number of posts per page.
 */
export function useGetPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.$get>>>>>,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPostsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /posts
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostPostsMutationKey() {
  return ['POST', '/posts'] as const
}

/**
 * Returns Vue Query mutation options for POST /posts
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPostsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostPostsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.posts.$post>) =>
    parseResponse(client.posts.$post(args, clientOptions)),
})

/**
 * POST /posts
 *
 * Create a new post
 *
 * Submit a new post with a maximum length of 140 characters.
 */
export function usePostPosts(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.$post>>>>>,
        Error,
        InferRequestType<typeof client.posts.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.posts.$post>) =>
      parseResponse(client.posts.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for PUT /posts/{id}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPutPostsIdMutationKey() {
  return ['PUT', '/posts/:id'] as const
}

/**
 * Returns Vue Query mutation options for PUT /posts/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutPostsIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutPostsIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.posts)[':id']['$put']>) =>
    parseResponse(client.posts[':id'].$put(args, clientOptions)),
})

/**
 * PUT /posts/{id}
 *
 * Update an existing post
 *
 * Update the content of an existing post identified by its unique ID.
 */
export function usePutPostsId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':id']['$put']>>>
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.posts)[':id']['$put']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.posts)[':id']['$put']>) =>
      parseResponse(client.posts[':id'].$put(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /posts/{id}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeletePostsIdMutationKey() {
  return ['DELETE', '/posts/:id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /posts/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeletePostsIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeletePostsIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.posts)[':id']['$delete']>) =>
    parseResponse(client.posts[':id'].$delete(args, clientOptions)),
})

/**
 * DELETE /posts/{id}
 *
 * Delete a post
 *
 * Delete an existing post identified by its unique ID.
 */
export function useDeletePostsId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':id']['$delete']>>>
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.posts)[':id']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.posts)[':id']['$delete']>) =>
      parseResponse(client.posts[':id'].$delete(args, clientOptions)),
  })
}

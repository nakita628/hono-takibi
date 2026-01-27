import type {
  QueryFunctionContext,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/hono-rest-example'

/**
 * Generates TanStack Query cache key for GET /
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetQueryKey() {
  return ['', 'GET', '/'] as const
}

/**
 * Returns TanStack Query query options for GET /
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
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.index.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /posts
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsQueryKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['posts', 'GET', '/posts', args] as const
}

/**
 * Returns TanStack Query query options for GET /posts
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
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPostsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /posts
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPostsMutationKey() {
  return ['posts', 'POST', '/posts'] as const
}

/**
 * Returns TanStack Query mutation options for POST /posts
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
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.$post>>>>>,
    Error,
    InferRequestType<typeof client.posts.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostPostsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query mutation key for PUT /posts/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutPostsIdMutationKey() {
  return ['posts', 'PUT', '/posts/:id'] as const
}

/**
 * Returns TanStack Query mutation options for PUT /posts/{id}
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
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':id']['$put']>>>>
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPutPostsIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query mutation key for DELETE /posts/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeletePostsIdMutationKey() {
  return ['posts', 'DELETE', '/posts/:id'] as const
}

/**
 * Returns TanStack Query mutation options for DELETE /posts/{id}
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
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':id']['$delete']>>>
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getDeletePostsIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

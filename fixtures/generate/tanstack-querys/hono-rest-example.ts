import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/hono-rest-example'

/**
 * GET /
 *
 * Welcome message
 *
 * Retrieve a simple welcome message from the Hono API.
 */
export function useGet(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.index.$get>,
      Error,
      InferResponseType<typeof client.index.$get>,
      readonly ['/']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.index.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /
 */
export function getGetQueryKey() {
  return ['/'] as const
}

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
      InferResponseType<typeof client.posts.$get>,
      Error,
      InferResponseType<typeof client.posts.$get>,
      readonly ['/posts', InferRequestType<typeof client.posts.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPostsQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.posts.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /posts
 */
export function getGetPostsQueryKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['/posts', args] as const
}

/**
 * POST /posts
 *
 * Create a new post
 *
 * Submit a new post with a maximum length of 140 characters.
 */
export function usePostPosts(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.posts.$post> | undefined,
      Error,
      InferRequestType<typeof client.posts.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.posts.$post> | undefined,
    Error,
    InferRequestType<typeof client.posts.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.posts.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /posts/{id}
 *
 * Update an existing post
 *
 * Update the content of an existing post identified by its unique ID.
 */
export function usePutPostsId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.posts)[':id']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':id']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':id']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':id']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.posts[':id'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /posts/{id}
 *
 * Delete a post
 *
 * Delete an existing post identified by its unique ID.
 */
export function useDeletePostsId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.posts)[':id']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':id']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.posts[':id'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

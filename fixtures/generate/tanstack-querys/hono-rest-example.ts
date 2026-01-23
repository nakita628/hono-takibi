import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.index.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.index.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /
 */
export function getGetQueryKey() {
  return ['GET', '/'] as const
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.posts.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPostsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.posts.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /posts
 */
export function getGetPostsQueryKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['GET', '/posts', args] as const
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

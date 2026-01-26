import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
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
export function useGet(options?: {
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
  return useQuery({ ...getGetQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /
 */
export function getGetQueryKey() {
  return ['/'] as const
}

/**
 * Returns TanStack Query query options for GET /
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.index.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
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
  return useQuery({ ...getGetPostsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /posts
 */
export function getGetPostsQueryKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['/posts', args] as const
}

/**
 * Returns TanStack Query query options for GET /posts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPostsQueryOptions = (
  args: InferRequestType<typeof client.posts.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPostsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.posts.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /posts
 *
 * Create a new post
 *
 * Submit a new post with a maximum length of 140 characters.
 */
export function usePostPosts(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.posts.$post>,
      variables: InferRequestType<typeof client.posts.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.posts.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.posts.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.posts.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.posts.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.posts.$post>) =>
      parseResponse(client.posts.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PUT /posts/{id}
 *
 * Update an existing post
 *
 * Update the content of an existing post identified by its unique ID.
 */
export function usePutPostsId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':id']['$put']> | undefined,
      variables: InferRequestType<(typeof client.posts)[':id']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':id']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':id']['$put']> | undefined | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':id']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.posts)[':id']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.posts)[':id']['$put']>) =>
      parseResponse(client.posts[':id'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /posts/{id}
 *
 * Delete a post
 *
 * Delete an existing post identified by its unique ID.
 */
export function useDeletePostsId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.posts)[':id']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.posts)[':id']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.posts)[':id']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.posts)[':id']['$delete']> | undefined | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.posts)[':id']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.posts)[':id']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.posts)[':id']['$delete']>) =>
      parseResponse(client.posts[':id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

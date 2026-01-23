import { useMutation, useQuery } from '@tanstack/vue-query'
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
export function useGet(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.index.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetPostsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.posts.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /posts
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
export function usePostPosts(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.posts.$post> | undefined,
    Error,
    InferRequestType<typeof client.posts.$post>
  >({ mutationFn: async (args) => parseResponse(client.posts.$post(args, clientOptions)) })
}

/**
 * PUT /posts/{id}
 *
 * Update an existing post
 *
 * Update the content of an existing post identified by its unique ID.
 */
export function usePutPostsId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':id']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':id']['$put']>
  >({ mutationFn: async (args) => parseResponse(client.posts[':id'].$put(args, clientOptions)) })
}

/**
 * DELETE /posts/{id}
 *
 * Delete a post
 *
 * Delete an existing post identified by its unique ID.
 */
export function useDeletePostsId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.posts)[':id']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':id']['$delete']>
  >({ mutationFn: async (args) => parseResponse(client.posts[':id'].$delete(args, clientOptions)) })
}

import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/hono-rest-example'

/**
 * GET /
 *
 * Welcome message
 *
 * Retrieve a simple welcome message from the Hono API.
 */
export function useGet(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.index.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetKey() : null)
  const query = useSWR<InferResponseType<typeof client.index.$get>, Error>(
    swrKey,
    async () => parseResponse(client.index.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /
 */
export function getGetKey() {
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
    swr?: SWRConfiguration<InferResponseType<typeof client.posts.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPostsKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.posts.$get>, Error>(
    swrKey,
    async () => parseResponse(client.posts.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /posts
 */
export function getGetPostsKey(args?: InferRequestType<typeof client.posts.$get>) {
  return ['/posts', ...(args ? [args] : [])] as const
}

/**
 * POST /posts
 *
 * Create a new post
 *
 * Submit a new post with a maximum length of 140 characters.
 */
export function usePostPosts(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.posts.$post>,
    Error,
    string,
    InferRequestType<typeof client.posts.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.posts.$post>,
    Error,
    string,
    InferRequestType<typeof client.posts.$post>
  >(
    'POST /posts',
    async (_, { arg }) => parseResponse(client.posts.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PUT /posts/{id}
 *
 * Update an existing post
 *
 * Update the content of an existing post identified by its unique ID.
 */
export function usePutPostsId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.posts)[':id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':id']['$put']>
  >(
    'PUT /posts/:id',
    async (_, { arg }) => parseResponse(client.posts[':id'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /posts/{id}
 *
 * Delete a post
 *
 * Delete an existing post identified by its unique ID.
 */
export function useDeletePostsId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.posts)[':id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.posts)[':id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.posts)[':id']['$delete']>
  >(
    'DELETE /posts/:id',
    async (_, { arg }) => parseResponse(client.posts[':id'].$delete(arg, options?.client)),
    options?.swr,
  )
}

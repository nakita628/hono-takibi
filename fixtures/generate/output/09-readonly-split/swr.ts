import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates SWR cache key for GET /posts
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['posts', 'GET', '/posts', args] as const
}

/**
 * GET /posts
 */
export async function getPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.$get(args, options))
}

/**
 * GET /posts
 */
export function useGetPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPostsKey(args)) : null
  return { swrKey, ...useSWR(swrKey, async () => getPosts(args, clientOptions), restSwrOptions) }
}

/**
 * GET /posts
 */
export function useImmutableGetPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPostsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getPosts(args, clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /posts
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetPostsInfiniteKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['posts', 'GET', '/posts', args, 'infinite'] as const
}

/**
 * GET /posts
 */
export function useInfiniteGetPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getPosts>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetPostsInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getPosts(args, clientOptions), restSwrOptions)
}

/**
 * Generates SWR mutation key for POST /posts
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPostsMutationKey() {
  return ['posts', 'POST', '/posts'] as const
}

/**
 * POST /posts
 */
export async function postPosts(
  args: InferRequestType<typeof client.posts.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.$post(args, options))
}

/**
 * POST /posts
 */
export function usePostPosts(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postPosts>>,
    Error,
    Key,
    InferRequestType<typeof client.posts.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPostsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.posts.$post> }) =>
        postPosts(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /posts/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsIdKey(args: InferRequestType<(typeof client.posts)[':id']['$get']>) {
  return ['posts', 'GET', '/posts/:id', args] as const
}

/**
 * GET /posts/{id}
 */
export async function getPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$get(args, options))
}

/**
 * GET /posts/{id}
 */
export function useGetPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPostsIdKey(args)) : null
  return { swrKey, ...useSWR(swrKey, async () => getPostsId(args, clientOptions), restSwrOptions) }
}

/**
 * GET /posts/{id}
 */
export function useImmutableGetPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPostsIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getPostsId(args, clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /posts/{id}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetPostsIdInfiniteKey(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
) {
  return ['posts', 'GET', '/posts/:id', args, 'infinite'] as const
}

/**
 * GET /posts/{id}
 */
export function useInfiniteGetPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getPostsId>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetPostsIdInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getPostsId(args, clientOptions), restSwrOptions)
}

/**
 * Generates SWR mutation key for PUT /posts/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutPostsIdMutationKey() {
  return ['posts', 'PUT', '/posts/:id'] as const
}

/**
 * PUT /posts/{id}
 */
export async function putPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$put(args, options))
}

/**
 * PUT /posts/{id}
 */
export function usePutPostsId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof putPostsId>>,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':id']['$put']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutPostsIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client.posts)[':id']['$put']> }) =>
        putPostsId(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /posts/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeletePostsIdMutationKey() {
  return ['posts', 'DELETE', '/posts/:id'] as const
}

/**
 * DELETE /posts/{id}
 */
export async function deletePostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$delete(args, options))
}

/**
 * DELETE /posts/{id}
 */
export function useDeletePostsId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof deletePostsId>> | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':id']['$delete']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeletePostsIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client.posts)[':id']['$delete']> }) =>
        deletePostsId(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /posts/{id}/comments
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsIdCommentsKey(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
) {
  return ['posts', 'GET', '/posts/:id/comments', args] as const
}

/**
 * GET /posts/{id}/comments
 */
export async function getPostsIdComments(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].comments.$get(args, options))
}

/**
 * GET /posts/{id}/comments
 */
export function useGetPostsIdComments(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPostsIdCommentsKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getPostsIdComments(args, clientOptions), restSwrOptions),
  }
}

/**
 * GET /posts/{id}/comments
 */
export function useImmutableGetPostsIdComments(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPostsIdCommentsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getPostsIdComments(args, clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /posts/{id}/comments
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetPostsIdCommentsInfiniteKey(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
) {
  return ['posts', 'GET', '/posts/:id/comments', args, 'infinite'] as const
}

/**
 * GET /posts/{id}/comments
 */
export function useInfiniteGetPostsIdComments(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getPostsIdComments>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ??
    ((index: number) => [...getGetPostsIdCommentsInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => getPostsIdComments(args, clientOptions),
    restSwrOptions,
  )
}

/**
 * Generates SWR mutation key for POST /posts/{id}/comments
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPostsIdCommentsMutationKey() {
  return ['posts', 'POST', '/posts/:id/comments'] as const
}

/**
 * POST /posts/{id}/comments
 */
export async function postPostsIdComments(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].comments.$post(args, options))
}

/**
 * POST /posts/{id}/comments
 */
export function usePostPostsIdComments(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postPostsIdComments>>,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':id']['comments']['$post']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPostsIdCommentsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.posts)[':id']['comments']['$post']> },
      ) => postPostsIdComments(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /tags
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetTagsKey() {
  return ['tags', 'GET', '/tags'] as const
}

/**
 * GET /tags
 */
export async function getTags(options?: ClientRequestOptions) {
  return await parseResponse(client.tags.$get(undefined, options))
}

/**
 * GET /tags
 */
export function useGetTags(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTagsKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getTags(clientOptions), restSwrOptions) }
}

/**
 * GET /tags
 */
export function useImmutableGetTags(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTagsKey()) : null
  return { swrKey, ...useSWRImmutable(swrKey, async () => getTags(clientOptions), restSwrOptions) }
}

/**
 * Generates SWR infinite query cache key for GET /tags
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetTagsInfiniteKey() {
  return ['tags', 'GET', '/tags', 'infinite'] as const
}

/**
 * GET /tags
 */
export function useInfiniteGetTags(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getTags>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetTagsInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getTags(clientOptions), restSwrOptions)
}

import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '@/lib'

/**
 * Generates SWR mutation key for POST /comments
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostCommentsMutationKey() {
  return ['comments', 'POST', '/comments'] as const
}

/**
 * POST /comments
 */
export async function postComments(
  args: InferRequestType<typeof client.comments.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.comments.$post(args, options))
}

/**
 * POST /comments
 */
export function usePostComments(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postComments>>,
    Error,
    Key,
    InferRequestType<typeof client.comments.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostCommentsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.comments.$post> }) =>
        postComments(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /current
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetCurrentKey() {
  return ['current', 'GET', '/current'] as const
}

/**
 * GET /current
 */
export async function getCurrent(options?: ClientRequestOptions) {
  return await parseResponse(client.current.$get(undefined, options))
}

/**
 * GET /current
 */
export function useGetCurrent(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCurrentKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getCurrent(clientOptions), restSwrOptions) }
}

/**
 * GET /current
 */
export function useImmutableGetCurrent(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCurrentKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getCurrent(clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /current
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetCurrentInfiniteKey() {
  return ['current', 'GET', '/current', 'infinite'] as const
}

/**
 * GET /current
 */
export function useInfiniteGetCurrent(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getCurrent>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetCurrentInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getCurrent(clientOptions), restSwrOptions)
}

/**
 * Generates SWR mutation key for PATCH /edit
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchEditMutationKey() {
  return ['edit', 'PATCH', '/edit'] as const
}

/**
 * PATCH /edit
 */
export async function patchEdit(
  args: InferRequestType<typeof client.edit.$patch>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.edit.$patch(args, options))
}

/**
 * PATCH /edit
 */
export function usePatchEdit(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof patchEdit>>,
    Error,
    Key,
    InferRequestType<typeof client.edit.$patch>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchEditMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.edit.$patch> }) =>
        patchEdit(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /follow
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFollowMutationKey() {
  return ['follow', 'POST', '/follow'] as const
}

/**
 * POST /follow
 */
export async function postFollow(
  args: InferRequestType<typeof client.follow.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.follow.$post(args, options))
}

/**
 * POST /follow
 */
export function usePostFollow(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postFollow>>,
    Error,
    Key,
    InferRequestType<typeof client.follow.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFollowMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.follow.$post> }) =>
        postFollow(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /follow
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteFollowMutationKey() {
  return ['follow', 'DELETE', '/follow'] as const
}

/**
 * DELETE /follow
 */
export async function deleteFollow(
  args: InferRequestType<typeof client.follow.$delete>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.follow.$delete(args, options))
}

/**
 * DELETE /follow
 */
export function useDeleteFollow(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof deleteFollow>>,
    Error,
    Key,
    InferRequestType<typeof client.follow.$delete>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteFollowMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.follow.$delete> }) =>
        deleteFollow(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /like
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostLikeMutationKey() {
  return ['like', 'POST', '/like'] as const
}

/**
 * POST /like
 */
export async function postLike(
  args: InferRequestType<typeof client.like.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.like.$post(args, options))
}

/**
 * POST /like
 */
export function usePostLike(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postLike>>,
    Error,
    Key,
    InferRequestType<typeof client.like.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLikeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.like.$post> }) =>
        postLike(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /like
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteLikeMutationKey() {
  return ['like', 'DELETE', '/like'] as const
}

/**
 * DELETE /like
 */
export async function deleteLike(
  args: InferRequestType<typeof client.like.$delete>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.like.$delete(args, options))
}

/**
 * DELETE /like
 */
export function useDeleteLike(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof deleteLike>>,
    Error,
    Key,
    InferRequestType<typeof client.like.$delete>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteLikeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.like.$delete> }) =>
        deleteLike(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /notifications/{userId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetNotificationsUserIdKey(
  args: InferRequestType<(typeof client.notifications)[':userId']['$get']>,
) {
  return ['notifications', 'GET', '/notifications/:userId', args] as const
}

/**
 * GET /notifications/{userId}
 */
export async function getNotificationsUserId(
  args: InferRequestType<(typeof client.notifications)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.notifications[':userId'].$get(args, options))
}

/**
 * GET /notifications/{userId}
 */
export function useGetNotificationsUserId(
  args: InferRequestType<(typeof client.notifications)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNotificationsUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getNotificationsUserId(args, clientOptions), restSwrOptions),
  }
}

/**
 * GET /notifications/{userId}
 */
export function useImmutableGetNotificationsUserId(
  args: InferRequestType<(typeof client.notifications)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNotificationsUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => getNotificationsUserId(args, clientOptions),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR infinite query cache key for GET /notifications/{userId}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetNotificationsUserIdInfiniteKey(
  args: InferRequestType<(typeof client.notifications)[':userId']['$get']>,
) {
  return ['notifications', 'GET', '/notifications/:userId', args, 'infinite'] as const
}

/**
 * GET /notifications/{userId}
 */
export function useInfiniteGetNotificationsUserId(
  args: InferRequestType<(typeof client.notifications)[':userId']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getNotificationsUserId>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ??
    ((index: number) => [...getGetNotificationsUserIdInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => getNotificationsUserId(args, clientOptions),
    restSwrOptions,
  )
}

/**
 * Generates SWR mutation key for POST /notifications
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostNotificationsMutationKey() {
  return ['notifications', 'POST', '/notifications'] as const
}

/**
 * POST /notifications
 */
export async function postNotifications(
  args: InferRequestType<typeof client.notifications.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.notifications.$post(args, options))
}

/**
 * POST /notifications
 */
export function usePostNotifications(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postNotifications>>,
    Error,
    Key,
    InferRequestType<typeof client.notifications.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostNotificationsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.notifications.$post> }) =>
        postNotifications(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

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
 * Generates SWR cache key for GET /posts/{postId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsPostIdKey(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
) {
  return ['posts', 'GET', '/posts/:postId', args] as const
}

/**
 * GET /posts/{postId}
 */
export async function getPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':postId'].$get(args, options))
}

/**
 * GET /posts/{postId}
 */
export function useGetPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPostsPostIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getPostsPostId(args, clientOptions), restSwrOptions),
  }
}

/**
 * GET /posts/{postId}
 */
export function useImmutableGetPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPostsPostIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getPostsPostId(args, clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /posts/{postId}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetPostsPostIdInfiniteKey(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
) {
  return ['posts', 'GET', '/posts/:postId', args, 'infinite'] as const
}

/**
 * GET /posts/{postId}
 */
export function useInfiniteGetPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getPostsPostId>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetPostsPostIdInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getPostsPostId(args, clientOptions), restSwrOptions)
}

/**
 * Generates SWR mutation key for POST /register
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostRegisterMutationKey() {
  return ['register', 'POST', '/register'] as const
}

/**
 * POST /register
 */
export async function postRegister(
  args: InferRequestType<typeof client.register.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.register.$post(args, options))
}

/**
 * POST /register
 */
export function usePostRegister(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postRegister>>,
    Error,
    Key,
    InferRequestType<typeof client.register.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostRegisterMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.register.$post> }) =>
        postRegister(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /search
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSearchKey(args: InferRequestType<typeof client.search.$get>) {
  return ['search', 'GET', '/search', args] as const
}

/**
 * GET /search
 */
export async function getSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.search.$get(args, options))
}

/**
 * GET /search
 */
export function useGetSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSearchKey(args)) : null
  return { swrKey, ...useSWR(swrKey, async () => getSearch(args, clientOptions), restSwrOptions) }
}

/**
 * GET /search
 */
export function useImmutableGetSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSearchKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getSearch(args, clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /search
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetSearchInfiniteKey(args: InferRequestType<typeof client.search.$get>) {
  return ['search', 'GET', '/search', args, 'infinite'] as const
}

/**
 * GET /search
 */
export function useInfiniteGetSearch(
  args: InferRequestType<typeof client.search.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getSearch>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetSearchInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getSearch(args, clientOptions), restSwrOptions)
}

/**
 * Generates SWR cache key for GET /users/{userId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersUserIdKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['users', 'GET', '/users/:userId', args] as const
}

/**
 * GET /users/{userId}
 */
export async function getUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$get(args, options))
}

/**
 * GET /users/{userId}
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getUsersUserId(args, clientOptions), restSwrOptions),
  }
}

/**
 * GET /users/{userId}
 */
export function useImmutableGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getUsersUserId(args, clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /users/{userId}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersUserIdInfiniteKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['users', 'GET', '/users/:userId', args, 'infinite'] as const
}

/**
 * GET /users/{userId}
 */
export function useInfiniteGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getUsersUserId>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersUserIdInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getUsersUserId(args, clientOptions), restSwrOptions)
}

/**
 * Generates SWR cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', 'GET', '/users', args] as const
}

/**
 * GET /users
 */
export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

/**
 * GET /users
 */
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey(args)) : null
  return { swrKey, ...useSWR(swrKey, async () => getUsers(args, clientOptions), restSwrOptions) }
}

/**
 * GET /users
 */
export function useImmutableGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getUsers(args, clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersInfiniteKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', 'GET', '/users', args, 'infinite'] as const
}

/**
 * GET /users
 */
export function useInfiniteGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getUsers>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getUsers(args, clientOptions), restSwrOptions)
}

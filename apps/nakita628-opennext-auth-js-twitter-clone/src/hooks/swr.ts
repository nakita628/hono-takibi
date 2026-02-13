import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
export function usePostComments(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comments.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.comments.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostCommentsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.comments.$post> }) =>
        parseResponse(client.comments.$post(arg, clientOptions)),
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
export function useGetCurrent(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetCurrentKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.current.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
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
export function usePatchEdit(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.edit.$patch>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.edit.$patch>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchEditMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.edit.$patch> }) =>
        parseResponse(client.edit.$patch(arg, clientOptions)),
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
export function usePostFollow(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.follow.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.follow.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFollowMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.follow.$post> }) =>
        parseResponse(client.follow.$post(arg, clientOptions)),
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
export function useDeleteFollow(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.follow.$delete>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.follow.$delete>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteFollowMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.follow.$delete> }) =>
        parseResponse(client.follow.$delete(arg, clientOptions)),
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
export function usePostLike(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.like.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.like.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLikeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.like.$post> }) =>
        parseResponse(client.like.$post(arg, clientOptions)),
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
export function useDeleteLike(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.like.$delete>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.like.$delete>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteLikeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.like.$delete> }) =>
        parseResponse(client.like.$delete(arg, clientOptions)),
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
export function useGetNotificationsUserId(
  args: InferRequestType<(typeof client.notifications)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetNotificationsUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.notifications[':userId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
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
export function usePostNotifications(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.notifications.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.notifications.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostNotificationsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.notifications.$post> }) =>
        parseResponse(client.notifications.$post(arg, clientOptions)),
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
export function useGetPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetPostsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.posts.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
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
export function usePostPosts(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.posts.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPostsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.posts.$post> }) =>
        parseResponse(client.posts.$post(arg, clientOptions)),
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
export function useGetPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetPostsPostIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.posts[':postId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
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
export function usePostRegister(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.register.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.register.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostRegisterMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.register.$post> }) =>
        parseResponse(client.register.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
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
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetUsersUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetUsersKey() {
  return ['users', 'GET', '/users'] as const
}

/**
 * GET /users
 */
export function useGetUsers(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetUsersKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

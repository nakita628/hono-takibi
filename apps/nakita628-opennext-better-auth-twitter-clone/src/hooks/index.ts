import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '@/lib'

export function getPostCommentsMutationKey() {
  return ['comments', 'POST', '/comments'] as const
}

export async function postComments(
  args: InferRequestType<typeof client.comments.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.comments.$post(args, options))
}

export function usePostComments(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postComments>>,
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
        postComments(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export function getGetCurrentKey() {
  return ['current', 'GET', '/current'] as const
}

export async function getCurrent(options?: ClientRequestOptions) {
  return await parseResponse(client.current.$get(undefined, options))
}

export function useGetCurrent(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCurrentKey()) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getCurrent(clientOptions), restSwrOptions),
  }
}

export function getPatchEditMutationKey() {
  return ['edit', 'PATCH', '/edit'] as const
}

export async function patchEdit(
  args: InferRequestType<typeof client.edit.$patch>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.edit.$patch(args, options))
}

export function usePatchEdit(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof patchEdit>>,
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
        patchEdit(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export function getPostFollowMutationKey() {
  return ['follow', 'POST', '/follow'] as const
}

export async function postFollow(
  args: InferRequestType<typeof client.follow.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.follow.$post(args, options))
}

export function usePostFollow(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postFollow>>,
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
        postFollow(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export function getDeleteFollowMutationKey() {
  return ['follow', 'DELETE', '/follow'] as const
}

export async function deleteFollow(
  args: InferRequestType<typeof client.follow.$delete>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.follow.$delete(args, options))
}

export function useDeleteFollow(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof deleteFollow>>,
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
        deleteFollow(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export function getPostLikeMutationKey() {
  return ['like', 'POST', '/like'] as const
}

export async function postLike(
  args: InferRequestType<typeof client.like.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.like.$post(args, options))
}

export function usePostLike(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postLike>>,
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
        postLike(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export function getDeleteLikeMutationKey() {
  return ['like', 'DELETE', '/like'] as const
}

export async function deleteLike(
  args: InferRequestType<typeof client.like.$delete>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.like.$delete(args, options))
}

export function useDeleteLike(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof deleteLike>>,
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
        deleteLike(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export function getGetNotificationsUserIdKey(
  args: InferRequestType<(typeof client.notifications)[':userId']['$get']>,
) {
  return ['notifications', 'GET', '/notifications/:userId', args] as const
}

export async function getNotificationsUserId(
  args: InferRequestType<(typeof client.notifications)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.notifications[':userId'].$get(args, options))
}

export function useGetNotificationsUserId(
  args: InferRequestType<(typeof client.notifications)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetNotificationsUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getNotificationsUserId(args, clientOptions), restSwrOptions),
  }
}

export function getPostNotificationsMutationKey() {
  return ['notifications', 'POST', '/notifications'] as const
}

export async function postNotifications(
  args: InferRequestType<typeof client.notifications.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.notifications.$post(args, options))
}

export function usePostNotifications(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postNotifications>>,
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
        postNotifications(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export function getGetPostsKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['posts', 'GET', '/posts', args] as const
}

export async function getPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.$get(args, options))
}

export function useGetPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPostsKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getPosts(args, clientOptions), restSwrOptions),
  }
}

export function getPostPostsMutationKey() {
  return ['posts', 'POST', '/posts'] as const
}

export async function postPosts(
  args: InferRequestType<typeof client.posts.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.$post(args, options))
}

export function usePostPosts(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postPosts>>,
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
        postPosts(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export function getGetPostsPostIdKey(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
) {
  return ['posts', 'GET', '/posts/:postId', args] as const
}

export async function getPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':postId'].$get(args, options))
}

export function useGetPostsPostId(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPostsPostIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getPostsPostId(args, clientOptions), restSwrOptions),
  }
}

export function getPostRegisterMutationKey() {
  return ['register', 'POST', '/register'] as const
}

export async function postRegister(
  args: InferRequestType<typeof client.register.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.register.$post(args, options))
}

export function usePostRegister(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postRegister>>,
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
        postRegister(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export function getGetSearchKey(args: InferRequestType<typeof client.search.$get>) {
  return ['search', 'GET', '/search', args] as const
}

export async function getSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.search.$get(args, options))
}

export function useGetSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSearchKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getSearch(args, clientOptions), restSwrOptions),
  }
}

export function getGetUsersUserIdKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['users', 'GET', '/users/:userId', args] as const
}

export async function getUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$get(args, options))
}

export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getUsersUserId(args, clientOptions), restSwrOptions),
  }
}

export function getGetUsersKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', 'GET', '/users', args] as const
}

export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getUsers(args, clientOptions), restSwrOptions),
  }
}

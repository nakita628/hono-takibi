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

export function getCommentsKey() {
  return ['comments'] as const
}

export function getCurrentKey() {
  return ['current'] as const
}

export function getEditKey() {
  return ['edit'] as const
}

export function getFollowKey() {
  return ['follow'] as const
}

export function getLikeKey() {
  return ['like'] as const
}

export function getNotificationsKey() {
  return ['notifications'] as const
}

export function getPostsKey() {
  return ['posts'] as const
}

export function getSearchKey() {
  return ['search'] as const
}

export function getUsersKey() {
  return ['users'] as const
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
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['comments', '/comments', 'POST'] as const)
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
  return ['current', '/current'] as const
}

export async function getCurrent(options?: ClientRequestOptions) {
  return await parseResponse(client.current.$get(undefined, options))
}

export function useGetCurrent(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCurrentKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getCurrent(clientOptions), restSwrOptions) }
}

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

export function getGetCurrentInfiniteKey() {
  return ['current', '/current', 'infinite'] as const
}

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
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['edit', '/edit', 'PATCH'] as const)
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
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['follow', '/follow', 'POST'] as const)
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
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['follow', '/follow', 'DELETE'] as const)
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
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['like', '/like', 'POST'] as const)
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
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['like', '/like', 'DELETE'] as const)
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
  return ['notifications', '/notifications/:userId', args] as const
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

export function getGetNotificationsUserIdInfiniteKey(
  args: InferRequestType<(typeof client.notifications)[':userId']['$get']>,
) {
  return ['notifications', '/notifications/:userId', args, 'infinite'] as const
}

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
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['notifications', '/notifications', 'POST'] as const)
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
  return ['posts', '/posts', args] as const
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
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPostsKey(args)) : null
  return { swrKey, ...useSWR(swrKey, async () => getPosts(args, clientOptions), restSwrOptions) }
}

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

export function getGetPostsInfiniteKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['posts', '/posts', args, 'infinite'] as const
}

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
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['posts', '/posts', 'POST'] as const)
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
  return ['posts', '/posts/:postId', args] as const
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

export function getGetPostsPostIdInfiniteKey(
  args: InferRequestType<(typeof client.posts)[':postId']['$get']>,
) {
  return ['posts', '/posts/:postId', args, 'infinite'] as const
}

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

export function getGetSearchKey(args: InferRequestType<typeof client.search.$get>) {
  return ['search', '/search', args] as const
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
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSearchKey(args)) : null
  return { swrKey, ...useSWR(swrKey, async () => getSearch(args, clientOptions), restSwrOptions) }
}

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

export function getGetSearchInfiniteKey(args: InferRequestType<typeof client.search.$get>) {
  return ['search', '/search', args, 'infinite'] as const
}

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

export function getGetUsersUserIdKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['users', '/users/:userId', args] as const
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

export function getGetUsersUserIdInfiniteKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['users', '/users/:userId', args, 'infinite'] as const
}

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

export function getGetUsersKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
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
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey(args)) : null
  return { swrKey, ...useSWR(swrKey, async () => getUsers(args, clientOptions), restSwrOptions) }
}

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

export function getGetUsersInfiniteKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args, 'infinite'] as const
}

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

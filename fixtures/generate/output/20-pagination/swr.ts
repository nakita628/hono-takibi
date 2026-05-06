import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getHealthKey() {
  return ['health'] as const
}

export function getPostsKey() {
  return ['posts'] as const
}

export function getUsersKey() {
  return ['users'] as const
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

export function useInfiniteGetUsers<TError = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getUsers>>, TError> & {
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

export function useInfiniteGetPosts<TError = unknown>(
  args: InferRequestType<typeof client.posts.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getPosts>>, TError> & {
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

export function getGetHealthKey() {
  return ['health', '/health'] as const
}

export async function getHealth(options?: ClientRequestOptions) {
  return await parseResponse(client.health.$get(undefined, options))
}

export function useGetHealth(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHealthKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getHealth(clientOptions), restSwrOptions) }
}

export function useImmutableGetHealth(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHealthKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getHealth(clientOptions), restSwrOptions),
  }
}

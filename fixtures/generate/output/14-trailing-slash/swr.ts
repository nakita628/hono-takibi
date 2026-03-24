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

export function getApiKey() {
  return ['api'] as const
}

export function getItemsKey() {
  return ['items'] as const
}

export function getPostsKey() {
  return ['posts'] as const
}

export function getUsersKey() {
  return ['users'] as const
}

export function getGetApiReverseChibanIndexKey() {
  return ['api', '/api/reverseChiban/'] as const
}

export async function getApiReverseChibanIndex(options?: ClientRequestOptions) {
  return await parseResponse(client.api.reverseChiban.index.$get(undefined, options))
}

export function useGetApiReverseChibanIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetApiReverseChibanIndexKey()) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getApiReverseChibanIndex(clientOptions), restSwrOptions),
  }
}

export function useImmutableGetApiReverseChibanIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetApiReverseChibanIndexKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getApiReverseChibanIndex(clientOptions), restSwrOptions),
  }
}

export function getGetApiReverseChibanIndexInfiniteKey() {
  return ['api', '/api/reverseChiban/', 'infinite'] as const
}

export function useInfiniteGetApiReverseChibanIndex(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getApiReverseChibanIndex>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ??
    ((index: number) => [...getGetApiReverseChibanIndexInfiniteKey(), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => getApiReverseChibanIndex(clientOptions),
    restSwrOptions,
  )
}

export function getGetApiReverseChibanKey() {
  return ['api', '/api/reverseChiban'] as const
}

export async function getApiReverseChiban(options?: ClientRequestOptions) {
  return await parseResponse(client.api.reverseChiban.$get(undefined, options))
}

export function useGetApiReverseChiban(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetApiReverseChibanKey()) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getApiReverseChiban(clientOptions), restSwrOptions),
  }
}

export function useImmutableGetApiReverseChiban(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetApiReverseChibanKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getApiReverseChiban(clientOptions), restSwrOptions),
  }
}

export function getGetApiReverseChibanInfiniteKey() {
  return ['api', '/api/reverseChiban', 'infinite'] as const
}

export function useInfiniteGetApiReverseChiban(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getApiReverseChiban>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetApiReverseChibanInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getApiReverseChiban(clientOptions), restSwrOptions)
}

export function getGetPostsIndexKey(args: InferRequestType<typeof client.posts.index.$get>) {
  return ['posts', '/posts/', args] as const
}

export async function getPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.index.$get(args, options))
}

export function useGetPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPostsIndexKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getPostsIndex(args, clientOptions), restSwrOptions),
  }
}

export function useImmutableGetPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPostsIndexKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getPostsIndex(args, clientOptions), restSwrOptions),
  }
}

export function getGetPostsIndexInfiniteKey(
  args: InferRequestType<typeof client.posts.index.$get>,
) {
  return ['posts', '/posts/', args, 'infinite'] as const
}

export function useInfiniteGetPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getPostsIndex>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetPostsIndexInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getPostsIndex(args, clientOptions), restSwrOptions)
}

export async function postPostsIndex(
  args: InferRequestType<typeof client.posts.index.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.index.$post(args, options))
}

export function usePostPostsIndex(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postPostsIndex>>,
    Error,
    Key,
    InferRequestType<typeof client.posts.index.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['posts', '/posts/', 'POST'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.posts.index.$post> }) =>
        postPostsIndex(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export function getGetUsersIdIndexKey(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
) {
  return ['users', '/users/:id/', args] as const
}

export async function getUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].index.$get(args, options))
}

export function useGetUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersIdIndexKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getUsersIdIndex(args, clientOptions), restSwrOptions),
  }
}

export function useImmutableGetUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersIdIndexKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getUsersIdIndex(args, clientOptions), restSwrOptions),
  }
}

export function getGetUsersIdIndexInfiniteKey(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
) {
  return ['users', '/users/:id/', args, 'infinite'] as const
}

export function useInfiniteGetUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getUsersIdIndex>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersIdIndexInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getUsersIdIndex(args, clientOptions), restSwrOptions)
}

export function getGetItemsIndexKey() {
  return ['items', '/items/'] as const
}

export async function getItemsIndex(options?: ClientRequestOptions) {
  return await parseResponse(client.items.index.$get(undefined, options))
}

export function useGetItemsIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetItemsIndexKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getItemsIndex(clientOptions), restSwrOptions) }
}

export function useImmutableGetItemsIndex(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetItemsIndexKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getItemsIndex(clientOptions), restSwrOptions),
  }
}

export function getGetItemsIndexInfiniteKey() {
  return ['items', '/items/', 'infinite'] as const
}

export function useInfiniteGetItemsIndex(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getItemsIndex>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetItemsIndexInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getItemsIndex(clientOptions), restSwrOptions)
}

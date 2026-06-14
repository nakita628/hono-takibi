import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetPaginationUsersUserIdPostsKey(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
) {
  return ['pagination', '/pagination/users/:userId/posts', args] as const
}

export function useGetPaginationUsersUserIdPosts(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPaginationUsersUserIdPostsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.pagination.users[':userId'].posts.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPaginationUsersUserIdPosts(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPaginationUsersUserIdPostsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.pagination.users[':userId'].posts.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetPaginationUsersUserIdPostsInfiniteKey(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
) {
  return ['pagination', '/pagination/users/:userId/posts', args, 'infinite'] as const
}

export function useInfiniteGetPaginationUsersUserIdPosts<TError = unknown>(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      TError
    > & { swrKey?: SWRInfiniteKeyLoader }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ??
    ((index: number) => [...getGetPaginationUsersUserIdPostsInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.pagination.users[':userId'].posts.$get(args, clientOptions)),
    restSwrOptions,
  )
}

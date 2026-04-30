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

export function getPostsKey() {
  return ['posts'] as const
}

export function getTagsKey() {
  return ['tags'] as const
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

export function getGetPostsIdKey(args: InferRequestType<(typeof client.posts)[':id']['$get']>) {
  return ['posts', '/posts/:id', args] as const
}

export async function getPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$get(args, options))
}

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

export function getGetPostsIdInfiniteKey(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
) {
  return ['posts', '/posts/:id', args, 'infinite'] as const
}

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

export async function putPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$put(args, options))
}

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
  const swrKey = customKey ?? (['posts', '/posts/:id', 'PUT'] as const)
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

export async function deletePostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$delete(args, options))
}

export function useDeletePostsId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof deletePostsId>>  ,
    Error,
    Key,
    InferRequestType<(typeof client.posts)[':id']['$delete']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['posts', '/posts/:id', 'DELETE'] as const)
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

export function getGetPostsIdCommentsKey(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
) {
  return ['posts', '/posts/:id/comments', args] as const
}

export async function getPostsIdComments(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].comments.$get(args, options))
}

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

export function getGetPostsIdCommentsInfiniteKey(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
) {
  return ['posts', '/posts/:id/comments', args, 'infinite'] as const
}

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

export async function postPostsIdComments(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].comments.$post(args, options))
}

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
  const swrKey = customKey ?? (['posts', '/posts/:id/comments', 'POST'] as const)
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

export function getGetTagsKey() {
  return ['tags', '/tags'] as const
}

export async function getTags(options?: ClientRequestOptions) {
  return await parseResponse(client.tags.$get(undefined, options))
}

export function useGetTags(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTagsKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getTags(clientOptions), restSwrOptions) }
}

export function useImmutableGetTags(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetTagsKey()) : null
  return { swrKey, ...useSWRImmutable(swrKey, async () => getTags(clientOptions), restSwrOptions) }
}

export function getGetTagsInfiniteKey() {
  return ['tags', '/tags', 'infinite'] as const
}

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

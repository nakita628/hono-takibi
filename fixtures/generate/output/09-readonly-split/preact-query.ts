import {
  useQuery,
  useSuspenseQuery,
  useMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/preact-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseMutationOptions,
} from '@tanstack/preact-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getPostsKey() {
  return ['posts'] as const
}

export function getTagsKey() {
  return ['tags'] as const
}

export function getPostsQueryKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['posts', '/posts', args] as const
}

export async function getPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.$get(args, options))
}

export function getPostsQueryOptions(
  args: InferRequestType<typeof client.posts.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPostsQueryKey(args),
    queryFn({ signal }) {
      return getPosts(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function usePosts<TData = Awaited<ReturnType<typeof getPosts>>, TError = unknown>(
  args: InferRequestType<typeof client.posts.$get>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPostsQueryKey(args),
    queryFn({ signal }) {
      return getPosts(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspensePosts<TData = Awaited<ReturnType<typeof getPosts>>, TError = unknown>(
  args: InferRequestType<typeof client.posts.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getPostsQueryKey(args),
    queryFn({ signal }) {
      return getPosts(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export async function postPosts(
  args: InferRequestType<typeof client.posts.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.$post(args, options))
}

export function getPostPostsMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof postPosts>>,
    TError,
    InferRequestType<typeof client.posts.$post>
  >({
    mutationKey: ['posts', '/posts', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.posts.$post>) {
      return postPosts(args, options)
    },
  })
}

export function usePostPosts<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPosts>>,
    TError,
    InferRequestType<typeof client.posts.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostPostsMutationOptions<TError>(clientOptions) })
}

export function getPostsIdQueryKey(args: InferRequestType<(typeof client.posts)[':id']['$get']>) {
  return ['posts', '/posts/:id', args] as const
}

export async function getPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$get(args, options))
}

export function getPostsIdQueryOptions(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPostsIdQueryKey(args),
    queryFn({ signal }) {
      return getPostsId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function usePostsId<TData = Awaited<ReturnType<typeof getPostsId>>, TError = unknown>(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPostsId>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPostsIdQueryKey(args),
    queryFn({ signal }) {
      return getPostsId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspensePostsId<
  TData = Awaited<ReturnType<typeof getPostsId>>,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPostsId>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getPostsIdQueryKey(args),
    queryFn({ signal }) {
      return getPostsId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export async function putPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$put(args, options))
}

export function getPutPostsIdMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof putPostsId>>,
    TError,
    InferRequestType<(typeof client.posts)[':id']['$put']>
  >({
    mutationKey: ['posts', '/posts/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['$put']>) {
      return putPostsId(args, options)
    },
  })
}

export function usePutPostsId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putPostsId>>,
    TError,
    InferRequestType<(typeof client.posts)[':id']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPutPostsIdMutationOptions<TError>(clientOptions) })
}

export async function deletePostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$delete(args, options))
}

export function getDeletePostsIdMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof deletePostsId>> | undefined,
    TError,
    InferRequestType<(typeof client.posts)[':id']['$delete']>
  >({
    mutationKey: ['posts', '/posts/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['$delete']>) {
      return deletePostsId(args, options)
    },
  })
}

export function useDeletePostsId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deletePostsId>> | undefined,
    TError,
    InferRequestType<(typeof client.posts)[':id']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getDeletePostsIdMutationOptions<TError>(clientOptions),
  })
}

export function getPostsIdCommentsQueryKey(
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

export function getPostsIdCommentsQueryOptions(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPostsIdCommentsQueryKey(args),
    queryFn({ signal }) {
      return getPostsIdComments(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function usePostsIdComments<
  TData = Awaited<ReturnType<typeof getPostsIdComments>>,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPostsIdComments>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPostsIdCommentsQueryKey(args),
    queryFn({ signal }) {
      return getPostsIdComments(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export function useSuspensePostsIdComments<
  TData = Awaited<ReturnType<typeof getPostsIdComments>>,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPostsIdComments>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getPostsIdCommentsQueryKey(args),
    queryFn({ signal }) {
      return getPostsIdComments(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export async function postPostsIdComments(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].comments.$post(args, options))
}

export function getPostPostsIdCommentsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<ReturnType<typeof postPostsIdComments>>,
    TError,
    InferRequestType<(typeof client.posts)[':id']['comments']['$post']>
  >({
    mutationKey: ['posts', '/posts/:id/comments', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['comments']['$post']>) {
      return postPostsIdComments(args, options)
    },
  })
}

export function usePostPostsIdComments<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPostsIdComments>>,
    TError,
    InferRequestType<(typeof client.posts)[':id']['comments']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostPostsIdCommentsMutationOptions<TError>(clientOptions),
  })
}

export function getTagsQueryKey() {
  return ['tags', '/tags'] as const
}

export async function getTags(options?: ClientRequestOptions) {
  return await parseResponse(client.tags.$get(undefined, options))
}

export function getTagsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getTagsQueryKey(),
    queryFn({ signal }) {
      return getTags({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useTags<TData = Awaited<ReturnType<typeof getTags>>, TError = unknown>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getTags>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getTagsQueryKey(),
    queryFn({ signal }) {
      return getTags({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseTags<
  TData = Awaited<ReturnType<typeof getTags>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getTags>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getTagsQueryKey(),
    queryFn({ signal }) {
      return getTags({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

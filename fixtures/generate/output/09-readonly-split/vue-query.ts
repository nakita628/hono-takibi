import { useQuery, useInfiniteQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getPostsKey() {
  return ['posts'] as const
}

export function getTagsKey() {
  return ['tags'] as const
}

export function getPostsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
) {
  return ['posts', '/posts', args] as const
}

export async function getPosts(
  args: InferRequestType<typeof client.posts.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.$get(args, options))
}

export function getPostsQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPosts(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function usePosts<TData = Awaited<ReturnType<typeof getPosts>>>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPosts>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPosts(toValue(args), { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getPostsInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
) {
  return ['posts', '/posts', args, 'infinite'] as const
}

export function getPostsInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPostsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPosts(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfinitePosts(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPosts>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getPostsInfiniteQueryOptions(args, clientOptions) })
}

export async function postPosts(
  args: InferRequestType<typeof client.posts.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.$post(args, options))
}

export function getPostPostsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.posts.$post>) {
      return postPosts(args, options)
    },
  }
}

export function usePostPosts(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPosts>>,
    Error,
    InferRequestType<typeof client.posts.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostPostsMutationOptions(clientOptions), ...mutationOptions })
}

export function getPostsIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['$get']>>,
) {
  return ['posts', '/posts/:id', args] as const
}

export async function getPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$get(args, options))
}

export function getPostsIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPostsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function usePostsId<TData = Awaited<ReturnType<typeof getPostsId>>>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPostsId>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPostsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsId(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export function getPostsIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['$get']>>,
) {
  return ['posts', '/posts/:id', args, 'infinite'] as const
}

export function getPostsIdInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPostsIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfinitePostsId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPostsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getPostsIdInfiniteQueryOptions(args, clientOptions),
  })
}

export async function putPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$put(args, options))
}

export function getPutPostsIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['$put']>) {
      return putPostsId(args, options)
    },
  }
}

export function usePutPostsId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putPostsId>>,
    Error,
    InferRequestType<(typeof client.posts)[':id']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPutPostsIdMutationOptions(clientOptions), ...mutationOptions })
}

export async function deletePostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$delete(args, options))
}

export function getDeletePostsIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['$delete']>) {
      return deletePostsId(args, options)
    },
  }
}

export function useDeletePostsId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deletePostsId>>  ,
    Error,
    InferRequestType<(typeof client.posts)[':id']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getDeletePostsIdMutationOptions(clientOptions), ...mutationOptions })
}

export function getPostsIdCommentsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['comments']['$get']>>,
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
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['comments']['$get']>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPostsIdCommentsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsIdComments(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function usePostsIdComments<TData = Awaited<ReturnType<typeof getPostsIdComments>>>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['comments']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPostsIdComments>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPostsIdCommentsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsIdComments(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export function getPostsIdCommentsInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['comments']['$get']>>,
) {
  return ['posts', '/posts/:id/comments', args, 'infinite'] as const
}

export function getPostsIdCommentsInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['comments']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPostsIdCommentsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsIdComments(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfinitePostsIdComments(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['comments']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPostsIdComments>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getPostsIdCommentsInfiniteQueryOptions(args, clientOptions),
  })
}

export async function postPostsIdComments(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].comments.$post(args, options))
}

export function getPostPostsIdCommentsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts/:id/comments', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['comments']['$post']>) {
      return postPostsIdComments(args, options)
    },
  }
}

export function usePostPostsIdComments(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPostsIdComments>>,
    Error,
    InferRequestType<(typeof client.posts)[':id']['comments']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...getPostPostsIdCommentsMutationOptions(clientOptions),
    ...mutationOptions,
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
    queryFn({ signal }: QueryFunctionContext) {
      return getTags({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useTags<TData = Awaited<ReturnType<typeof getTags>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getTags>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTags({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getTagsInfiniteQueryKey() {
  return ['tags', '/tags', 'infinite'] as const
}

export function getTagsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getTagsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTags({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteTags(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getTagsInfiniteQueryOptions(clientOptions) })
}

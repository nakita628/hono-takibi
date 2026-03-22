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

/** Key prefix for /posts */
export function getPostsKey() {
  return ['posts'] as const
}

/** Key prefix for /tags */
export function getTagsKey() {
  return ['tags'] as const
}

/** GET /posts query key */
export function getPostsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
) {
  return ['posts', '/posts', args] as const
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
 * GET /posts query options
 */
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

/**
 * GET /posts
 */
export function usePosts(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPosts>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getPostsQueryOptions(args, clientOptions), ...queryOptions })
}

/** GET /posts infinite query key */
export function getPostsInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
) {
  return ['posts', '/posts', args, 'infinite'] as const
}

/**
 * GET /posts infinite query options
 */
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

/**
 * GET /posts
 */
export function useInfinitePosts(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPosts>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getPostsInfiniteQueryOptions(args, clientOptions), ...queryOptions })
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

/** POST /posts */
export function getPostPostsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts'] as const,
    async mutationFn(args: InferRequestType<typeof client.posts.$post>) {
      return postPosts(args, options)
    },
  }
}

/**
 * POST /posts
 */
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

/** GET /posts/{id} query key */
export function getPostsIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['$get']>>,
) {
  return ['posts', '/posts/:id', args] as const
}

/**
 * GET /posts/{id}
 */
export async function getPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$get(args, options))
}

/**
 * GET /posts/{id} query options
 */
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

/**
 * GET /posts/{id}
 */
export function usePostsId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPostsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getPostsIdQueryOptions(args, clientOptions), ...queryOptions })
}

/** GET /posts/{id} infinite query key */
export function getPostsIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['$get']>>,
) {
  return ['posts', '/posts/:id', args, 'infinite'] as const
}

/**
 * GET /posts/{id} infinite query options
 */
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

/**
 * GET /posts/{id}
 */
export function useInfinitePostsId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPostsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getPostsIdInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * PUT /posts/{id}
 */
export async function putPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$put(args, options))
}

/** PUT /posts/{id} */
export function getPutPostsIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts/:id'] as const,
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['$put']>) {
      return putPostsId(args, options)
    },
  }
}

/**
 * PUT /posts/{id}
 */
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

/**
 * DELETE /posts/{id}
 */
export async function deletePostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$delete(args, options))
}

/** DELETE /posts/{id} */
export function getDeletePostsIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts/:id'] as const,
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['$delete']>) {
      return deletePostsId(args, options)
    },
  }
}

/**
 * DELETE /posts/{id}
 */
export function useDeletePostsId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deletePostsId>> | undefined,
    Error,
    InferRequestType<(typeof client.posts)[':id']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getDeletePostsIdMutationOptions(clientOptions), ...mutationOptions })
}

/** GET /posts/{id}/comments query key */
export function getPostsIdCommentsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['comments']['$get']>>,
) {
  return ['posts', '/posts/:id/comments', args] as const
}

/**
 * GET /posts/{id}/comments
 */
export async function getPostsIdComments(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].comments.$get(args, options))
}

/**
 * GET /posts/{id}/comments query options
 */
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

/**
 * GET /posts/{id}/comments
 */
export function usePostsIdComments(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['comments']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPostsIdComments>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getPostsIdCommentsQueryOptions(args, clientOptions), ...queryOptions })
}

/** GET /posts/{id}/comments infinite query key */
export function getPostsIdCommentsInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['comments']['$get']>>,
) {
  return ['posts', '/posts/:id/comments', args, 'infinite'] as const
}

/**
 * GET /posts/{id}/comments infinite query options
 */
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

/**
 * GET /posts/{id}/comments
 */
export function useInfinitePostsIdComments(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['comments']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPostsIdComments>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getPostsIdCommentsInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * POST /posts/{id}/comments
 */
export async function postPostsIdComments(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].comments.$post(args, options))
}

/** POST /posts/{id}/comments */
export function getPostPostsIdCommentsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts/:id/comments'] as const,
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['comments']['$post']>) {
      return postPostsIdComments(args, options)
    },
  }
}

/**
 * POST /posts/{id}/comments
 */
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

/** GET /tags query key */
export function getTagsQueryKey() {
  return ['tags', '/tags'] as const
}

/**
 * GET /tags
 */
export async function getTags(options?: ClientRequestOptions) {
  return await parseResponse(client.tags.$get(undefined, options))
}

/**
 * GET /tags query options
 */
export function getTagsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTags({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /tags
 */
export function useTags(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getTagsQueryOptions(clientOptions), ...queryOptions })
}

/** GET /tags infinite query key */
export function getTagsInfiniteQueryKey() {
  return ['tags', '/tags', 'infinite'] as const
}

/**
 * GET /tags infinite query options
 */
export function getTagsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getTagsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTags({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /tags
 */
export function useInfiniteTags(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getTagsInfiniteQueryOptions(clientOptions), ...queryOptions })
}

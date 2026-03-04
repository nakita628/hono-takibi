import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Svelte Query cache key for GET /posts
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsQueryKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['posts', 'GET', '/posts', args] as const
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
 * Returns Svelte Query query options for GET /posts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPostsQueryOptions(
  args: InferRequestType<typeof client.posts.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPosts(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /posts
 */
export function createGetPosts(
  args: () => InferRequestType<typeof client.posts.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPosts>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetPostsQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /posts
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetPostsInfiniteQueryKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['posts', 'GET', '/posts', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /posts
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPostsInfiniteQueryOptions(
  args: InferRequestType<typeof client.posts.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPostsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPosts(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /posts
 */
export function createInfiniteGetPosts(
  args: () => InferRequestType<typeof client.posts.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getPosts>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetPostsInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query mutation key for POST /posts
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPostsMutationKey() {
  return ['posts', 'POST', '/posts'] as const
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

/**
 * Returns Svelte Query mutation options for POST /posts
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPostsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostPostsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.posts.$post>) {
      return postPosts(args, options)
    },
  }
}

/**
 * POST /posts
 */
export function createPostPosts(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPosts>>,
      Error,
      InferRequestType<typeof client.posts.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostPostsMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query cache key for GET /posts/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsIdQueryKey(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
) {
  return ['posts', 'GET', '/posts/:id', args] as const
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
 * Returns Svelte Query query options for GET /posts/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPostsIdQueryOptions(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetPostsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /posts/{id}
 */
export function createGetPostsId(
  args: () => InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPostsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetPostsIdQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /posts/{id}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetPostsIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
) {
  return ['posts', 'GET', '/posts/:id', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /posts/{id}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPostsIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPostsIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /posts/{id}
 */
export function createInfiniteGetPostsId(
  args: () => InferRequestType<(typeof client.posts)[':id']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getPostsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetPostsIdInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /posts/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutPostsIdMutationKey() {
  return ['posts', 'PUT', '/posts/:id'] as const
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

/**
 * Returns Svelte Query mutation options for PUT /posts/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutPostsIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPutPostsIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['$put']>) {
      return putPostsId(args, options)
    },
  }
}

/**
 * PUT /posts/{id}
 */
export function createPutPostsId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putPostsId>>,
      Error,
      InferRequestType<(typeof client.posts)[':id']['$put']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPutPostsIdMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /posts/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeletePostsIdMutationKey() {
  return ['posts', 'DELETE', '/posts/:id'] as const
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

/**
 * Returns Svelte Query mutation options for DELETE /posts/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeletePostsIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getDeletePostsIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['$delete']>) {
      return deletePostsId(args, options)
    },
  }
}

/**
 * DELETE /posts/{id}
 */
export function createDeletePostsId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deletePostsId>> | undefined,
      Error,
      InferRequestType<(typeof client.posts)[':id']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getDeletePostsIdMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query cache key for GET /posts/{id}/comments
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPostsIdCommentsQueryKey(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
) {
  return ['posts', 'GET', '/posts/:id/comments', args] as const
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
 * Returns Svelte Query query options for GET /posts/{id}/comments
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPostsIdCommentsQueryOptions(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetPostsIdCommentsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsIdComments(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /posts/{id}/comments
 */
export function createGetPostsIdComments(
  args: () => InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPostsIdComments>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetPostsIdCommentsQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /posts/{id}/comments
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetPostsIdCommentsInfiniteQueryKey(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
) {
  return ['posts', 'GET', '/posts/:id/comments', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /posts/{id}/comments
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetPostsIdCommentsInfiniteQueryOptions(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPostsIdCommentsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsIdComments(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /posts/{id}/comments
 */
export function createInfiniteGetPostsIdComments(
  args: () => InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getPostsIdComments>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetPostsIdCommentsInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query mutation key for POST /posts/{id}/comments
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPostsIdCommentsMutationKey() {
  return ['posts', 'POST', '/posts/:id/comments'] as const
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

/**
 * Returns Svelte Query mutation options for POST /posts/{id}/comments
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPostsIdCommentsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostPostsIdCommentsMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['comments']['$post']>) {
      return postPostsIdComments(args, options)
    },
  }
}

/**
 * POST /posts/{id}/comments
 */
export function createPostPostsIdComments(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPostsIdComments>>,
      Error,
      InferRequestType<(typeof client.posts)[':id']['comments']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostPostsIdCommentsMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query cache key for GET /tags
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetTagsQueryKey() {
  return ['tags', 'GET', '/tags'] as const
}

/**
 * GET /tags
 */
export async function getTags(options?: ClientRequestOptions) {
  return await parseResponse(client.tags.$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /tags
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetTagsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTags({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /tags
 */
export function createGetTags(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetTagsQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /tags
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetTagsInfiniteQueryKey() {
  return ['tags', 'GET', '/tags', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /tags
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetTagsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetTagsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTags({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /tags
 */
export function createInfiniteGetTags(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetTagsInfiniteQueryOptions(clientOptions), ...query }
  })
}

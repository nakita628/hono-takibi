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

/** Key prefix for /posts */
export function getPostsKey() {
  return ['posts'] as const
}

/** Key prefix for /tags */
export function getTagsKey() {
  return ['tags'] as const
}

/** GET /posts query key */
export function getPostsQueryKey(args: InferRequestType<typeof client.posts.$get>) {
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
  args: InferRequestType<typeof client.posts.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPosts(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /posts
 */
export function createPosts(
  args: () => InferRequestType<typeof client.posts.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPosts>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getPostsQueryOptions(args(), clientOptions), ...query }
  })
}

/** GET /posts infinite query key */
export function getPostsInfiniteQueryKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['posts', '/posts', args, 'infinite'] as const
}

/**
 * GET /posts infinite query options
 */
export function getPostsInfiniteQueryOptions(
  args: InferRequestType<typeof client.posts.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPostsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPosts(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /posts
 */
export function createInfinitePosts(
  args: () => InferRequestType<typeof client.posts.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getPosts>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getPostsInfiniteQueryOptions(args(), clientOptions), ...query }
  })
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

/** GET /posts/{id} query key */
export function getPostsIdQueryKey(args: InferRequestType<(typeof client.posts)[':id']['$get']>) {
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
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPostsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /posts/{id}
 */
export function createPostsId(
  args: () => InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPostsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getPostsIdQueryOptions(args(), clientOptions), ...query }
  })
}

/** GET /posts/{id} infinite query key */
export function getPostsIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
) {
  return ['posts', '/posts/:id', args, 'infinite'] as const
}

/**
 * GET /posts/{id} infinite query options
 */
export function getPostsIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPostsIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /posts/{id}
 */
export function createInfinitePostsId(
  args: () => InferRequestType<(typeof client.posts)[':id']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getPostsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getPostsIdInfiniteQueryOptions(args(), clientOptions), ...query }
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

/** GET /posts/{id}/comments query key */
export function getPostsIdCommentsQueryKey(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
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
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPostsIdCommentsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsIdComments(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /posts/{id}/comments
 */
export function createPostsIdComments(
  args: () => InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPostsIdComments>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getPostsIdCommentsQueryOptions(args(), clientOptions), ...query }
  })
}

/** GET /posts/{id}/comments infinite query key */
export function getPostsIdCommentsInfiniteQueryKey(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
) {
  return ['posts', '/posts/:id/comments', args, 'infinite'] as const
}

/**
 * GET /posts/{id}/comments infinite query options
 */
export function getPostsIdCommentsInfiniteQueryOptions(
  args: InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPostsIdCommentsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsIdComments(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /posts/{id}/comments
 */
export function createInfinitePostsIdComments(
  args: () => InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getPostsIdComments>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getPostsIdCommentsInfiniteQueryOptions(args(), clientOptions), ...query }
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
export function createTags(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getTagsQueryOptions(clientOptions), ...query }
  })
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
export function createInfiniteTags(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getTagsInfiniteQueryOptions(clientOptions), ...query }
  })
}

import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
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

export function createPosts<TData = Awaited<ReturnType<typeof getPosts>>, TError = unknown>(
  args: () => InferRequestType<typeof client.posts.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPostsQueryKey(args()),
      queryFn({ signal }) {
        return getPosts(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export async function postPosts(
  args: InferRequestType<typeof client.posts.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.$post(args, options))
}

export function getPostPostsMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.posts.$post>) {
      return postPosts(args, options)
    },
  }
}

export function createPostPosts<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPosts>>,
      TError,
      InferRequestType<typeof client.posts.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostPostsMutationOptions<TError>(clientOptions) }
  })
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

export function createPostsId<TData = Awaited<ReturnType<typeof getPostsId>>, TError = unknown>(
  args: () => InferRequestType<(typeof client.posts)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPostsId>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPostsIdQueryKey(args()),
      queryFn({ signal }) {
        return getPostsId(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export async function putPostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$put(args, options))
}

export function getPutPostsIdMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['$put']>) {
      return putPostsId(args, options)
    },
  }
}

export function createPutPostsId<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putPostsId>>,
      TError,
      InferRequestType<(typeof client.posts)[':id']['$put']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPutPostsIdMutationOptions<TError>(clientOptions) }
  })
}

export async function deletePostsId(
  args: InferRequestType<(typeof client.posts)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts[':id'].$delete(args, options))
}

export function getDeletePostsIdMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['$delete']>) {
      return deletePostsId(args, options)
    },
  }
}

export function createDeletePostsId<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deletePostsId>> | undefined,
      TError,
      InferRequestType<(typeof client.posts)[':id']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getDeletePostsIdMutationOptions<TError>(clientOptions) }
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

export function createPostsIdComments<
  TData = Awaited<ReturnType<typeof getPostsIdComments>>,
  TError = unknown,
>(
  args: () => InferRequestType<(typeof client.posts)[':id']['comments']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPostsIdComments>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPostsIdCommentsQueryKey(args()),
      queryFn({ signal }) {
        return getPostsIdComments(args(), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        })
      },
    }
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
  return {
    mutationKey: ['posts', '/posts/:id/comments', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['comments']['$post']>) {
      return postPostsIdComments(args, options)
    },
  }
}

export function createPostPostsIdComments<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPostsIdComments>>,
      TError,
      InferRequestType<(typeof client.posts)[':id']['comments']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostPostsIdCommentsMutationOptions<TError>(clientOptions) }
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

export function createTags<TData = Awaited<ReturnType<typeof getTags>>, TError = unknown>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getTags>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getTagsQueryKey(),
      queryFn({ signal }) {
        return getTags({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

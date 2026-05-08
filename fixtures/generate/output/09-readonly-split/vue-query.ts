import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
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

export function getPostsQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.posts.$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function usePosts<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.$get>>>>>,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPostsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.posts.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostPostsMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.posts.$post>) {
      return parseResponse(client.posts.$post(args, options))
    },
  }
}

export function usePostPosts<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.$post>>>>>,
    TError,
    InferRequestType<typeof client.posts.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostPostsMutationOptions<TError>(clientOptions) })
}

export function getPostsIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['$get']>>,
) {
  return ['posts', '/posts/:id', args] as const
}

export function getPostsIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPostsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.posts[':id'].$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function usePostsId<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':id']['$get']>>>>
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['$get']>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':id']['$get']>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPostsIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.posts[':id'].$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPutPostsIdMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['$put']>) {
      return parseResponse(client.posts[':id'].$put(args, options))
    },
  }
}

export function usePutPostsId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':id']['$put']>>>>
    >,
    TError,
    InferRequestType<(typeof client.posts)[':id']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPutPostsIdMutationOptions<TError>(clientOptions) })
}

export function getDeletePostsIdMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['$delete']>) {
      return parseResponse(client.posts[':id'].$delete(args, options))
    },
  }
}

export function useDeletePostsId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':id']['$delete']>>>
        >
      >
    | undefined,
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
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['comments']['$get']>>,
) {
  return ['posts', '/posts/:id/comments', args] as const
}

export function getPostsIdCommentsQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['comments']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPostsIdCommentsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.posts[':id'].comments.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function usePostsIdComments<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':id']['comments']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.posts)[':id']['comments']['$get']>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.posts)[':id']['comments']['$get']>>
          >
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPostsIdCommentsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.posts[':id'].comments.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostPostsIdCommentsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['posts', '/posts/:id/comments', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client.posts)[':id']['comments']['$post']>) {
      return parseResponse(client.posts[':id'].comments.$post(args, options))
    },
  }
}

export function usePostPostsIdComments<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.posts)[':id']['comments']['$post']>>>
      >
    >,
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

export function getTagsQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.tags.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useTags<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.tags.$get>>>>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.tags.$get>>>>>,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getTagsQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.tags.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
  })
}

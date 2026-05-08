import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
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

export function getApiReverseChibanIndexQueryKey() {
  return ['api', '/api/reverseChiban/'] as const
}

export function getApiReverseChibanIndexQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getApiReverseChibanIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.api.reverseChiban.index.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useApiReverseChibanIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.api.reverseChiban.index.$get>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.api.reverseChiban.index.$get>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getApiReverseChibanIndexQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.api.reverseChiban.index.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getApiReverseChibanQueryKey() {
  return ['api', '/api/reverseChiban'] as const
}

export function getApiReverseChibanQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getApiReverseChibanQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.api.reverseChiban.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useApiReverseChiban<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.api.reverseChiban.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.api.reverseChiban.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getApiReverseChibanQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.api.reverseChiban.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostsIndexQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
) {
  return ['posts', '/posts/', args] as const
}

export function getPostsIndexQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPostsIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.posts.index.$get(toValue(args), { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function usePostsIndex<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.index.$get>>>>
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.index.$get>>>>
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
    queryKey: getPostsIndexQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.posts.index.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPostPostsIndexMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts/', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.posts.index.$post>) {
      return parseResponse(client.posts.index.$post(args, options))
    },
  }
}

export function usePostPostsIndex<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.posts.index.$post>>>>>,
    TError,
    InferRequestType<typeof client.posts.index.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostPostsIndexMutationOptions<TError>(clientOptions),
  })
}

export function getUsersIdIndexQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
) {
  return ['users', '/users/:id/', args] as const
}

export function getUsersIdIndexQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersIdIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':id'].index.$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useUsersIdIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['index']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':id']['index']['$get']>>>
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
    queryKey: getUsersIdIndexQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users[':id'].index.$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getItemsIndexQueryKey() {
  return ['items', '/items/'] as const
}

export function getItemsIndexQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getItemsIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.items.index.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useItemsIndex<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.index.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.index.$get>>>>>,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getItemsIndexQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.items.index.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

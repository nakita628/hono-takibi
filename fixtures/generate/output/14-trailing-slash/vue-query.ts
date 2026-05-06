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

export async function getApiReverseChibanIndex(options?: ClientRequestOptions) {
  return await parseResponse(client.api.reverseChiban.index.$get(undefined, options))
}

export function getApiReverseChibanIndexQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getApiReverseChibanIndexQueryKey(),
    queryFn({ signal }) {
      return getApiReverseChibanIndex({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useApiReverseChibanIndex<
  TData = Awaited<ReturnType<typeof getApiReverseChibanIndex>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getApiReverseChibanIndex>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getApiReverseChibanIndex>>,
    ReturnType<typeof getApiReverseChibanIndexQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getApiReverseChibanIndexQueryKey(),
    queryFn({ signal }) {
      return getApiReverseChibanIndex({
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export function getApiReverseChibanQueryKey() {
  return ['api', '/api/reverseChiban'] as const
}

export async function getApiReverseChiban(options?: ClientRequestOptions) {
  return await parseResponse(client.api.reverseChiban.$get(undefined, options))
}

export function getApiReverseChibanQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getApiReverseChibanQueryKey(),
    queryFn({ signal }) {
      return getApiReverseChiban({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useApiReverseChiban<
  TData = Awaited<ReturnType<typeof getApiReverseChiban>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getApiReverseChiban>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getApiReverseChiban>>,
    ReturnType<typeof getApiReverseChibanQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getApiReverseChibanQueryKey(),
    queryFn({ signal }) {
      return getApiReverseChiban({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getPostsIndexQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
) {
  return ['posts', '/posts/', args] as const
}

export async function getPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.index.$get(args, options))
}

export function getPostsIndexQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPostsIndexQueryKey(args),
    queryFn({ signal }) {
      return getPostsIndex(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function usePostsIndex<TData = Awaited<ReturnType<typeof getPostsIndex>>, TError = unknown>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.index.$get>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getPostsIndex>>,
      TError,
      TData,
      Awaited<ReturnType<typeof getPostsIndex>>,
      ReturnType<typeof getPostsIndexQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPostsIndexQueryKey(args),
    queryFn({ signal }) {
      return getPostsIndex(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export async function postPostsIndex(
  args: InferRequestType<typeof client.posts.index.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.index.$post(args, options))
}

export function getPostPostsIndexMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts/', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.posts.index.$post>) {
      return postPostsIndex(args, options)
    },
  }
}

export function usePostPostsIndex<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPostsIndex>>,
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

export async function getUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].index.$get(args, options))
}

export function getUsersIdIndexQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersIdIndexQueryKey(args),
    queryFn({ signal }) {
      return getUsersIdIndex(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useUsersIdIndex<
  TData = Awaited<ReturnType<typeof getUsersIdIndex>>,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':id']['index']['$get']>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getUsersIdIndex>>,
      TError,
      TData,
      Awaited<ReturnType<typeof getUsersIdIndex>>,
      ReturnType<typeof getUsersIdIndexQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersIdIndexQueryKey(args),
    queryFn({ signal }) {
      return getUsersIdIndex(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export function getItemsIndexQueryKey() {
  return ['items', '/items/'] as const
}

export async function getItemsIndex(options?: ClientRequestOptions) {
  return await parseResponse(client.items.index.$get(undefined, options))
}

export function getItemsIndexQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getItemsIndexQueryKey(),
    queryFn({ signal }) {
      return getItemsIndex({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useItemsIndex<
  TData = Awaited<ReturnType<typeof getItemsIndex>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getItemsIndex>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getItemsIndex>>,
    ReturnType<typeof getItemsIndexQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getItemsIndexQueryKey(),
    queryFn({ signal }) {
      return getItemsIndex({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

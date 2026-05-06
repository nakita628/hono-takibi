import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
} from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getHealthKey() {
  return ['health'] as const
}

export function getPostsKey() {
  return ['posts'] as const
}

export function getUsersKey() {
  return ['users'] as const
}

export function getUsersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args] as const
}

export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

export function getUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getUsersQueryKey>>) {
      return getUsers(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = unknown>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      TData,
      Awaited<ReturnType<typeof getUsers>>,
      ReturnType<typeof getUsersQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getUsersQueryKey>>) {
      return getUsers(toValue(args), { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getUsersInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args, 'infinite'] as const
}

export function getUsersInfiniteQueryOptions<TPageParam = unknown>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsers>>,
      allPages: Awaited<ReturnType<typeof getUsers>>[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getUsersInfiniteQueryKey>>) {
      return getUsers(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  }
}

export function useInfiniteUsers<
  TData = Awaited<ReturnType<typeof getUsers>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getUsers>>,
      allPages: Awaited<ReturnType<typeof getUsers>>[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      TData,
      ReturnType<typeof getUsersInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    ...getUsersInfiniteQueryOptions(args, pagination, clientOptions),
  })
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
  return {
    queryKey: getPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getPostsQueryKey>>) {
      return getPosts(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function usePosts<TData = Awaited<ReturnType<typeof getPosts>>, TError = unknown>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getPosts>>,
      TError,
      TData,
      Awaited<ReturnType<typeof getPosts>>,
      ReturnType<typeof getPostsQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getPostsQueryKey>>) {
      return getPosts(toValue(args), { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getPostsInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
) {
  return ['posts', '/posts', args, 'infinite'] as const
}

export function getPostsInfiniteQueryOptions<TPageParam = unknown>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getPosts>>,
      allPages: Awaited<ReturnType<typeof getPosts>>[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPostsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getPostsInfiniteQueryKey>>) {
      return getPosts(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  }
}

export function useInfinitePosts<
  TData = Awaited<ReturnType<typeof getPosts>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.posts.$get>>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<ReturnType<typeof getPosts>>,
      allPages: Awaited<ReturnType<typeof getPosts>>[],
      lastPageParam: TPageParam,
      allPageParams: TPageParam[],
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getPosts>>,
      TError,
      TData,
      ReturnType<typeof getPostsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    ...getPostsInfiniteQueryOptions(args, pagination, clientOptions),
  })
}

export function getHealthQueryKey() {
  return ['health', '/health'] as const
}

export async function getHealth(options?: ClientRequestOptions) {
  return await parseResponse(client.health.$get(undefined, options))
}

export function getHealthQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getHealthQueryKey(),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getHealthQueryKey>>) {
      return getHealth({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useHealth<
  TData = Awaited<ReturnType<typeof getHealth>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getHealth>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getHealth>>,
    ReturnType<typeof getHealthQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getHealthQueryKey(),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getHealthQueryKey>>) {
      return getHealth({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

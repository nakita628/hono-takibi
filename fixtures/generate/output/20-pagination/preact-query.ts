import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  queryOptions,
} from '@tanstack/preact-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/preact-query'
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

export function getUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
}

export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

export function getUsersQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = unknown>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args, 'infinite'] as const
}

export function getUsersInfiniteQueryOptions<TPageParam = unknown>(
  args: InferRequestType<typeof client.users.$get>,
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
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
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
  args: InferRequestType<typeof client.users.$get>,
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

export function useSuspenseInfiniteUsers<
  TData = Awaited<ReturnType<typeof getUsers>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.users.$get>,
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
    query?: UseSuspenseInfiniteQueryOptions<
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
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getUsersInfiniteQueryOptions(args, pagination, clientOptions),
  })
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
    queryFn({ signal }: QueryFunctionContext) {
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
    queryFn({ signal }: QueryFunctionContext) {
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
    queryFn({ signal }: QueryFunctionContext) {
      return getPosts(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getPostsInfiniteQueryKey(args: InferRequestType<typeof client.posts.$get>) {
  return ['posts', '/posts', args, 'infinite'] as const
}

export function getPostsInfiniteQueryOptions<TPageParam = unknown>(
  args: InferRequestType<typeof client.posts.$get>,
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
    queryFn({ signal }: QueryFunctionContext) {
      return getPosts(args, { ...options, init: { ...options?.init, signal } })
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
  args: InferRequestType<typeof client.posts.$get>,
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

export function useSuspenseInfinitePosts<
  TData = Awaited<ReturnType<typeof getPosts>>,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.posts.$get>,
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
    query?: UseSuspenseInfiniteQueryOptions<
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
  return useSuspenseInfiniteQuery({
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
  return queryOptions({
    queryKey: getHealthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHealth({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useHealth<
  TData = Awaited<ReturnType<typeof getHealth>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getHealth>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getHealthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHealth({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseHealth<
  TData = Awaited<ReturnType<typeof getHealth>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getHealth>>, TError, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getHealthQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getHealth({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

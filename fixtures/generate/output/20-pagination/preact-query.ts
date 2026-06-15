import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/preact-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/preact-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getFeedsKey() {
  return ['feeds'] as const
}

export function getItemsKey() {
  return ['items'] as const
}

export function getUsersKey() {
  return ['users'] as const
}

export function getItemsQueryKey(args: InferRequestType<typeof client.items.$get>) {
  return ['items', '/items', args] as const
}

export function getItemsQueryOptions(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getItemsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.items.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useItems<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>>,
  TError = unknown,
>(
  args: InferRequestType<typeof client.items.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.items.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
  })
}

export function useSuspenseItems<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>>,
  TError = unknown,
>(
  args: InferRequestType<typeof client.items.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.items.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
  })
}

export function getItemsInfiniteQueryKey(args: InferRequestType<typeof client.items.$get>) {
  return ['items', '/items', args, 'infinite'] as const
}

export function getItemsInfiniteQueryOptions<TPageParam = unknown>(
  args: InferRequestType<typeof client.items.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.items.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.items.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getItemsInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getItemsInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.items.$get(pagination.getRequestArgs(args, pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteItems<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.items.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.items.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.items.$get>
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>>,
      TError,
      TData,
      ReturnType<typeof getItemsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getItemsInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getItemsInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.items.$get(pagination.getRequestArgs(args, pageParam), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useSuspenseInfiniteItems<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<typeof client.items.$get>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<typeof client.items.$get>,
      pageParam: unknown,
    ) => InferRequestType<typeof client.items.$get>
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>>,
      TError,
      TData,
      ReturnType<typeof getItemsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    queryKey: getItemsInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getItemsInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.items.$get(pagination.getRequestArgs(args, pageParam), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function getFeedsQueryKey() {
  return ['feeds', '/feeds'] as const
}

export function getFeedsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getFeedsQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.feeds.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useFeeds<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.feeds.$get>>>>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.feeds.$get>>>>>,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getFeedsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.feeds.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseFeeds<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.feeds.$get>>>>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.feeds.$get>>>>>,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getFeedsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.feeds.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getFeedsInfiniteQueryKey() {
  return ['feeds', '/feeds', 'infinite'] as const
}

export function getFeedsInfiniteQueryOptions<TPageParam = unknown>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.feeds.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.feeds.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.feeds.$get>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getFeedsInfiniteQueryKey(),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getFeedsInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.feeds.$get(pagination.getRequestArgs(pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteFeeds<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.feeds.$get>>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.feeds.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.feeds.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.feeds.$get>
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.feeds.$get>>>>>,
      TError,
      TData,
      ReturnType<typeof getFeedsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getFeedsInfiniteQueryKey(),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getFeedsInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.feeds.$get(pagination.getRequestArgs(pageParam), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useSuspenseInfiniteFeeds<
  TData = InfiniteData<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.feeds.$get>>>>>
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.feeds.$get>>>>
      >,
      allPages: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.feeds.$get>>>>
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
    getRequestArgs: (pageParam: unknown) => InferRequestType<typeof client.feeds.$get>
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.feeds.$get>>>>>,
      TError,
      TData,
      ReturnType<typeof getFeedsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    queryKey: getFeedsInfiniteQueryKey(),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getFeedsInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.feeds.$get(pagination.getRequestArgs(pageParam), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function getUsersUserIdPostsQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['posts']['$get']>,
) {
  return ['users', '/users/:userId/posts', args] as const
}

export function getUsersUserIdPostsQueryOptions(
  args: InferRequestType<(typeof client.users)[':userId']['posts']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersUserIdPostsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.users[':userId'].posts.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useUsersUserIdPosts<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['posts']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.users)[':userId']['posts']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)[':userId']['posts']['$get']>>
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
    queryKey: getUsersUserIdPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':userId'].posts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseUsersUserIdPosts<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['posts']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.users)[':userId']['posts']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)[':userId']['posts']['$get']>>
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
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersUserIdPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.users[':userId'].posts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getUsersUserIdPostsInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['posts']['$get']>,
) {
  return ['users', '/users/:userId/posts', args, 'infinite'] as const
}

export function getUsersUserIdPostsInfiniteQueryOptions<TPageParam = unknown>(
  args: InferRequestType<(typeof client.users)[':userId']['posts']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      allPages: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)[':userId']['posts']['$get']>>
          >
        >
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<(typeof client.users)[':userId']['posts']['$get']>,
      pageParam: unknown,
    ) => InferRequestType<(typeof client.users)[':userId']['posts']['$get']>
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getUsersUserIdPostsInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getUsersUserIdPostsInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.users[':userId'].posts.$get(pagination.getRequestArgs(args, pageParam), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfiniteUsersUserIdPosts<
  TData = InfiniteData<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['posts']['$get']>>>
      >
    >
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<(typeof client.users)[':userId']['posts']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      allPages: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)[':userId']['posts']['$get']>>
          >
        >
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<(typeof client.users)[':userId']['posts']['$get']>,
      pageParam: unknown,
    ) => InferRequestType<(typeof client.users)[':userId']['posts']['$get']>
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      TError,
      TData,
      ReturnType<typeof getUsersUserIdPostsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getUsersUserIdPostsInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getUsersUserIdPostsInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.users[':userId'].posts.$get(pagination.getRequestArgs(args, pageParam), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useSuspenseInfiniteUsersUserIdPosts<
  TData = InfiniteData<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['posts']['$get']>>>
      >
    >
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<(typeof client.users)[':userId']['posts']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      allPages: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)[':userId']['posts']['$get']>>
          >
        >
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
    getRequestArgs: (
      args: InferRequestType<(typeof client.users)[':userId']['posts']['$get']>,
      pageParam: unknown,
    ) => InferRequestType<(typeof client.users)[':userId']['posts']['$get']>
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      TError,
      TData,
      ReturnType<typeof getUsersUserIdPostsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    queryKey: getUsersUserIdPostsInfiniteQueryKey(args),
    queryFn({
      pageParam,
      signal,
    }: QueryFunctionContext<ReturnType<typeof getUsersUserIdPostsInfiniteQueryKey>, TPageParam>) {
      return parseResponse(
        client.users[':userId'].posts.$get(pagination.getRequestArgs(args, pageParam), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  queryOptions,
  infiniteQueryOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPaginationUsersUserIdPostsQueryKey(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
) {
  return ['pagination', '/pagination/users/:userId/posts', args] as const
}

export function getPaginationUsersUserIdPostsQueryOptions(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPaginationUsersUserIdPostsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function usePaginationUsersUserIdPosts<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
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
    queryKey: getPaginationUsersUserIdPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspensePaginationUsersUserIdPosts<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
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
    queryKey: getPaginationUsersUserIdPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getPaginationUsersUserIdPostsInfiniteQueryKey(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
) {
  return ['pagination', '/pagination/users/:userId/posts', args, 'infinite'] as const
}

export function getPaginationUsersUserIdPostsInfiniteQueryOptions<TPageParam = unknown>(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      allPages: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: ClientRequestOptions,
) {
  return infiniteQueryOptions({
    queryKey: getPaginationUsersUserIdPostsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useInfinitePaginationUsersUserIdPosts<
  TData = InfiniteData<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
        >
      >
    >
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      allPages: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseInfiniteQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      TError,
      TData,
      ReturnType<typeof getPaginationUsersUserIdPostsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useInfiniteQuery({
    ...queryOptions,
    queryKey: getPaginationUsersUserIdPostsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

export function useSuspenseInfinitePaginationUsersUserIdPosts<
  TData = InfiniteData<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
        >
      >
    >
  >,
  TError = unknown,
  TPageParam = unknown,
>(
  args: InferRequestType<(typeof client.pagination.users)[':userId']['posts']['$get']>,
  pagination: {
    initialPageParam: TPageParam
    getNextPageParam: (
      lastPage: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      allPages: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >[],
      lastPageParam: TPageParam,
    ) => TPageParam | undefined | null
  },
  options?: {
    query?: UseSuspenseInfiniteQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pagination.users)[':userId']['posts']['$get']>>
          >
        >
      >,
      TError,
      TData,
      ReturnType<typeof getPaginationUsersUserIdPostsInfiniteQueryKey>,
      TPageParam
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    queryKey: getPaginationUsersUserIdPostsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.pagination.users[':userId'].posts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
    initialPageParam: pagination.initialPageParam,
    getNextPageParam: pagination.getNextPageParam,
  })
}

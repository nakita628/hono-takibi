import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getTrailingSlashPostsIndexQueryKey(
  args: InferRequestType<typeof client.trailingSlash.posts.index.$get>,
) {
  return ['trailingSlash', '/trailingSlash/posts/', args] as const
}

export function getTrailingSlashPostsIndexQueryOptions(
  args: InferRequestType<typeof client.trailingSlash.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getTrailingSlashPostsIndexQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.trailingSlash.posts.index.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useTrailingSlashPostsIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.posts.index.$get>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.trailingSlash.posts.index.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.posts.index.$get>>>
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
    queryKey: getTrailingSlashPostsIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.posts.index.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseTrailingSlashPostsIndex<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.posts.index.$get>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.trailingSlash.posts.index.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.trailingSlash.posts.index.$get>>>
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
    queryKey: getTrailingSlashPostsIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.trailingSlash.posts.index.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

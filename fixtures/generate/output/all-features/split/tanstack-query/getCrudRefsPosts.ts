import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getCrudRefsPostsQueryKey(
  args: InferRequestType<typeof client.crudRefs.posts.$get>,
) {
  return ['crudRefs', '/crudRefs/posts', args] as const
}

export function getCrudRefsPostsQueryOptions(
  args: InferRequestType<typeof client.crudRefs.posts.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getCrudRefsPostsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.crudRefs.posts.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useCrudRefsPosts<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.posts.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.crudRefs.posts.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.posts.$get>>>>
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
    queryKey: getCrudRefsPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.posts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCrudRefsPosts<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.posts.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.crudRefs.posts.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.crudRefs.posts.$get>>>>
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
    queryKey: getCrudRefsPostsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.posts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

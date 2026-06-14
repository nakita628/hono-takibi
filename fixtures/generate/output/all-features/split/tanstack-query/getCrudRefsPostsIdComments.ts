import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getCrudRefsPostsIdCommentsQueryKey(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>,
) {
  return ['crudRefs', '/crudRefs/posts/:id/comments', args] as const
}

export function getCrudRefsPostsIdCommentsQueryOptions(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getCrudRefsPostsIdCommentsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.crudRefs.posts[':id'].comments.$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCrudRefsPostsIdComments<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>>
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
    queryKey: getCrudRefsPostsIdCommentsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.posts[':id'].comments.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCrudRefsPostsIdComments<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.crudRefs.posts)[':id']['comments']['$get']>>
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
    queryKey: getCrudRefsPostsIdCommentsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.crudRefs.posts[':id'].comments.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

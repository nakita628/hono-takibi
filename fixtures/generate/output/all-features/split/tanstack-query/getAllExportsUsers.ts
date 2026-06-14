import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getAllExportsUsersQueryKey(
  args: InferRequestType<typeof client.allExports.users.$get>,
) {
  return ['allExports', '/allExports/users', args] as const
}

export function getAllExportsUsersQueryOptions(
  args: InferRequestType<typeof client.allExports.users.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getAllExportsUsersQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.allExports.users.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useAllExportsUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.allExports.users.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.allExports.users.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.allExports.users.$get>>>>
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
    queryKey: getAllExportsUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.allExports.users.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseAllExportsUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.allExports.users.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.allExports.users.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.allExports.users.$get>>>>
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
    queryKey: getAllExportsUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.allExports.users.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getComprehensiveUsersQueryKey(
  args: InferRequestType<typeof client.comprehensive.users.$get>,
) {
  return ['comprehensive', '/comprehensive/users', args] as const
}

export function getComprehensiveUsersQueryOptions(
  args: InferRequestType<typeof client.comprehensive.users.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getComprehensiveUsersQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.users.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useComprehensiveUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.users.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.comprehensive.users.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.users.$get>>>
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
    queryKey: getComprehensiveUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.users.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComprehensiveUsers<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.users.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.comprehensive.users.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.users.$get>>>
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
    queryKey: getComprehensiveUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.users.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

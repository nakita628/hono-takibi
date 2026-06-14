import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getComprehensiveOrdersQueryKey(
  args: InferRequestType<typeof client.comprehensive.orders.$get>,
) {
  return ['comprehensive', '/comprehensive/orders', args] as const
}

export function getComprehensiveOrdersQueryOptions(
  args: InferRequestType<typeof client.comprehensive.orders.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getComprehensiveOrdersQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.orders.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useComprehensiveOrders<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.orders.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.comprehensive.orders.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.orders.$get>>>
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
    queryKey: getComprehensiveOrdersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.orders.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComprehensiveOrders<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.orders.$get>>>>
  >,
  TError = unknown,
>(
  args: InferRequestType<typeof client.comprehensive.orders.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.comprehensive.orders.$get>>>
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
    queryKey: getComprehensiveOrdersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.orders.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

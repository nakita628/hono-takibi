import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getComprehensiveOrdersOrderIdQueryKey(
  args: InferRequestType<(typeof client.comprehensive.orders)[':orderId']['$get']>,
) {
  return ['comprehensive', '/comprehensive/orders/:orderId', args] as const
}

export function getComprehensiveOrdersOrderIdQueryOptions(
  args: InferRequestType<(typeof client.comprehensive.orders)[':orderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getComprehensiveOrdersOrderIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.orders[':orderId'].$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useComprehensiveOrdersOrderId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.comprehensive.orders)[':orderId']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.comprehensive.orders)[':orderId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comprehensive.orders)[':orderId']['$get']>>
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
    queryKey: getComprehensiveOrdersOrderIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.orders[':orderId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComprehensiveOrdersOrderId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.comprehensive.orders)[':orderId']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.comprehensive.orders)[':orderId']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comprehensive.orders)[':orderId']['$get']>>
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
    queryKey: getComprehensiveOrdersOrderIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.orders[':orderId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/preact-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/preact-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getOrdersOrderIdQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['orders', '/orders/:orderId', args] as const
}

export function getOrdersOrderIdQueryOptions(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getOrdersOrderIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.orders[':orderId'].$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function useOrdersOrderId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.orders)[':orderId']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.orders)[':orderId']['$get']>>>
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
    queryKey: getOrdersOrderIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.orders[':orderId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseOrdersOrderId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.orders)[':orderId']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.orders)[':orderId']['$get']>>>
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
    queryKey: getOrdersOrderIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.orders[':orderId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

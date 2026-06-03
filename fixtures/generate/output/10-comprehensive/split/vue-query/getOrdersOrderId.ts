import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getOrdersOrderIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.orders)[':orderId']['$get']>>,
) {
  return ['orders', '/orders/:orderId', args] as const
}

export function getOrdersOrderIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.orders)[':orderId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getOrdersOrderIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.orders[':orderId'].$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useOrdersOrderId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.orders)[':orderId']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.orders)[':orderId']['$get']>>,
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
    queryFn({ signal }) {
      return parseResponse(
        client.orders[':orderId'].$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

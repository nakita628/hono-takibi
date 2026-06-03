import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getProductsProductIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.products)[':productId']['$get']>>,
) {
  return ['products', '/products/:productId', args] as const
}

export function getProductsProductIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.products)[':productId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getProductsProductIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.products[':productId'].$get(toValue(args), {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useProductsProductId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client.products)[':productId']['$get']>>>
    >
  >,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.products)[':productId']['$get']>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.products)[':productId']['$get']>>>
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
    queryKey: getProductsProductIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.products[':productId'].$get(toValue(args), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getComprehensiveProductsProductIdQueryKey(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$get']>,
) {
  return ['comprehensive', '/comprehensive/products/:productId', args] as const
}

export function getComprehensiveProductsProductIdQueryOptions(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getComprehensiveProductsProductIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.comprehensive.products[':productId'].$get(args, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useComprehensiveProductsProductId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.comprehensive.products)[':productId']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comprehensive.products)[':productId']['$get']>>
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
    queryKey: getComprehensiveProductsProductIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.products[':productId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComprehensiveProductsProductId<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.comprehensive.products)[':productId']['$get']>>
      >
    >
  >,
  TError = unknown,
>(
  args: InferRequestType<(typeof client.comprehensive.products)[':productId']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.comprehensive.products)[':productId']['$get']>>
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
    queryKey: getComprehensiveProductsProductIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.comprehensive.products[':productId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

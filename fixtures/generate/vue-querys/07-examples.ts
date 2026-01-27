import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/07-examples'

/**
 * Generates Vue Query cache key for GET /products
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetProductsQueryKey() {
  return ['products', '/products'] as const
}

/**
 * Returns Vue Query query options for GET /products
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProductsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetProductsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.products.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /products
 */
export function useGetProducts(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.products.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetProductsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /products
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostProductsMutationKey() {
  return ['POST', '/products'] as const
}

/**
 * Returns Vue Query mutation options for POST /products
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostProductsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostProductsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.products.$post>) =>
    parseResponse(client.products.$post(args, clientOptions)),
})

/**
 * POST /products
 */
export function usePostProducts(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.products.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.products.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.products.$post>) =>
      parseResponse(client.products.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /products/{productId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetProductsProductIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.products)[':productId']['$get']>>,
) {
  return ['products', '/products/:productId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /products/{productId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProductsProductIdQueryOptions = (
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetProductsProductIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.products[':productId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /products/{productId}
 */
export function useGetProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.products)[':productId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetProductsProductIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

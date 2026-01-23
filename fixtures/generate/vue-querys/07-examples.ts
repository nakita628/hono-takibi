import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/07-examples'

/**
 * GET /products
 */
export function useGetProducts(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetProductsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.products.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /products
 */
export function getGetProductsQueryKey() {
  return ['/products'] as const
}

/**
 * POST /products
 */
export function usePostProducts(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.products.$post> | undefined,
    Error,
    InferRequestType<typeof client.products.$post>
  >({ mutationFn: async (args) => parseResponse(client.products.$post(args, clientOptions)) })
}

/**
 * GET /products/{productId}
 */
export function useGetProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetProductsProductIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.products[':productId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /products/{productId}
 */
export function getGetProductsProductIdQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return ['/products/:productId', args] as const
}

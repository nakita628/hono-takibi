import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/11-comprehensive'

/**
 * GET /products
 *
 * List all products
 *
 * Retrieve a paginated list of products with optional filtering
 */
export function useGetProducts(
  args: InferRequestType<typeof client.products.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProductsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.products.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /products
 */
export function getGetProductsKey(args?: InferRequestType<typeof client.products.$get>) {
  return ['/products', ...(args ? [args] : [])] as const
}

/**
 * POST /products
 *
 * Create a new product
 */
export function usePostProducts(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /products',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.products.$post> }) =>
      parseResponse(client.products.$post(arg, options?.client)),
  )
}

/**
 * GET /products/{productId}
 *
 * Get product by ID
 */
export function useGetProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProductsProductIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.products[':productId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /products/{productId}
 */
export function getGetProductsProductIdKey(
  args?: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return ['/products/:productId', ...(args ? [args] : [])] as const
}

/**
 * PUT /products/{productId}
 *
 * Update a product
 */
export function usePutProductsProductId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /products/:productId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.products)[':productId']['$put']> },
    ) => parseResponse(client.products[':productId'].$put(arg, options?.client)),
  )
}

/**
 * DELETE /products/{productId}
 *
 * Delete a product
 */
export function useDeleteProductsProductId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /products/:productId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.products)[':productId']['$delete']> },
    ) => parseResponse(client.products[':productId'].$delete(arg, options?.client)),
  )
}

/**
 * POST /orders
 *
 * Create a new order
 */
export function usePostOrders(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /orders',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.orders.$post> }) =>
      parseResponse(client.orders.$post(arg, options?.client)),
  )
}

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export function usePostWebhooks(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /webhooks',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.webhooks.$post> }) =>
      parseResponse(client.webhooks.$post(arg, options?.client)),
  )
}

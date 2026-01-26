import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
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
export function usePostProducts(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.products.$post>,
    Error,
    string,
    InferRequestType<typeof client.products.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /products',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.products.$post> }) =>
      parseResponse(client.products.$post(arg, clientOptions)),
    mutationOptions,
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
export function usePutProductsProductId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.products)[':productId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /products/:productId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.products)[':productId']['$put']> },
    ) => parseResponse(client.products[':productId'].$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /products/{productId}
 *
 * Delete a product
 */
export function useDeleteProductsProductId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.products)[':productId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.products)[':productId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /products/:productId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.products)[':productId']['$delete']> },
    ) => parseResponse(client.products[':productId'].$delete(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /orders
 *
 * Create a new order
 */
export function usePostOrders(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /orders',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.orders.$post> }) =>
      parseResponse(client.orders.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export function usePostWebhooks(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.webhooks.$post>,
    Error,
    string,
    InferRequestType<typeof client.webhooks.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /webhooks',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.webhooks.$post> }) =>
      parseResponse(client.webhooks.$post(arg, clientOptions)),
    mutationOptions,
  )
}

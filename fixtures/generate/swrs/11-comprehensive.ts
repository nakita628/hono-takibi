import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
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
    swr?: SWRConfiguration<InferResponseType<typeof client.products.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProductsKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.products.$get>, Error>(
    swrKey,
    async () => parseResponse(client.products.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.products.$post>,
    Error,
    string,
    InferRequestType<typeof client.products.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.products.$post>,
    Error,
    string,
    InferRequestType<typeof client.products.$post>
  >(
    'POST /products',
    async (_, { arg }) => parseResponse(client.products.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.products)[':productId']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProductsProductIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.products)[':productId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.products[':productId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.products)[':productId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.products)[':productId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  >(
    'PUT /products/:productId',
    async (_, { arg }) => parseResponse(client.products[':productId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /products/{productId}
 *
 * Delete a product
 */
export function useDeleteProductsProductId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.products)[':productId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.products)[':productId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.products)[':productId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.products)[':productId']['$delete']>
  >(
    'DELETE /products/:productId',
    async (_, { arg }) =>
      parseResponse(client.products[':productId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /orders
 *
 * Create a new order
 */
export function usePostOrders(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >(
    'POST /orders',
    async (_, { arg }) => parseResponse(client.orders.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export function usePostWebhooks(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.webhooks.$post>,
    Error,
    string,
    InferRequestType<typeof client.webhooks.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.webhooks.$post>,
    Error,
    string,
    InferRequestType<typeof client.webhooks.$post>
  >(
    'POST /webhooks',
    async (_, { arg }) => parseResponse(client.webhooks.$post(arg, options?.client)),
    options?.swr,
  )
}

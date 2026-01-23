import type { CreateMutationOptions, CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/11-comprehensive'

/**
 * GET /products
 *
 * List all products
 *
 * Retrieve a paginated list of products with optional filtering
 */
export function createGetProducts(
  args: InferRequestType<typeof client.products.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.products.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProductsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.products.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /products
 */
export function getGetProductsQueryKey(args?: InferRequestType<typeof client.products.$get>) {
  return ['/products', ...(args ? [args] : [])] as const
}

/**
 * POST /products
 *
 * Create a new product
 */
export function createPostProducts(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.products.$post> | undefined,
      Error,
      InferRequestType<typeof client.products.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.products.$post> | undefined,
    Error,
    InferRequestType<typeof client.products.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.products.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /products/{productId}
 *
 * Get product by ID
 */
export function createGetProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.products)[':productId']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProductsProductIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.products[':productId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /products/{productId}
 */
export function getGetProductsProductIdQueryKey(
  args?: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return ['/products/:productId', ...(args ? [args] : [])] as const
}

/**
 * PUT /products/{productId}
 *
 * Update a product
 */
export function createPutProductsProductId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.products)[':productId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.products)[':productId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.products)[':productId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.products[':productId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /products/{productId}
 *
 * Delete a product
 */
export function createDeleteProductsProductId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.products)[':productId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.products)[':productId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.products)[':productId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.products)[':productId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.products[':productId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /orders
 *
 * Create a new order
 */
export function createPostOrders(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.orders.$post> | undefined,
      Error,
      InferRequestType<typeof client.orders.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.orders.$post> | undefined,
    Error,
    InferRequestType<typeof client.orders.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.orders.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export function createPostWebhooks(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.webhooks.$post> | undefined,
      Error,
      InferRequestType<typeof client.webhooks.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.webhooks.$post> | undefined,
    Error,
    InferRequestType<typeof client.webhooks.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.webhooks.$post(args, options?.client)),
    },
    queryClient,
  )
}

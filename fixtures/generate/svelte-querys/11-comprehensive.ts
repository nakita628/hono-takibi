import { createMutation, createQuery, queryOptions } from '@tanstack/svelte-query'
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<typeof client.products.$get>
        | (() => InferResponseType<typeof client.products.$get>)
      initialData?:
        | InferResponseType<typeof client.products.$get>
        | (() => InferResponseType<typeof client.products.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetProductsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.products.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /products
 */
export function getGetProductsQueryKey(args: InferRequestType<typeof client.products.$get>) {
  return ['/products', args] as const
}

/**
 * Returns Svelte Query query options for GET /products
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProductsQueryOptions = (
  args: InferRequestType<typeof client.products.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetProductsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.products.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /products
 *
 * Create a new product
 */
export function createPostProducts(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.products.$post>,
      variables: InferRequestType<typeof client.products.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.products.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.products.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.products.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.products.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.products.$post>) =>
      parseResponse(client.products.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /products/{productId}
 *
 * Get product by ID
 */
export function createGetProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      placeholderData?:
        | InferResponseType<(typeof client.products)[':productId']['$get']>
        | (() => InferResponseType<(typeof client.products)[':productId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.products)[':productId']['$get']>
        | (() => InferResponseType<(typeof client.products)[':productId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetProductsProductIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.products[':productId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /products/{productId}
 */
export function getGetProductsProductIdQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return ['/products/:productId', args] as const
}

/**
 * Returns Svelte Query query options for GET /products/{productId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProductsProductIdQueryOptions = (
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetProductsProductIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.products[':productId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /products/{productId}
 *
 * Update a product
 */
export function createPutProductsProductId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.products)[':productId']['$put']>,
      variables: InferRequestType<(typeof client.products)[':productId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.products)[':productId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.products)[':productId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.products)[':productId']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.products)[':productId']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.products)[':productId']['$put']>) =>
      parseResponse(client.products[':productId'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /products/{productId}
 *
 * Delete a product
 */
export function createDeleteProductsProductId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.products)[':productId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.products)[':productId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.products)[':productId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.products)[':productId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.products)[':productId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.products)[':productId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.products)[':productId']['$delete']>) =>
      parseResponse(client.products[':productId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /orders
 *
 * Create a new order
 */
export function createPostOrders(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.orders.$post>,
      variables: InferRequestType<typeof client.orders.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.orders.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.orders.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.orders.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.orders.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.orders.$post>) =>
      parseResponse(client.orders.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export function createPostWebhooks(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.webhooks.$post>,
      variables: InferRequestType<typeof client.webhooks.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.webhooks.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.webhooks.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.webhooks.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.webhooks.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.webhooks.$post>) =>
      parseResponse(client.webhooks.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

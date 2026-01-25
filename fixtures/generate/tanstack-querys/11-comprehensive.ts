import { useQuery, useMutation } from '@tanstack/react-query'
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetProductsQueryKey(args),
    queryFn: async () => parseResponse(client.products.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /products
 */
export function getGetProductsQueryKey(args: InferRequestType<typeof client.products.$get>) {
  return ['/products', args] as const
}

/**
 * POST /products
 *
 * Create a new product
 */
export function usePostProducts(options?: {
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
  return useMutation({
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
export function useGetProductsProductId(
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetProductsProductIdQueryKey(args),
    queryFn: async () => parseResponse(client.products[':productId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /products/{productId}
 */
export function getGetProductsProductIdQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return ['/products/:productId', args] as const
}

/**
 * PUT /products/{productId}
 *
 * Update a product
 */
export function usePutProductsProductId(options?: {
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
  return useMutation({
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
export function useDeleteProductsProductId(options?: {
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
  return useMutation({
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
export function usePostOrders(options?: {
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
  return useMutation({
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
export function usePostWebhooks(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.webhooks.$post>) =>
      parseResponse(client.webhooks.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

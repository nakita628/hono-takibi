import type {
  QueryFunctionContext,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/11-comprehensive'

/**
 * Generates TanStack Query cache key for GET /products
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProductsQueryKey(args: InferRequestType<typeof client.products.$get>) {
  return ['products', 'GET', '/products', args] as const
}

/**
 * Returns TanStack Query query options for GET /products
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProductsQueryOptions = (
  args: InferRequestType<typeof client.products.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetProductsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.products.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

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
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.products.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetProductsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /products
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostProductsMutationKey() {
  return ['products', 'POST', '/products'] as const
}

/**
 * Returns TanStack Query mutation options for POST /products
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
 *
 * Create a new product
 */
export function usePostProducts(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.products.$post>>>>>,
    Error,
    InferRequestType<typeof client.products.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostProductsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query cache key for GET /products/{productId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProductsProductIdQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return ['products', 'GET', '/products/:productId', args] as const
}

/**
 * Returns TanStack Query query options for GET /products/{productId}
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
 *
 * Get product by ID
 */
export function useGetProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.products)[':productId']['$get']>>>
        >
      >,
      Error
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

/**
 * Generates TanStack Query mutation key for PUT /products/{productId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutProductsProductIdMutationKey() {
  return ['products', 'PUT', '/products/:productId'] as const
}

/**
 * Returns TanStack Query mutation options for PUT /products/{productId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutProductsProductIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutProductsProductIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.products)[':productId']['$put']>) =>
    parseResponse(client.products[':productId'].$put(args, clientOptions)),
})

/**
 * PUT /products/{productId}
 *
 * Update a product
 */
export function usePutProductsProductId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.products)[':productId']['$put']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutProductsProductIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query mutation key for DELETE /products/{productId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteProductsProductIdMutationKey() {
  return ['products', 'DELETE', '/products/:productId'] as const
}

/**
 * Returns TanStack Query mutation options for DELETE /products/{productId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteProductsProductIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteProductsProductIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.products)[':productId']['$delete']>) =>
    parseResponse(client.products[':productId'].$delete(args, clientOptions)),
})

/**
 * DELETE /products/{productId}
 *
 * Delete a product
 */
export function useDeleteProductsProductId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.products)[':productId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.products)[':productId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteProductsProductIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query mutation key for POST /orders
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOrdersMutationKey() {
  return ['orders', 'POST', '/orders'] as const
}

/**
 * Returns TanStack Query mutation options for POST /orders
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostOrdersMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostOrdersMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.orders.$post>) =>
    parseResponse(client.orders.$post(args, clientOptions)),
})

/**
 * POST /orders
 *
 * Create a new order
 */
export function usePostOrders(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.orders.$post>>>>>,
    Error,
    InferRequestType<typeof client.orders.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostOrdersMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query mutation key for POST /webhooks
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebhooksMutationKey() {
  return ['webhooks', 'POST', '/webhooks'] as const
}

/**
 * Returns TanStack Query mutation options for POST /webhooks
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostWebhooksMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostWebhooksMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.webhooks.$post>) =>
    parseResponse(client.webhooks.$post(args, clientOptions)),
})

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export function usePostWebhooks(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.$post>>>>>,
    Error,
    InferRequestType<typeof client.webhooks.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostWebhooksMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

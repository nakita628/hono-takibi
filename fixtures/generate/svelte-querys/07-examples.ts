import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/07-examples'

/**
 * GET /products
 */
export function createGetProducts(options?: {
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
    select?: (
      data: InferResponseType<typeof client.products.$get>,
    ) => InferResponseType<typeof client.products.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetProductsQueryKey(),
    queryFn: async () => parseResponse(client.products.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /products
 */
export function getGetProductsQueryKey() {
  return ['/products'] as const
}

/**
 * POST /products
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
      select?: (
        data: InferResponseType<(typeof client.products)[':productId']['$get']>,
      ) => InferResponseType<(typeof client.products)[':productId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetProductsProductIdQueryKey(args),
    queryFn: async () => parseResponse(client.products[':productId'].$get(args, clientOptions)),
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

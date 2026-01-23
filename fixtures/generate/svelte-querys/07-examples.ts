import type { CreateMutationOptions, CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/07-examples'

/**
 * GET /products
 */
export function createGetProducts(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.products.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProductsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.products.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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

import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/07-examples'

/**
 * GET /products
 */
export function useGetProducts(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.products.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/products'] as const) : null
  return useSWR<InferResponseType<typeof client.products.$get>, Error>(
    key,
    async () => parseResponse(client.products.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /products
 */
export function getGetProductsKey() {
  return ['GET', '/products'] as const
}

/**
 * POST /products
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
 */
export function useGetProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.products)[':productId']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/products/:productId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.products)[':productId']['$get']>, Error>(
    key,
    async () => parseResponse(client.products[':productId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /products/{productId}
 */
export function getGetProductsProductIdKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return ['GET', '/products/:productId', args] as const
}

import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/07-examples'

/**
 * GET /products
 */
export async function getProducts(options?: ClientRequestOptions) {
  return await client.products.$get(undefined, options)
}

/**
 * POST /products
 */
export async function postProducts(
  args: InferRequestType<typeof client.products.$post>,
  options?: ClientRequestOptions,
) {
  return await client.products.$post(args, options)
}

/**
 * GET /products/{productId}
 */
export async function getProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.products[':productId'].$get(args, options)
}

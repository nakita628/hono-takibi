import type { InferRequestType } from 'hono/client'
import { client } from '../clients/07-examples'

/**
 * GET /products
 */
export async function getProducts() {
  return await client.products.$get()
}

/**
 * POST /products
 */
export async function postProducts(arg: InferRequestType<typeof client.products.$post>) {
  return await client.products.$post(arg)
}

/**
 * GET /products/{productId}
 */
export async function getProductsProductId(
  arg: InferRequestType<(typeof client)['products'][':productId']['$get']>,
) {
  return await client['products'][':productId']['$get'](arg)
}

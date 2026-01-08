import type { InferRequestType } from 'hono/client'
import { client } from '../clients/11-comprehensive'

/**
 * GET /products
 *
 * List all products
 *
 * Retrieve a paginated list of products with optional filtering
 */
export async function getProducts(arg: InferRequestType<typeof client.products.$get>) {
  return await client.products.$get(arg)
}

/**
 * POST /products
 *
 * Create a new product
 */
export async function postProducts(arg: InferRequestType<typeof client.products.$post>) {
  return await client.products.$post(arg)
}

/**
 * GET /products/{productId}
 *
 * Get product by ID
 */
export async function getProductsProductId(
  arg: InferRequestType<(typeof client)['products'][':productId']['$get']>,
) {
  return await client['products'][':productId']['$get'](arg)
}

/**
 * PUT /products/{productId}
 *
 * Update a product
 */
export async function putProductsProductId(
  arg: InferRequestType<(typeof client)['products'][':productId']['$put']>,
) {
  return await client['products'][':productId']['$put'](arg)
}

/**
 * DELETE /products/{productId}
 *
 * Delete a product
 */
export async function deleteProductsProductId(
  arg: InferRequestType<(typeof client)['products'][':productId']['$delete']>,
) {
  return await client['products'][':productId']['$delete'](arg)
}

/**
 * POST /orders
 *
 * Create a new order
 */
export async function postOrders(arg: InferRequestType<typeof client.orders.$post>) {
  return await client.orders.$post(arg)
}

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export async function postWebhooks(arg: InferRequestType<typeof client.webhooks.$post>) {
  return await client.webhooks.$post(arg)
}

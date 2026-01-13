import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/11-comprehensive'

/**
 * GET /products
 *
 * List all products
 *
 * Retrieve a paginated list of products with optional filtering
 */
export async function getProducts(
  args: InferRequestType<typeof client.products.$get>,
  options?: ClientRequestOptions,
) {
  return await client.products.$get(args, options)
}

/**
 * POST /products
 *
 * Create a new product
 */
export async function postProducts(
  args: InferRequestType<typeof client.products.$post>,
  options?: ClientRequestOptions,
) {
  return await client.products.$post(args, options)
}

/**
 * GET /products/{productId}
 *
 * Get product by ID
 */
export async function getProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.products[':productId'].$get(args, options)
}

/**
 * PUT /products/{productId}
 *
 * Update a product
 */
export async function putProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.products[':productId'].$put(args, options)
}

/**
 * DELETE /products/{productId}
 *
 * Delete a product
 */
export async function deleteProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.products[':productId'].$delete(args, options)
}

/**
 * POST /orders
 *
 * Create a new order
 */
export async function postOrders(
  args: InferRequestType<typeof client.orders.$post>,
  options?: ClientRequestOptions,
) {
  return await client.orders.$post(args, options)
}

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export async function postWebhooks(
  args: InferRequestType<typeof client.webhooks.$post>,
  options?: ClientRequestOptions,
) {
  return await client.webhooks.$post(args, options)
}

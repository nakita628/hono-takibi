import { client } from '../clients/11-comprehensive'

/**
 * GET /products
 *
 * List all products
 *
 * Retrieve a paginated list of products with optional filtering
 */
export async function getProducts(params: {
  query: {
    page: number
    limit: number
    q: string
    category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
  }
}) {
  return await client.products.$get({ query: params.query })
}

/**
 * POST /products
 *
 * Create a new product
 */
export async function postProducts() {
  return await client.products.$post()
}

/**
 * GET /products/{productId}
 *
 * Get product by ID
 */
export async function getProductsProductId(params: { path: { productId: string } }) {
  return await client.products[':productId'].$get({ param: params.path })
}

/**
 * PUT /products/{productId}
 *
 * Update a product
 */
export async function putProductsProductId(params: { path: { productId: string } }) {
  return await client.products[':productId'].$put({ param: params.path })
}

/**
 * DELETE /products/{productId}
 *
 * Delete a product
 */
export async function deleteProductsProductId(params: { path: { productId: string } }) {
  return await client.products[':productId'].$delete({ param: params.path })
}

/**
 * POST /orders
 *
 * Create a new order
 */
export async function postOrders() {
  return await client.orders.$post()
}

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export async function postWebhooks() {
  return await client.webhooks.$post()
}

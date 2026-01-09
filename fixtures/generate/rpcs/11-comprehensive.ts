import { client } from '../clients/11-comprehensive'

/**
 * GET /products
 *
 * List all products
 *
 * Retrieve a paginated list of products with optional filtering
 */
export async function getProducts(arg: {
  query: {
    page?: number
    limit?: number
    q?: string
    category?: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
  }
  header: { 'Accept-Language'?: string }
}) {
  return await client.products.$get(arg)
}

/**
 * POST /products
 *
 * Create a new product
 */
export async function postProducts(arg: {
  json: {
    sku?: string
    name: string
    description?: string
    price: { amount: number; currency: string }
    category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
    tags?: string[]
    inventory?: number
    images?: string[]
  }
}) {
  return await client.products.$post(arg)
}

/**
 * GET /products/{productId}
 *
 * Get product by ID
 */
export async function getProductsProductId(arg: {
  param: { productId: string }
  header: { 'If-None-Match'?: string }
}) {
  return await client['products'][':productId']['$get'](arg)
}

/**
 * PUT /products/{productId}
 *
 * Update a product
 */
export async function putProductsProductId(arg: {
  param: { productId: string }
  header: { 'If-Match'?: string }
  json: {
    sku?: string
    name: string
    description?: string
    price: { amount: number; currency: string }
    category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
    tags?: string[]
    inventory?: number
    images?: string[]
  } & { status?: 'draft' | 'active' | 'archived' }
}) {
  return await client['products'][':productId']['$put'](arg)
}

/**
 * DELETE /products/{productId}
 *
 * Delete a product
 */
export async function deleteProductsProductId(arg: {
  param: { productId: string }
  header: { 'If-Match'?: string }
}) {
  return await client['products'][':productId']['$delete'](arg)
}

/**
 * POST /orders
 *
 * Create a new order
 */
export async function postOrders(arg: {
  json: {
    items: { productId: string; quantity: number }[]
    shippingAddress: {
      street: string
      city: string
      state?: string
      postalCode?: string
      country: string
    }
    billingAddress?: {
      street: string
      city: string
      state?: string
      postalCode?: string
      country: string
    }
    callbackUrl?: string
  }
}) {
  return await client.orders.$post(arg)
}

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export async function postWebhooks(arg: {
  json: { url: string; events: string[]; secret?: string }
}) {
  return await client.webhooks.$post(arg)
}

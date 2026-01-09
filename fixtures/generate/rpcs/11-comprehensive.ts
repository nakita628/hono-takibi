import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/11-comprehensive'

/**
 * GET /products
 *
 * List all products
 *
 * Retrieve a paginated list of products with optional filtering
 */
export async function getProducts(
  args: {
    query: {
      page?: number
      limit?: number
      q?: string
      category?: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
    }
    header: { 'Accept-Language'?: string }
  },
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
  args: {
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
  },
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
  args: { param: { productId: string }; header: { 'If-None-Match'?: string } },
  options?: ClientRequestOptions,
) {
  return await client['products'][':productId']['$get'](args, options)
}

/**
 * PUT /products/{productId}
 *
 * Update a product
 */
export async function putProductsProductId(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client['products'][':productId']['$put'](args, options)
}

/**
 * DELETE /products/{productId}
 *
 * Delete a product
 */
export async function deleteProductsProductId(
  args: { param: { productId: string }; header: { 'If-Match'?: string } },
  options?: ClientRequestOptions,
) {
  return await client['products'][':productId']['$delete'](args, options)
}

/**
 * POST /orders
 *
 * Create a new order
 */
export async function postOrders(
  args: {
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
  },
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
  args: { json: { url: string; events: string[]; secret?: string } },
  options?: ClientRequestOptions,
) {
  return await client.webhooks.$post(args, options)
}

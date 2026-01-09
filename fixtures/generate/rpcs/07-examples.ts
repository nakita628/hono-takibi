import type { ClientRequestOptions } from 'hono/client'
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
  args: {
    json: {
      name: string
      description?: string
      price: number
      category: 'electronics' | 'clothing' | 'books' | 'home'
      tags?: string[]
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.products.$post(args, options)
}

/**
 * GET /products/{productId}
 */
export async function getProductsProductId(
  args: { param: { productId: string } },
  options?: ClientRequestOptions,
) {
  return await client.products[':productId'].$get(args, options)
}

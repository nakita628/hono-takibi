import { client } from '../index.ts'

/**
 * GET /products
 */
export async function getProducts() {
  return await client.products.$get()
}

/**
 * POST /products
 */
export async function postProducts(body: {
  name: string
  description?: string
  price: number
  category: 'electronics' | 'clothing' | 'books' | 'home'
  tags?: string[]
}) {
  return await client.products.$post({ json: body })
}

/**
 * GET /products/{productId}
 */
export async function getProductsProductId(params: { path: { productId: string } }) {
  return await client.products[':productId'].$get({ param: params.path })
}

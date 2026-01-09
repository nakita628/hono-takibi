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
export async function postProducts(arg: {
  json: {
    name: string
    description?: string
    price: number
    category: 'electronics' | 'clothing' | 'books' | 'home'
    tags?: string[]
  }
}) {
  return await client.products.$post(arg)
}

/**
 * GET /products/{productId}
 */
export async function getProductsProductId(arg: { param: { productId: string } }) {
  return await client['products'][':productId']['$get'](arg)
}

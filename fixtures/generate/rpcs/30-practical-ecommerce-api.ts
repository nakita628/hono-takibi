import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/30-practical-ecommerce-api'

/**
 * GET /products
 *
 * 商品一覧取得
 */
export async function getProducts(args: {
  query: {
    page?: number
    limit?: number
    category?: string
    minPrice?: number
    maxPrice?: number
    inStock?: string
    search?: string
    sort?:
      | 'price:asc'
      | 'price:desc'
      | 'name:asc'
      | 'name:desc'
      | 'createdAt:desc'
      | 'popularity:desc'
  }
  options?: ClientRequestOptions
}) {
  return await client.products.$get(args)
}

/**
 * POST /products
 *
 * 商品作成
 */
export async function postProducts(args: {
  json: {
    name: string
    description?: string
    price: number
    compareAtPrice?: number
    sku?: string
    barcode?: string
    categoryId?: string
    status?: 'draft' | 'active'
    attributes?: { [key: string]: string }
    tags?: string[]
  }
  options?: ClientRequestOptions
}) {
  return await client.products.$post(args)
}

/**
 * GET /products/{productId}
 *
 * 商品詳細取得
 */
export async function getProductsProductId(args: {
  param: { productId: string }
  options?: ClientRequestOptions
}) {
  return await client['products'][':productId']['$get'](args)
}

/**
 * PUT /products/{productId}
 *
 * 商品更新
 */
export async function putProductsProductId(args: {
  param: { productId: string }
  json: {
    name?: string
    description?: string
    price?: number
    compareAtPrice?: number
    sku?: string
    barcode?: string
    categoryId?: string
    status?: 'draft' | 'active' | 'archived'
    attributes?: { [key: string]: string }
    tags?: string[]
  }
  options?: ClientRequestOptions
}) {
  return await client['products'][':productId']['$put'](args)
}

/**
 * DELETE /products/{productId}
 *
 * 商品削除
 */
export async function deleteProductsProductId(args: {
  param: { productId: string }
  options?: ClientRequestOptions
}) {
  return await client['products'][':productId']['$delete'](args)
}

/**
 * POST /products/{productId}/images
 *
 * 商品画像アップロード
 */
export async function postProductsProductIdImages(args: {
  param: { productId: string }
  form: { file: File; isPrimary?: boolean }
  options?: ClientRequestOptions
}) {
  return await client['products'][':productId']['images']['$post'](args)
}

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export async function getCategories(args?: { options?: ClientRequestOptions }) {
  return await client.categories.$get(args)
}

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export async function postCategories(args: {
  json: { name: string; slug?: string; description?: string; parentId?: string }
  options?: ClientRequestOptions
}) {
  return await client.categories.$post(args)
}

/**
 * GET /cart
 *
 * カート取得
 */
export async function getCart(args?: { options?: ClientRequestOptions }) {
  return await client.cart.$get(args)
}

/**
 * DELETE /cart
 *
 * カートをクリア
 */
export async function deleteCart(args?: { options?: ClientRequestOptions }) {
  return await client.cart.$delete(args)
}

/**
 * POST /cart/items
 *
 * カートに商品追加
 */
export async function postCartItems(args: {
  json: { productId: string; quantity: number }
  options?: ClientRequestOptions
}) {
  return await client['cart']['items']['$post'](args)
}

/**
 * PUT /cart/items/{itemId}
 *
 * カートアイテム数量変更
 */
export async function putCartItemsItemId(args: {
  param: { itemId: string }
  json: { quantity: number }
  options?: ClientRequestOptions
}) {
  return await client['cart']['items'][':itemId']['$put'](args)
}

/**
 * DELETE /cart/items/{itemId}
 *
 * カートから商品削除
 */
export async function deleteCartItemsItemId(args: {
  param: { itemId: string }
  options?: ClientRequestOptions
}) {
  return await client['cart']['items'][':itemId']['$delete'](args)
}

/**
 * GET /orders
 *
 * 注文一覧取得
 */
export async function getOrders(args: {
  query: {
    page?: number
    limit?: number
    status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  }
  options?: ClientRequestOptions
}) {
  return await client.orders.$get(args)
}

/**
 * POST /orders
 *
 * 注文作成
 *
 * カートの内容から注文を作成します
 */
export async function postOrders(args: {
  json: {
    shippingAddress: {
      name: string
      postalCode: string
      prefecture: string
      city: string
      address1: string
      address2?: string
      phone?: string
    }
    billingAddress?: {
      name: string
      postalCode: string
      prefecture: string
      city: string
      address1: string
      address2?: string
      phone?: string
    }
    paymentMethod: 'credit_card' | 'bank_transfer' | 'convenience_store' | 'cod'
    notes?: string
    couponCode?: string
  }
  options?: ClientRequestOptions
}) {
  return await client.orders.$post(args)
}

/**
 * GET /orders/{orderId}
 *
 * 注文詳細取得
 */
export async function getOrdersOrderId(args: {
  param: { orderId: string }
  options?: ClientRequestOptions
}) {
  return await client['orders'][':orderId']['$get'](args)
}

/**
 * POST /orders/{orderId}/cancel
 *
 * 注文キャンセル
 */
export async function postOrdersOrderIdCancel(args: {
  param: { orderId: string }
  json: { reason?: string }
  options?: ClientRequestOptions
}) {
  return await client['orders'][':orderId']['cancel']['$post'](args)
}

/**
 * GET /inventory/{productId}
 *
 * 在庫情報取得
 */
export async function getInventoryProductId(args: {
  param: { productId: string }
  options?: ClientRequestOptions
}) {
  return await client['inventory'][':productId']['$get'](args)
}

/**
 * PUT /inventory/{productId}
 *
 * 在庫更新
 */
export async function putInventoryProductId(args: {
  param: { productId: string }
  json: { quantity?: number; lowStockThreshold?: number; trackInventory?: boolean }
  options?: ClientRequestOptions
}) {
  return await client['inventory'][':productId']['$put'](args)
}

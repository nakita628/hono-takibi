import { client } from '../index.ts'

/**
 * GET /products
 *
 * 商品一覧取得
 */
export async function getProducts(params: {
  query: {
    page: number
    limit: number
    category: string
    minPrice: number
    maxPrice: number
    inStock: boolean
    search: string
    sort:
      | 'price:asc'
      | 'price:desc'
      | 'name:asc'
      | 'name:desc'
      | 'createdAt:desc'
      | 'popularity:desc'
  }
}) {
  return await client.products.$get({ query: params.query })
}

/**
 * POST /products
 *
 * 商品作成
 */
export async function postProducts(body: {
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
}) {
  return await client.products.$post({ json: body })
}

/**
 * GET /products/{productId}
 *
 * 商品詳細取得
 */
export async function getProductsProductId(params: { path: { productId: string } }) {
  return await client.products[':productId'].$get({ param: params.path })
}

/**
 * PUT /products/{productId}
 *
 * 商品更新
 */
export async function putProductsProductId(
  params: { path: { productId: string } },
  body: {
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
  },
) {
  return await client.products[':productId'].$put({ param: params.path, json: body })
}

/**
 * DELETE /products/{productId}
 *
 * 商品削除
 */
export async function deleteProductsProductId(params: { path: { productId: string } }) {
  return await client.products[':productId'].$delete({ param: params.path })
}

/**
 * POST /products/{productId}/images
 *
 * 商品画像アップロード
 */
export async function postProductsProductIdImages(
  params: { path: { productId: string } },
  body: { file: string; isPrimary?: boolean },
) {
  return await client.products[':productId'].images.$post({ param: params.path, json: body })
}

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export async function getCategories() {
  return await client.categories.$get()
}

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export async function postCategories(body: {
  name: string
  slug?: string
  description?: string
  parentId?: string
}) {
  return await client.categories.$post({ json: body })
}

/**
 * GET /cart
 *
 * カート取得
 */
export async function getCart() {
  return await client.cart.$get()
}

/**
 * DELETE /cart
 *
 * カートをクリア
 */
export async function deleteCart() {
  return await client.cart.$delete()
}

/**
 * POST /cart/items
 *
 * カートに商品追加
 */
export async function postCartItems(body: { productId: string; quantity: number }) {
  return await client.cart.items.$post({ json: body })
}

/**
 * PUT /cart/items/{itemId}
 *
 * カートアイテム数量変更
 */
export async function putCartItemsItemId(
  params: { path: { itemId: string } },
  body: { quantity: number },
) {
  return await client.cart.items[':itemId'].$put({ param: params.path, json: body })
}

/**
 * DELETE /cart/items/{itemId}
 *
 * カートから商品削除
 */
export async function deleteCartItemsItemId(params: { path: { itemId: string } }) {
  return await client.cart.items[':itemId'].$delete({ param: params.path })
}

/**
 * GET /orders
 *
 * 注文一覧取得
 */
export async function getOrders(params: {
  query: {
    page: number
    limit: number
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  }
}) {
  return await client.orders.$get({ query: params.query })
}

/**
 * POST /orders
 *
 * 注文作成
 *
 * カートの内容から注文を作成します
 */
export async function postOrders(body: {
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
}) {
  return await client.orders.$post({ json: body })
}

/**
 * GET /orders/{orderId}
 *
 * 注文詳細取得
 */
export async function getOrdersOrderId(params: { path: { orderId: string } }) {
  return await client.orders[':orderId'].$get({ param: params.path })
}

/**
 * POST /orders/{orderId}/cancel
 *
 * 注文キャンセル
 */
export async function postOrdersOrderIdCancel(
  params: { path: { orderId: string } },
  body: { reason?: string },
) {
  return await client.orders[':orderId'].cancel.$post({ param: params.path, json: body })
}

/**
 * GET /inventory/{productId}
 *
 * 在庫情報取得
 */
export async function getInventoryProductId(params: { path: { productId: string } }) {
  return await client.inventory[':productId'].$get({ param: params.path })
}

/**
 * PUT /inventory/{productId}
 *
 * 在庫更新
 */
export async function putInventoryProductId(
  params: { path: { productId: string } },
  body: { quantity?: number; lowStockThreshold?: number; trackInventory?: boolean },
) {
  return await client.inventory[':productId'].$put({ param: params.path, json: body })
}

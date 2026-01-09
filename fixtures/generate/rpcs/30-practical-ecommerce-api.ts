import { client } from '../clients/30-practical-ecommerce-api'

/**
 * GET /products
 *
 * 商品一覧取得
 */
export async function getProducts(arg: {
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
}) {
  return await client.products.$get(arg)
}

/**
 * POST /products
 *
 * 商品作成
 */
export async function postProducts(arg: {
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
}) {
  return await client.products.$post(arg)
}

/**
 * GET /products/{productId}
 *
 * 商品詳細取得
 */
export async function getProductsProductId(arg: { param: { productId: string } }) {
  return await client['products'][':productId']['$get'](arg)
}

/**
 * PUT /products/{productId}
 *
 * 商品更新
 */
export async function putProductsProductId(arg: {
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
}) {
  return await client['products'][':productId']['$put'](arg)
}

/**
 * DELETE /products/{productId}
 *
 * 商品削除
 */
export async function deleteProductsProductId(arg: { param: { productId: string } }) {
  return await client['products'][':productId']['$delete'](arg)
}

/**
 * POST /products/{productId}/images
 *
 * 商品画像アップロード
 */
export async function postProductsProductIdImages(arg: {
  param: { productId: string }
  form: { file: File; isPrimary?: boolean }
}) {
  return await client['products'][':productId']['images']['$post'](arg)
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
export async function postCategories(arg: {
  json: { name: string; slug?: string; description?: string; parentId?: string }
}) {
  return await client.categories.$post(arg)
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
export async function postCartItems(arg: { json: { productId: string; quantity: number } }) {
  return await client['cart']['items']['$post'](arg)
}

/**
 * PUT /cart/items/{itemId}
 *
 * カートアイテム数量変更
 */
export async function putCartItemsItemId(arg: {
  param: { itemId: string }
  json: { quantity: number }
}) {
  return await client['cart']['items'][':itemId']['$put'](arg)
}

/**
 * DELETE /cart/items/{itemId}
 *
 * カートから商品削除
 */
export async function deleteCartItemsItemId(arg: { param: { itemId: string } }) {
  return await client['cart']['items'][':itemId']['$delete'](arg)
}

/**
 * GET /orders
 *
 * 注文一覧取得
 */
export async function getOrders(arg: {
  query: {
    page?: number
    limit?: number
    status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  }
}) {
  return await client.orders.$get(arg)
}

/**
 * POST /orders
 *
 * 注文作成
 *
 * カートの内容から注文を作成します
 */
export async function postOrders(arg: {
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
}) {
  return await client.orders.$post(arg)
}

/**
 * GET /orders/{orderId}
 *
 * 注文詳細取得
 */
export async function getOrdersOrderId(arg: { param: { orderId: string } }) {
  return await client['orders'][':orderId']['$get'](arg)
}

/**
 * POST /orders/{orderId}/cancel
 *
 * 注文キャンセル
 */
export async function postOrdersOrderIdCancel(arg: {
  param: { orderId: string }
  json: { reason?: string }
}) {
  return await client['orders'][':orderId']['cancel']['$post'](arg)
}

/**
 * GET /inventory/{productId}
 *
 * 在庫情報取得
 */
export async function getInventoryProductId(arg: { param: { productId: string } }) {
  return await client['inventory'][':productId']['$get'](arg)
}

/**
 * PUT /inventory/{productId}
 *
 * 在庫更新
 */
export async function putInventoryProductId(arg: {
  param: { productId: string }
  json: { quantity?: number; lowStockThreshold?: number; trackInventory?: boolean }
}) {
  return await client['inventory'][':productId']['$put'](arg)
}

import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/30-practical-ecommerce-api'

/**
 * GET /products
 *
 * 商品一覧取得
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
 * 商品作成
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
 * 商品詳細取得
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
 * 商品更新
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
 * 商品削除
 */
export async function deleteProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.products[':productId'].$delete(args, options)
}

/**
 * POST /products/{productId}/images
 *
 * 商品画像アップロード
 */
export async function postProductsProductIdImages(
  args: InferRequestType<(typeof client.products)[':productId']['images']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.products[':productId'].images.$post(args, options)
}

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export async function getCategories(options?: ClientRequestOptions) {
  return await client.categories.$get(undefined, options)
}

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export async function postCategories(
  args: InferRequestType<typeof client.categories.$post>,
  options?: ClientRequestOptions,
) {
  return await client.categories.$post(args, options)
}

/**
 * GET /cart
 *
 * カート取得
 */
export async function getCart(options?: ClientRequestOptions) {
  return await client.cart.$get(undefined, options)
}

/**
 * DELETE /cart
 *
 * カートをクリア
 */
export async function deleteCart(options?: ClientRequestOptions) {
  return await client.cart.$delete(undefined, options)
}

/**
 * POST /cart/items
 *
 * カートに商品追加
 */
export async function postCartItems(
  args: InferRequestType<typeof client.cart.items.$post>,
  options?: ClientRequestOptions,
) {
  return await client.cart.items.$post(args, options)
}

/**
 * PUT /cart/items/{itemId}
 *
 * カートアイテム数量変更
 */
export async function putCartItemsItemId(
  args: InferRequestType<(typeof client.cart.items)[':itemId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.cart.items[':itemId'].$put(args, options)
}

/**
 * DELETE /cart/items/{itemId}
 *
 * カートから商品削除
 */
export async function deleteCartItemsItemId(
  args: InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.cart.items[':itemId'].$delete(args, options)
}

/**
 * GET /orders
 *
 * 注文一覧取得
 */
export async function getOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options?: ClientRequestOptions,
) {
  return await client.orders.$get(args, options)
}

/**
 * POST /orders
 *
 * 注文作成
 *
 * カートの内容から注文を作成します
 */
export async function postOrders(
  args: InferRequestType<typeof client.orders.$post>,
  options?: ClientRequestOptions,
) {
  return await client.orders.$post(args, options)
}

/**
 * GET /orders/{orderId}
 *
 * 注文詳細取得
 */
export async function getOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.orders[':orderId'].$get(args, options)
}

/**
 * POST /orders/{orderId}/cancel
 *
 * 注文キャンセル
 */
export async function postOrdersOrderIdCancel(
  args: InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.orders[':orderId'].cancel.$post(args, options)
}

/**
 * GET /inventory/{productId}
 *
 * 在庫情報取得
 */
export async function getInventoryProductId(
  args: InferRequestType<(typeof client.inventory)[':productId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.inventory[':productId'].$get(args, options)
}

/**
 * PUT /inventory/{productId}
 *
 * 在庫更新
 */
export async function putInventoryProductId(
  args: InferRequestType<(typeof client.inventory)[':productId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.inventory[':productId'].$put(args, options)
}

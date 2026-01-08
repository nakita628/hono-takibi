import type { InferRequestType } from 'hono/client'
import { client } from '../clients/30-practical-ecommerce-api'

/**
 * GET /products
 *
 * 商品一覧取得
 */
export async function getProducts(arg: InferRequestType<typeof client.products.$get>) {
  return await client.products.$get(arg)
}

/**
 * POST /products
 *
 * 商品作成
 */
export async function postProducts(arg: InferRequestType<typeof client.products.$post>) {
  return await client.products.$post(arg)
}

/**
 * GET /products/{productId}
 *
 * 商品詳細取得
 */
export async function getProductsProductId(
  arg: InferRequestType<(typeof client)['products'][':productId']['$get']>,
) {
  return await client['products'][':productId']['$get'](arg)
}

/**
 * PUT /products/{productId}
 *
 * 商品更新
 */
export async function putProductsProductId(
  arg: InferRequestType<(typeof client)['products'][':productId']['$put']>,
) {
  return await client['products'][':productId']['$put'](arg)
}

/**
 * DELETE /products/{productId}
 *
 * 商品削除
 */
export async function deleteProductsProductId(
  arg: InferRequestType<(typeof client)['products'][':productId']['$delete']>,
) {
  return await client['products'][':productId']['$delete'](arg)
}

/**
 * POST /products/{productId}/images
 *
 * 商品画像アップロード
 */
export async function postProductsProductIdImages(
  arg: InferRequestType<(typeof client)['products'][':productId']['images']['$post']>,
) {
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
export async function postCategories(arg: InferRequestType<typeof client.categories.$post>) {
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
export async function postCartItems(
  arg: InferRequestType<(typeof client)['cart']['items']['$post']>,
) {
  return await client['cart']['items']['$post'](arg)
}

/**
 * PUT /cart/items/{itemId}
 *
 * カートアイテム数量変更
 */
export async function putCartItemsItemId(
  arg: InferRequestType<(typeof client)['cart']['items'][':itemId']['$put']>,
) {
  return await client['cart']['items'][':itemId']['$put'](arg)
}

/**
 * DELETE /cart/items/{itemId}
 *
 * カートから商品削除
 */
export async function deleteCartItemsItemId(
  arg: InferRequestType<(typeof client)['cart']['items'][':itemId']['$delete']>,
) {
  return await client['cart']['items'][':itemId']['$delete'](arg)
}

/**
 * GET /orders
 *
 * 注文一覧取得
 */
export async function getOrders(arg: InferRequestType<typeof client.orders.$get>) {
  return await client.orders.$get(arg)
}

/**
 * POST /orders
 *
 * 注文作成
 *
 * カートの内容から注文を作成します
 */
export async function postOrders(arg: InferRequestType<typeof client.orders.$post>) {
  return await client.orders.$post(arg)
}

/**
 * GET /orders/{orderId}
 *
 * 注文詳細取得
 */
export async function getOrdersOrderId(
  arg: InferRequestType<(typeof client)['orders'][':orderId']['$get']>,
) {
  return await client['orders'][':orderId']['$get'](arg)
}

/**
 * POST /orders/{orderId}/cancel
 *
 * 注文キャンセル
 */
export async function postOrdersOrderIdCancel(
  arg: InferRequestType<(typeof client)['orders'][':orderId']['cancel']['$post']>,
) {
  return await client['orders'][':orderId']['cancel']['$post'](arg)
}

/**
 * GET /inventory/{productId}
 *
 * 在庫情報取得
 */
export async function getInventoryProductId(
  arg: InferRequestType<(typeof client)['inventory'][':productId']['$get']>,
) {
  return await client['inventory'][':productId']['$get'](arg)
}

/**
 * PUT /inventory/{productId}
 *
 * 在庫更新
 */
export async function putInventoryProductId(
  arg: InferRequestType<(typeof client)['inventory'][':productId']['$put']>,
) {
  return await client['inventory'][':productId']['$put'](arg)
}

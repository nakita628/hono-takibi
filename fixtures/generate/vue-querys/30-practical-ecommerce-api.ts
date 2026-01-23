import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/30-practical-ecommerce-api'

/**
 * GET /products
 *
 * 商品一覧取得
 */
export function useGetProducts(
  args: InferRequestType<typeof client.products.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetProductsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.products.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /products
 */
export function getGetProductsQueryKey(args: InferRequestType<typeof client.products.$get>) {
  return ['/products', args] as const
}

/**
 * POST /products
 *
 * 商品作成
 */
export function usePostProducts(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.products.$post> | undefined,
    Error,
    InferRequestType<typeof client.products.$post>
  >({ mutationFn: async (args) => parseResponse(client.products.$post(args, clientOptions)) })
}

/**
 * GET /products/{productId}
 *
 * 商品詳細取得
 */
export function useGetProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetProductsProductIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.products[':productId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /products/{productId}
 */
export function getGetProductsProductIdQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return ['/products/:productId', args] as const
}

/**
 * PUT /products/{productId}
 *
 * 商品更新
 */
export function usePutProductsProductId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.products)[':productId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.products[':productId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /products/{productId}
 *
 * 商品削除
 */
export function useDeleteProductsProductId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.products)[':productId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.products)[':productId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.products[':productId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /products/{productId}/images
 *
 * 商品画像アップロード
 */
export function usePostProductsProductIdImages(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.products)[':productId']['images']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.products)[':productId']['images']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.products[':productId'].images.$post(args, clientOptions)),
  })
}

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export function useGetCategories(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetCategoriesQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.categories.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /categories
 */
export function getGetCategoriesQueryKey() {
  return ['/categories'] as const
}

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export function usePostCategories(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.categories.$post> | undefined,
    Error,
    InferRequestType<typeof client.categories.$post>
  >({ mutationFn: async (args) => parseResponse(client.categories.$post(args, clientOptions)) })
}

/**
 * GET /cart
 *
 * カート取得
 */
export function useGetCart(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetCartQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.cart.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /cart
 */
export function getGetCartQueryKey() {
  return ['/cart'] as const
}

/**
 * DELETE /cart
 *
 * カートをクリア
 */
export function useDeleteCart(clientOptions?: ClientRequestOptions) {
  return useMutation<InferResponseType<typeof client.cart.$delete> | undefined, Error, void>({
    mutationFn: async () => parseResponse(client.cart.$delete(undefined, clientOptions)),
  })
}

/**
 * POST /cart/items
 *
 * カートに商品追加
 */
export function usePostCartItems(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.cart.items.$post> | undefined,
    Error,
    InferRequestType<typeof client.cart.items.$post>
  >({ mutationFn: async (args) => parseResponse(client.cart.items.$post(args, clientOptions)) })
}

/**
 * PUT /cart/items/{itemId}
 *
 * カートアイテム数量変更
 */
export function usePutCartItemsItemId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.cart.items)[':itemId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.cart.items)[':itemId']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.cart.items[':itemId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /cart/items/{itemId}
 *
 * カートから商品削除
 */
export function useDeleteCartItemsItemId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.cart.items)[':itemId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.cart.items[':itemId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /orders
 *
 * 注文一覧取得
 */
export function useGetOrders(
  args: InferRequestType<typeof client.orders.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetOrdersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.orders.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /orders
 */
export function getGetOrdersQueryKey(args: InferRequestType<typeof client.orders.$get>) {
  return ['/orders', args] as const
}

/**
 * POST /orders
 *
 * 注文作成
 *
 * カートの内容から注文を作成します
 */
export function usePostOrders(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.orders.$post> | undefined,
    Error,
    InferRequestType<typeof client.orders.$post>
  >({ mutationFn: async (args) => parseResponse(client.orders.$post(args, clientOptions)) })
}

/**
 * GET /orders/{orderId}
 *
 * 注文詳細取得
 */
export function useGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetOrdersOrderIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.orders[':orderId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /orders/{orderId}
 */
export function getGetOrdersOrderIdQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['/orders/:orderId', args] as const
}

/**
 * POST /orders/{orderId}/cancel
 *
 * 注文キャンセル
 */
export function usePostOrdersOrderIdCancel(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.orders)[':orderId']['cancel']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.orders[':orderId'].cancel.$post(args, clientOptions)),
  })
}

/**
 * GET /inventory/{productId}
 *
 * 在庫情報取得
 */
export function useGetInventoryProductId(
  args: InferRequestType<(typeof client.inventory)[':productId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetInventoryProductIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.inventory[':productId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /inventory/{productId}
 */
export function getGetInventoryProductIdQueryKey(
  args: InferRequestType<(typeof client.inventory)[':productId']['$get']>,
) {
  return ['/inventory/:productId', args] as const
}

/**
 * PUT /inventory/{productId}
 *
 * 在庫更新
 */
export function usePutInventoryProductId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.inventory)[':productId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.inventory)[':productId']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.inventory[':productId'].$put(args, clientOptions)),
  })
}

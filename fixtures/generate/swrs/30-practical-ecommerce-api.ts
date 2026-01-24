import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/30-practical-ecommerce-api'

/**
 * GET /products
 *
 * 商品一覧取得
 */
export function useGetProducts(
  args: InferRequestType<typeof client.products.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProductsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.products.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /products
 */
export function getGetProductsKey(args?: InferRequestType<typeof client.products.$get>) {
  return ['/products', ...(args ? [args] : [])] as const
}

/**
 * POST /products
 *
 * 商品作成
 */
export function usePostProducts(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /products',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.products.$post> }) =>
      parseResponse(client.products.$post(arg, options?.client)),
  )
}

/**
 * GET /products/{productId}
 *
 * 商品詳細取得
 */
export function useGetProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProductsProductIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.products[':productId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /products/{productId}
 */
export function getGetProductsProductIdKey(
  args?: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return ['/products/:productId', ...(args ? [args] : [])] as const
}

/**
 * PUT /products/{productId}
 *
 * 商品更新
 */
export function usePutProductsProductId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /products/:productId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.products)[':productId']['$put']> },
    ) => parseResponse(client.products[':productId'].$put(arg, options?.client)),
  )
}

/**
 * DELETE /products/{productId}
 *
 * 商品削除
 */
export function useDeleteProductsProductId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /products/:productId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.products)[':productId']['$delete']> },
    ) => parseResponse(client.products[':productId'].$delete(arg, options?.client)),
  )
}

/**
 * POST /products/{productId}/images
 *
 * 商品画像アップロード
 */
export function usePostProductsProductIdImages(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /products/:productId/images',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.products)[':productId']['images']['$post']> },
    ) => parseResponse(client.products[':productId'].images.$post(arg, options?.client)),
  )
}

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export function useGetCategories(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCategoriesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.categories.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /categories
 */
export function getGetCategoriesKey() {
  return ['/categories'] as const
}

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export function usePostCategories(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /categories',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.categories.$post> }) =>
      parseResponse(client.categories.$post(arg, options?.client)),
  )
}

/**
 * GET /cart
 *
 * カート取得
 */
export function useGetCart(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCartKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.cart.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /cart
 */
export function getGetCartKey() {
  return ['/cart'] as const
}

/**
 * DELETE /cart
 *
 * カートをクリア
 */
export function useDeleteCart(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation('DELETE /cart', async () =>
    parseResponse(client.cart.$delete(undefined, options?.client)),
  )
}

/**
 * POST /cart/items
 *
 * カートに商品追加
 */
export function usePostCartItems(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /cart/items',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.cart.items.$post> }) =>
      parseResponse(client.cart.items.$post(arg, options?.client)),
  )
}

/**
 * PUT /cart/items/{itemId}
 *
 * カートアイテム数量変更
 */
export function usePutCartItemsItemId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /cart/items/:itemId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.cart.items)[':itemId']['$put']> },
    ) => parseResponse(client.cart.items[':itemId'].$put(arg, options?.client)),
  )
}

/**
 * DELETE /cart/items/{itemId}
 *
 * カートから商品削除
 */
export function useDeleteCartItemsItemId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /cart/items/:itemId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.cart.items)[':itemId']['$delete']> },
    ) => parseResponse(client.cart.items[':itemId'].$delete(arg, options?.client)),
  )
}

/**
 * GET /orders
 *
 * 注文一覧取得
 */
export function useGetOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOrdersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.orders.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /orders
 */
export function getGetOrdersKey(args?: InferRequestType<typeof client.orders.$get>) {
  return ['/orders', ...(args ? [args] : [])] as const
}

/**
 * POST /orders
 *
 * 注文作成
 *
 * カートの内容から注文を作成します
 */
export function usePostOrders(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /orders',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.orders.$post> }) =>
      parseResponse(client.orders.$post(arg, options?.client)),
  )
}

/**
 * GET /orders/{orderId}
 *
 * 注文詳細取得
 */
export function useGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOrdersOrderIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.orders[':orderId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /orders/{orderId}
 */
export function getGetOrdersOrderIdKey(
  args?: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['/orders/:orderId', ...(args ? [args] : [])] as const
}

/**
 * POST /orders/{orderId}/cancel
 *
 * 注文キャンセル
 */
export function usePostOrdersOrderIdCancel(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /orders/:orderId/cancel',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']> },
    ) => parseResponse(client.orders[':orderId'].cancel.$post(arg, options?.client)),
  )
}

/**
 * GET /inventory/{productId}
 *
 * 在庫情報取得
 */
export function useGetInventoryProductId(
  args: InferRequestType<(typeof client.inventory)[':productId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetInventoryProductIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.inventory[':productId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /inventory/{productId}
 */
export function getGetInventoryProductIdKey(
  args?: InferRequestType<(typeof client.inventory)[':productId']['$get']>,
) {
  return ['/inventory/:productId', ...(args ? [args] : [])] as const
}

/**
 * PUT /inventory/{productId}
 *
 * 在庫更新
 */
export function usePutInventoryProductId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /inventory/:productId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.inventory)[':productId']['$put']> },
    ) => parseResponse(client.inventory[':productId'].$put(arg, options?.client)),
  )
}

import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
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
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.products.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProductsKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.products.$get>, Error>(
    swrKey,
    async () => parseResponse(client.products.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
export function usePostProducts(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.products.$post>,
    Error,
    string,
    InferRequestType<typeof client.products.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.products.$post>,
    Error,
    string,
    InferRequestType<typeof client.products.$post>
  >(
    'POST /products',
    async (_, { arg }) => parseResponse(client.products.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.products)[':productId']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProductsProductIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.products)[':productId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.products[':productId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
export function usePutProductsProductId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.products)[':productId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.products)[':productId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  >(
    'PUT /products/:productId',
    async (_, { arg }) => parseResponse(client.products[':productId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /products/{productId}
 *
 * 商品削除
 */
export function useDeleteProductsProductId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.products)[':productId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.products)[':productId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.products)[':productId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.products)[':productId']['$delete']>
  >(
    'DELETE /products/:productId',
    async (_, { arg }) =>
      parseResponse(client.products[':productId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /products/{productId}/images
 *
 * 商品画像アップロード
 */
export function usePostProductsProductIdImages(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.products)[':productId']['images']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.products)[':productId']['images']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.products)[':productId']['images']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.products)[':productId']['images']['$post']>
  >(
    'POST /products/:productId/images',
    async (_, { arg }) =>
      parseResponse(client.products[':productId'].images.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export function useGetCategories(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.categories.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCategoriesKey() : null)
  const query = useSWR<InferResponseType<typeof client.categories.$get>, Error>(
    swrKey,
    async () => parseResponse(client.categories.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
export function usePostCategories(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.categories.$post>,
    Error,
    string,
    InferRequestType<typeof client.categories.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.categories.$post>,
    Error,
    string,
    InferRequestType<typeof client.categories.$post>
  >(
    'POST /categories',
    async (_, { arg }) => parseResponse(client.categories.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /cart
 *
 * カート取得
 */
export function useGetCart(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.cart.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCartKey() : null)
  const query = useSWR<InferResponseType<typeof client.cart.$get>, Error>(
    swrKey,
    async () => parseResponse(client.cart.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
export function useDeleteCart(options?: {
  swr?: SWRMutationConfiguration<InferResponseType<typeof client.cart.$delete>, Error, string, void>
  client?: ClientRequestOptions
}) {
  return useSWRMutation<InferResponseType<typeof client.cart.$delete>, Error, string, void>(
    'DELETE /cart',
    async () => parseResponse(client.cart.$delete(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * POST /cart/items
 *
 * カートに商品追加
 */
export function usePostCartItems(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.cart.items.$post>,
    Error,
    string,
    InferRequestType<typeof client.cart.items.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.cart.items.$post>,
    Error,
    string,
    InferRequestType<typeof client.cart.items.$post>
  >(
    'POST /cart/items',
    async (_, { arg }) => parseResponse(client.cart.items.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PUT /cart/items/{itemId}
 *
 * カートアイテム数量変更
 */
export function usePutCartItemsItemId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.cart.items)[':itemId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.cart.items)[':itemId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.cart.items)[':itemId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.cart.items)[':itemId']['$put']>
  >(
    'PUT /cart/items/:itemId',
    async (_, { arg }) => parseResponse(client.cart.items[':itemId'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /cart/items/{itemId}
 *
 * カートから商品削除
 */
export function useDeleteCartItemsItemId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.cart.items)[':itemId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.cart.items)[':itemId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>
  >(
    'DELETE /cart/items/:itemId',
    async (_, { arg }) => parseResponse(client.cart.items[':itemId'].$delete(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<InferResponseType<typeof client.orders.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOrdersKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.orders.$get>, Error>(
    swrKey,
    async () => parseResponse(client.orders.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
export function usePostOrders(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >(
    'POST /orders',
    async (_, { arg }) => parseResponse(client.orders.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.orders)[':orderId']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOrdersOrderIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.orders)[':orderId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.orders[':orderId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
export function usePostOrdersOrderIdCancel(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.orders)[':orderId']['cancel']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.orders)[':orderId']['cancel']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>
  >(
    'POST /orders/:orderId/cancel',
    async (_, { arg }) =>
      parseResponse(client.orders[':orderId'].cancel.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.inventory)[':productId']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetInventoryProductIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.inventory)[':productId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.inventory[':productId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
export function usePutInventoryProductId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.inventory)[':productId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.inventory)[':productId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.inventory)[':productId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.inventory)[':productId']['$put']>
  >(
    'PUT /inventory/:productId',
    async (_, { arg }) => parseResponse(client.inventory[':productId'].$put(arg, options?.client)),
    options?.swr,
  )
}

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
export function usePostProducts(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.products.$post>,
    Error,
    string,
    InferRequestType<typeof client.products.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /products',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.products.$post> }) =>
      parseResponse(client.products.$post(arg, clientOptions)),
    mutationOptions,
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
export function usePutProductsProductId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.products)[':productId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /products/:productId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.products)[':productId']['$put']> },
    ) => parseResponse(client.products[':productId'].$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /products/{productId}
 *
 * 商品削除
 */
export function useDeleteProductsProductId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.products)[':productId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.products)[':productId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /products/:productId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.products)[':productId']['$delete']> },
    ) => parseResponse(client.products[':productId'].$delete(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /products/{productId}/images
 *
 * 商品画像アップロード
 */
export function usePostProductsProductIdImages(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.products)[':productId']['images']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.products)[':productId']['images']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /products/:productId/images',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.products)[':productId']['images']['$post']> },
    ) => parseResponse(client.products[':productId'].images.$post(arg, clientOptions)),
    mutationOptions,
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
export function usePostCategories(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.categories.$post>,
    Error,
    string,
    InferRequestType<typeof client.categories.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /categories',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.categories.$post> }) =>
      parseResponse(client.categories.$post(arg, clientOptions)),
    mutationOptions,
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
export function useDeleteCart(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.cart.$delete> | undefined,
    Error,
    string,
    undefined
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /cart',
    async () => parseResponse(client.cart.$delete(undefined, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /cart/items
 *
 * カートに商品追加
 */
export function usePostCartItems(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.cart.items.$post>,
    Error,
    string,
    InferRequestType<typeof client.cart.items.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /cart/items',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.cart.items.$post> }) =>
      parseResponse(client.cart.items.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * PUT /cart/items/{itemId}
 *
 * カートアイテム数量変更
 */
export function usePutCartItemsItemId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.cart.items)[':itemId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.cart.items)[':itemId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /cart/items/:itemId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.cart.items)[':itemId']['$put']> },
    ) => parseResponse(client.cart.items[':itemId'].$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /cart/items/{itemId}
 *
 * カートから商品削除
 */
export function useDeleteCartItemsItemId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.cart.items)[':itemId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /cart/items/:itemId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.cart.items)[':itemId']['$delete']> },
    ) => parseResponse(client.cart.items[':itemId'].$delete(arg, clientOptions)),
    mutationOptions,
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
export function usePostOrders(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /orders',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.orders.$post> }) =>
      parseResponse(client.orders.$post(arg, clientOptions)),
    mutationOptions,
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
export function usePostOrdersOrderIdCancel(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.orders)[':orderId']['cancel']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /orders/:orderId/cancel',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']> },
    ) => parseResponse(client.orders[':orderId'].cancel.$post(arg, clientOptions)),
    mutationOptions,
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
export function usePutInventoryProductId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.inventory)[':productId']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.inventory)[':productId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /inventory/:productId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.inventory)[':productId']['$put']> },
    ) => parseResponse(client.inventory[':productId'].$put(arg, clientOptions)),
    mutationOptions,
  )
}

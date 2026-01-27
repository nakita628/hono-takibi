import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
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
 * Uses $url() for type-safe key generation
 */
export function getGetProductsKey(args: InferRequestType<typeof client.products.$get>) {
  return client.products.$url(args).pathname
}

/**
 * POST /products
 *
 * 商品作成
 */
export function usePostProducts(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.products.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.products.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostProductsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.products.$post> }) =>
        parseResponse(client.products.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /products
 * Uses $url() for type-safe key generation
 */
export function getPostProductsMutationKey() {
  return `POST ${client.products.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetProductsProductIdKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return client.products[':productId'].$url(args).pathname
}

/**
 * PUT /products/{productId}
 *
 * 商品更新
 */
export function usePutProductsProductId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.products)[':productId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutProductsProductIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.products)[':productId']['$put']> },
      ) => parseResponse(client.products[':productId'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /products/{productId}
 * Uses $url() for type-safe key generation
 */
export function getPutProductsProductIdMutationKey() {
  return `PUT ${client.products[':productId'].$url().pathname}`
}

/**
 * DELETE /products/{productId}
 *
 * 商品削除
 */
export function useDeleteProductsProductId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.products)[':productId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.products)[':productId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteProductsProductIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.products)[':productId']['$delete']> },
      ) => parseResponse(client.products[':productId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /products/{productId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteProductsProductIdMutationKey() {
  return `DELETE ${client.products[':productId'].$url().pathname}`
}

/**
 * POST /products/{productId}/images
 *
 * 商品画像アップロード
 */
export function usePostProductsProductIdImages(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.products)[':productId']['images']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.products)[':productId']['images']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostProductsProductIdImagesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.products)[':productId']['images']['$post']> },
      ) => parseResponse(client.products[':productId'].images.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /products/{productId}/images
 * Uses $url() for type-safe key generation
 */
export function getPostProductsProductIdImagesMutationKey() {
  return `POST ${client.products[':productId'].images.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetCategoriesKey() {
  return client.categories.$url().pathname
}

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export function usePostCategories(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.categories.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.categories.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostCategoriesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.categories.$post> }) =>
        parseResponse(client.categories.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /categories
 * Uses $url() for type-safe key generation
 */
export function getPostCategoriesMutationKey() {
  return `POST ${client.categories.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetCartKey() {
  return client.cart.$url().pathname
}

/**
 * DELETE /cart
 *
 * カートをクリア
 */
export function useDeleteCart(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.cart.$delete>>>>>
    | undefined,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteCartMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.cart.$delete(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /cart
 * Uses $url() for type-safe key generation
 */
export function getDeleteCartMutationKey() {
  return `DELETE ${client.cart.$url().pathname}`
}

/**
 * POST /cart/items
 *
 * カートに商品追加
 */
export function usePostCartItems(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.cart.items.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.cart.items.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostCartItemsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.cart.items.$post> }) =>
        parseResponse(client.cart.items.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /cart/items
 * Uses $url() for type-safe key generation
 */
export function getPostCartItemsMutationKey() {
  return `POST ${client.cart.items.$url().pathname}`
}

/**
 * PUT /cart/items/{itemId}
 *
 * カートアイテム数量変更
 */
export function usePutCartItemsItemId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.cart.items)[':itemId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.cart.items)[':itemId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutCartItemsItemIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.cart.items)[':itemId']['$put']> },
      ) => parseResponse(client.cart.items[':itemId'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /cart/items/{itemId}
 * Uses $url() for type-safe key generation
 */
export function getPutCartItemsItemIdMutationKey() {
  return `PUT ${client.cart.items[':itemId'].$url().pathname}`
}

/**
 * DELETE /cart/items/{itemId}
 *
 * カートから商品削除
 */
export function useDeleteCartItemsItemId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.cart.items)[':itemId']['$delete']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteCartItemsItemIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.cart.items)[':itemId']['$delete']> },
      ) => parseResponse(client.cart.items[':itemId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /cart/items/{itemId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteCartItemsItemIdMutationKey() {
  return `DELETE ${client.cart.items[':itemId'].$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetOrdersKey(args: InferRequestType<typeof client.orders.$get>) {
  return client.orders.$url(args).pathname
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
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.orders.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.orders.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostOrdersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.orders.$post> }) =>
        parseResponse(client.orders.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /orders
 * Uses $url() for type-safe key generation
 */
export function getPostOrdersMutationKey() {
  return `POST ${client.orders.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetOrdersOrderIdKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return client.orders[':orderId'].$url(args).pathname
}

/**
 * POST /orders/{orderId}/cancel
 *
 * 注文キャンセル
 */
export function usePostOrdersOrderIdCancel(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.orders)[':orderId']['cancel']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostOrdersOrderIdCancelMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']> },
      ) => parseResponse(client.orders[':orderId'].cancel.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /orders/{orderId}/cancel
 * Uses $url() for type-safe key generation
 */
export function getPostOrdersOrderIdCancelMutationKey() {
  return `POST ${client.orders[':orderId'].cancel.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetInventoryProductIdKey(
  args: InferRequestType<(typeof client.inventory)[':productId']['$get']>,
) {
  return client.inventory[':productId'].$url(args).pathname
}

/**
 * PUT /inventory/{productId}
 *
 * 在庫更新
 */
export function usePutInventoryProductId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.inventory)[':productId']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.inventory)[':productId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutInventoryProductIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.inventory)[':productId']['$put']> },
      ) => parseResponse(client.inventory[':productId'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /inventory/{productId}
 * Uses $url() for type-safe key generation
 */
export function getPutInventoryProductIdMutationKey() {
  return `PUT ${client.inventory[':productId'].$url().pathname}`
}

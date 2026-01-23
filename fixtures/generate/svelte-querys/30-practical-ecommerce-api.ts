import type { CreateMutationOptions, CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/30-practical-ecommerce-api'

/**
 * GET /products
 *
 * 商品一覧取得
 */
export function createGetProducts(
  args: InferRequestType<typeof client.products.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.products.$get>,
      Error,
      InferResponseType<typeof client.products.$get>,
      readonly ['/products', InferRequestType<typeof client.products.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProductsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.products.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /products
 */
export function getGetProductsQueryKey(args: InferRequestType<typeof client.products.$get>) {
  return ['/products', args] as const
}

/**
 * POST /products
 *
 * 商品作成
 */
export function createPostProducts(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.products.$post> | undefined,
      Error,
      InferRequestType<typeof client.products.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.products.$post> | undefined,
    Error,
    InferRequestType<typeof client.products.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.products.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /products/{productId}
 *
 * 商品詳細取得
 */
export function createGetProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.products)[':productId']['$get']>,
      Error,
      InferResponseType<(typeof client.products)[':productId']['$get']>,
      readonly [
        '/products/:productId',
        InferRequestType<(typeof client.products)[':productId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProductsProductIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.products[':productId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /products/{productId}
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
export function createPutProductsProductId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.products)[':productId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.products)[':productId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.products)[':productId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.products[':productId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /products/{productId}
 *
 * 商品削除
 */
export function createDeleteProductsProductId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.products)[':productId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.products)[':productId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.products)[':productId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.products)[':productId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.products[':productId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /products/{productId}/images
 *
 * 商品画像アップロード
 */
export function createPostProductsProductIdImages(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.products)[':productId']['images']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.products)[':productId']['images']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.products)[':productId']['images']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.products)[':productId']['images']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.products[':productId'].images.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export function createGetCategories(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.categories.$get>,
      Error,
      InferResponseType<typeof client.categories.$get>,
      readonly ['/categories']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCategoriesQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.categories.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /categories
 */
export function getGetCategoriesQueryKey() {
  return ['/categories'] as const
}

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export function createPostCategories(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.categories.$post> | undefined,
      Error,
      InferRequestType<typeof client.categories.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.categories.$post> | undefined,
    Error,
    InferRequestType<typeof client.categories.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.categories.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /cart
 *
 * カート取得
 */
export function createGetCart(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.cart.$get>,
      Error,
      InferResponseType<typeof client.cart.$get>,
      readonly ['/cart']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCartQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.cart.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /cart
 */
export function getGetCartQueryKey() {
  return ['/cart'] as const
}

/**
 * DELETE /cart
 *
 * カートをクリア
 */
export function createDeleteCart(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.cart.$delete> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<InferResponseType<typeof client.cart.$delete> | undefined, Error, void>(
    {
      ...options?.mutation,
      mutationFn: async () => parseResponse(client.cart.$delete(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /cart/items
 *
 * カートに商品追加
 */
export function createPostCartItems(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.cart.items.$post> | undefined,
      Error,
      InferRequestType<typeof client.cart.items.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.cart.items.$post> | undefined,
    Error,
    InferRequestType<typeof client.cart.items.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.cart.items.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /cart/items/{itemId}
 *
 * カートアイテム数量変更
 */
export function createPutCartItemsItemId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.cart.items)[':itemId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.cart.items)[':itemId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.cart.items)[':itemId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.cart.items)[':itemId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.cart.items[':itemId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /cart/items/{itemId}
 *
 * カートから商品削除
 */
export function createDeleteCartItemsItemId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.cart.items)[':itemId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.cart.items)[':itemId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.cart.items[':itemId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /orders
 *
 * 注文一覧取得
 */
export function createGetOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.orders.$get>,
      Error,
      InferResponseType<typeof client.orders.$get>,
      readonly ['/orders', InferRequestType<typeof client.orders.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOrdersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.orders.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /orders
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
export function createPostOrders(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.orders.$post> | undefined,
      Error,
      InferRequestType<typeof client.orders.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.orders.$post> | undefined,
    Error,
    InferRequestType<typeof client.orders.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.orders.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /orders/{orderId}
 *
 * 注文詳細取得
 */
export function createGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.orders)[':orderId']['$get']>,
      Error,
      InferResponseType<(typeof client.orders)[':orderId']['$get']>,
      readonly ['/orders/:orderId', InferRequestType<(typeof client.orders)[':orderId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOrdersOrderIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.orders[':orderId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /orders/{orderId}
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
export function createPostOrdersOrderIdCancel(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.orders)[':orderId']['cancel']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.orders)[':orderId']['cancel']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.orders[':orderId'].cancel.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /inventory/{productId}
 *
 * 在庫情報取得
 */
export function createGetInventoryProductId(
  args: InferRequestType<(typeof client.inventory)[':productId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.inventory)[':productId']['$get']>,
      Error,
      InferResponseType<(typeof client.inventory)[':productId']['$get']>,
      readonly [
        '/inventory/:productId',
        InferRequestType<(typeof client.inventory)[':productId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetInventoryProductIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.inventory[':productId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /inventory/{productId}
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
export function createPutInventoryProductId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.inventory)[':productId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.inventory)[':productId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.inventory)[':productId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.inventory)[':productId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.inventory[':productId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

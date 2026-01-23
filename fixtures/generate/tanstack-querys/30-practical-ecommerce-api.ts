import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.products.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProductsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.products.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /products
 */
export function getGetProductsQueryKey(args: InferRequestType<typeof client.products.$get>) {
  return ['GET', '/products', args] as const
}

/**
 * POST /products
 *
 * 商品作成
 */
export function usePostProducts(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.products.$post> | undefined,
      Error,
      InferRequestType<typeof client.products.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function useGetProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.products)[':productId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProductsProductIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.products[':productId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /products/{productId}
 */
export function getGetProductsProductIdQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return ['GET', '/products/:productId', args] as const
}

/**
 * PUT /products/{productId}
 *
 * 商品更新
 */
export function usePutProductsProductId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.products)[':productId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.products)[':productId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function useDeleteProductsProductId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.products)[':productId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.products)[':productId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function usePostProductsProductIdImages(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.products)[':productId']['images']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.products)[':productId']['images']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function useGetCategories(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.categories.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCategoriesQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.categories.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /categories
 */
export function getGetCategoriesQueryKey() {
  return ['GET', '/categories'] as const
}

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export function usePostCategories(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.categories.$post> | undefined,
      Error,
      InferRequestType<typeof client.categories.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function useGetCart(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.cart.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCartQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.cart.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /cart
 */
export function getGetCartQueryKey() {
  return ['GET', '/cart'] as const
}

/**
 * DELETE /cart
 *
 * カートをクリア
 */
export function useDeleteCart(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.cart.$delete> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<InferResponseType<typeof client.cart.$delete> | undefined, Error, void>(
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
export function usePostCartItems(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.cart.items.$post> | undefined,
      Error,
      InferRequestType<typeof client.cart.items.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function usePutCartItemsItemId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.cart.items)[':itemId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.cart.items)[':itemId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function useDeleteCartItemsItemId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.cart.items)[':itemId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function useGetOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.orders.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOrdersQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.orders.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /orders
 */
export function getGetOrdersQueryKey(args: InferRequestType<typeof client.orders.$get>) {
  return ['GET', '/orders', args] as const
}

/**
 * POST /orders
 *
 * 注文作成
 *
 * カートの内容から注文を作成します
 */
export function usePostOrders(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.orders.$post> | undefined,
      Error,
      InferRequestType<typeof client.orders.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function useGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.orders)[':orderId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOrdersOrderIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.orders[':orderId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /orders/{orderId}
 */
export function getGetOrdersOrderIdQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['GET', '/orders/:orderId', args] as const
}

/**
 * POST /orders/{orderId}/cancel
 *
 * 注文キャンセル
 */
export function usePostOrdersOrderIdCancel(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.orders)[':orderId']['cancel']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function useGetInventoryProductId(
  args: InferRequestType<(typeof client.inventory)[':productId']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.inventory)[':productId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetInventoryProductIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.inventory[':productId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /inventory/{productId}
 */
export function getGetInventoryProductIdQueryKey(
  args: InferRequestType<(typeof client.inventory)[':productId']['$get']>,
) {
  return ['GET', '/inventory/:productId', args] as const
}

/**
 * PUT /inventory/{productId}
 *
 * 在庫更新
 */
export function usePutInventoryProductId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.inventory)[':productId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.inventory)[':productId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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

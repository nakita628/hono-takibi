import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/30-practical-ecommerce-api'

/**
 * Generates Vue Query cache key for GET /products
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetProductsQueryKey(
  args: MaybeRef<InferRequestType<typeof client.products.$get>>,
) {
  return ['products', '/products', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /products
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProductsQueryOptions = (
  args: InferRequestType<typeof client.products.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetProductsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.products.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /products
 *
 * 商品一覧取得
 */
export function useGetProducts(
  args: InferRequestType<typeof client.products.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.products.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetProductsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /products
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostProductsMutationKey() {
  return ['POST', '/products'] as const
}

/**
 * Returns Vue Query mutation options for POST /products
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostProductsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostProductsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.products.$post>) =>
    parseResponse(client.products.$post(args, clientOptions)),
})

/**
 * POST /products
 *
 * 商品作成
 */
export function usePostProducts(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.products.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.products.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.products.$post>) =>
      parseResponse(client.products.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /products/{productId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetProductsProductIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.products)[':productId']['$get']>>,
) {
  return ['products', '/products/:productId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /products/{productId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProductsProductIdQueryOptions = (
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetProductsProductIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.products[':productId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /products/{productId}
 *
 * 商品詳細取得
 */
export function useGetProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.products)[':productId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetProductsProductIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /products/{productId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPutProductsProductIdMutationKey() {
  return ['PUT', '/products/:productId'] as const
}

/**
 * Returns Vue Query mutation options for PUT /products/{productId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutProductsProductIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutProductsProductIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.products)[':productId']['$put']>) =>
    parseResponse(client.products[':productId'].$put(args, clientOptions)),
})

/**
 * PUT /products/{productId}
 *
 * 商品更新
 */
export function usePutProductsProductId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.products)[':productId']['$put']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.products)[':productId']['$put']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.products)[':productId']['$put']>) =>
      parseResponse(client.products[':productId'].$put(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /products/{productId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteProductsProductIdMutationKey() {
  return ['DELETE', '/products/:productId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /products/{productId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteProductsProductIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteProductsProductIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.products)[':productId']['$delete']>) =>
    parseResponse(client.products[':productId'].$delete(args, clientOptions)),
})

/**
 * DELETE /products/{productId}
 *
 * 商品削除
 */
export function useDeleteProductsProductId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.products)[':productId']['$delete']>>
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.products)[':productId']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.products)[':productId']['$delete']>) =>
      parseResponse(client.products[':productId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for POST /products/{productId}/images
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostProductsProductIdImagesMutationKey() {
  return ['POST', '/products/:productId/images'] as const
}

/**
 * Returns Vue Query mutation options for POST /products/{productId}/images
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostProductsProductIdImagesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostProductsProductIdImagesMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.products)[':productId']['images']['$post']>,
  ) => parseResponse(client.products[':productId'].images.$post(args, clientOptions)),
})

/**
 * POST /products/{productId}/images
 *
 * 商品画像アップロード
 */
export function usePostProductsProductIdImages(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.products)[':productId']['images']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.products)[':productId']['images']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.products)[':productId']['images']['$post']>,
    ) => parseResponse(client.products[':productId'].images.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /categories
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetCategoriesQueryKey() {
  return ['categories', '/categories'] as const
}

/**
 * Returns Vue Query query options for GET /categories
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCategoriesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCategoriesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.categories.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /categories
 *
 * カテゴリ一覧取得
 */
export function useGetCategories(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.categories.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetCategoriesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /categories
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostCategoriesMutationKey() {
  return ['POST', '/categories'] as const
}

/**
 * Returns Vue Query mutation options for POST /categories
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostCategoriesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostCategoriesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.categories.$post>) =>
    parseResponse(client.categories.$post(args, clientOptions)),
})

/**
 * POST /categories
 *
 * カテゴリ作成
 */
export function usePostCategories(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.categories.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.categories.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.categories.$post>) =>
      parseResponse(client.categories.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /cart
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetCartQueryKey() {
  return ['cart', '/cart'] as const
}

/**
 * Returns Vue Query query options for GET /cart
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCartQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCartQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.cart.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /cart
 *
 * カート取得
 */
export function useGetCart(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.cart.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetCartQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /cart
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteCartMutationKey() {
  return ['DELETE', '/cart'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /cart
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteCartMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteCartMutationKey(),
  mutationFn: async () => parseResponse(client.cart.$delete(undefined, clientOptions)),
})

/**
 * DELETE /cart
 *
 * カートをクリア
 */
export function useDeleteCart(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.cart.$delete>>>>>
        | undefined,
        Error,
        void
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client.cart.$delete(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for POST /cart/items
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostCartItemsMutationKey() {
  return ['POST', '/cart/items'] as const
}

/**
 * Returns Vue Query mutation options for POST /cart/items
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostCartItemsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostCartItemsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.cart.items.$post>) =>
    parseResponse(client.cart.items.$post(args, clientOptions)),
})

/**
 * POST /cart/items
 *
 * カートに商品追加
 */
export function usePostCartItems(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.cart.items.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.cart.items.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.cart.items.$post>) =>
      parseResponse(client.cart.items.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for PUT /cart/items/{itemId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPutCartItemsItemIdMutationKey() {
  return ['PUT', '/cart/items/:itemId'] as const
}

/**
 * Returns Vue Query mutation options for PUT /cart/items/{itemId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutCartItemsItemIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutCartItemsItemIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.cart.items)[':itemId']['$put']>) =>
    parseResponse(client.cart.items[':itemId'].$put(args, clientOptions)),
})

/**
 * PUT /cart/items/{itemId}
 *
 * カートアイテム数量変更
 */
export function usePutCartItemsItemId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.cart.items)[':itemId']['$put']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.cart.items)[':itemId']['$put']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.cart.items)[':itemId']['$put']>) =>
      parseResponse(client.cart.items[':itemId'].$put(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /cart/items/{itemId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteCartItemsItemIdMutationKey() {
  return ['DELETE', '/cart/items/:itemId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /cart/items/{itemId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteCartItemsItemIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteCartItemsItemIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>) =>
    parseResponse(client.cart.items[':itemId'].$delete(args, clientOptions)),
})

/**
 * DELETE /cart/items/{itemId}
 *
 * カートから商品削除
 */
export function useDeleteCartItemsItemId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.cart.items)[':itemId']['$delete']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>) =>
      parseResponse(client.cart.items[':itemId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /orders
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetOrdersQueryKey(args: MaybeRef<InferRequestType<typeof client.orders.$get>>) {
  return ['orders', '/orders', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /orders
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOrdersQueryOptions = (
  args: InferRequestType<typeof client.orders.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetOrdersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.orders.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /orders
 *
 * 注文一覧取得
 */
export function useGetOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.orders.$get>>>>>,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOrdersQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /orders
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostOrdersMutationKey() {
  return ['POST', '/orders'] as const
}

/**
 * Returns Vue Query mutation options for POST /orders
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostOrdersMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostOrdersMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.orders.$post>) =>
    parseResponse(client.orders.$post(args, clientOptions)),
})

/**
 * POST /orders
 *
 * 注文作成
 *
 * カートの内容から注文を作成します
 */
export function usePostOrders(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.orders.$post>>>>>,
        Error,
        InferRequestType<typeof client.orders.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.orders.$post>) =>
      parseResponse(client.orders.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /orders/{orderId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetOrdersOrderIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.orders)[':orderId']['$get']>>,
) {
  return ['orders', '/orders/:orderId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /orders/{orderId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOrdersOrderIdQueryOptions = (
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetOrdersOrderIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.orders[':orderId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /orders/{orderId}
 *
 * 注文詳細取得
 */
export function useGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.orders)[':orderId']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOrdersOrderIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /orders/{orderId}/cancel
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostOrdersOrderIdCancelMutationKey() {
  return ['POST', '/orders/:orderId/cancel'] as const
}

/**
 * Returns Vue Query mutation options for POST /orders/{orderId}/cancel
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostOrdersOrderIdCancelMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostOrdersOrderIdCancelMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>,
  ) => parseResponse(client.orders[':orderId'].cancel.$post(args, clientOptions)),
})

/**
 * POST /orders/{orderId}/cancel
 *
 * 注文キャンセル
 */
export function usePostOrdersOrderIdCancel(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.orders)[':orderId']['cancel']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>,
    ) => parseResponse(client.orders[':orderId'].cancel.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /inventory/{productId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetInventoryProductIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.inventory)[':productId']['$get']>>,
) {
  return ['inventory', '/inventory/:productId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /inventory/{productId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetInventoryProductIdQueryOptions = (
  args: InferRequestType<(typeof client.inventory)[':productId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetInventoryProductIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.inventory[':productId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /inventory/{productId}
 *
 * 在庫情報取得
 */
export function useGetInventoryProductId(
  args: InferRequestType<(typeof client.inventory)[':productId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.inventory)[':productId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetInventoryProductIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /inventory/{productId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPutInventoryProductIdMutationKey() {
  return ['PUT', '/inventory/:productId'] as const
}

/**
 * Returns Vue Query mutation options for PUT /inventory/{productId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutInventoryProductIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutInventoryProductIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.inventory)[':productId']['$put']>) =>
    parseResponse(client.inventory[':productId'].$put(args, clientOptions)),
})

/**
 * PUT /inventory/{productId}
 *
 * 在庫更新
 */
export function usePutInventoryProductId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.inventory)[':productId']['$put']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.inventory)[':productId']['$put']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.inventory)[':productId']['$put']>) =>
      parseResponse(client.inventory[':productId'].$put(args, clientOptions)),
  })
}

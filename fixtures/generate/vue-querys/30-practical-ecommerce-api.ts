import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/vue-query'
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
  return useQuery({ ...getGetProductsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /products
 * Uses $url() for type-safe key generation
 */
export function getGetProductsQueryKey(args: InferRequestType<typeof client.products.$get>) {
  return [client.products.$url(args).pathname] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.products.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
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
  return useQuery({ ...getGetProductsProductIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /products/{productId}
 * Uses $url() for type-safe key generation
 */
export function getGetProductsProductIdQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return [client.products[':productId'].$url(args).pathname] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.products[':productId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
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
  return useQuery({ ...getGetCategoriesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /categories
 * Uses $url() for type-safe key generation
 */
export function getGetCategoriesQueryKey() {
  return [client.categories.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /categories
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCategoriesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCategoriesQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.categories.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
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
  return useQuery({ ...getGetCartQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /cart
 * Uses $url() for type-safe key generation
 */
export function getGetCartQueryKey() {
  return [client.cart.$url().pathname] as const
}

/**
 * Returns Vue Query query options for GET /cart
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCartQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCartQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.cart.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
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
  return useQuery({ ...getGetOrdersQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /orders
 * Uses $url() for type-safe key generation
 */
export function getGetOrdersQueryKey(args: InferRequestType<typeof client.orders.$get>) {
  return [client.orders.$url(args).pathname] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.orders.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
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
  return useQuery({ ...getGetOrdersOrderIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /orders/{orderId}
 * Uses $url() for type-safe key generation
 */
export function getGetOrdersOrderIdQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return [client.orders[':orderId'].$url(args).pathname] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.orders[':orderId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
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
  return useQuery({ ...getGetInventoryProductIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /inventory/{productId}
 * Uses $url() for type-safe key generation
 */
export function getGetInventoryProductIdQueryKey(
  args: InferRequestType<(typeof client.inventory)[':productId']['$get']>,
) {
  return [client.inventory[':productId'].$url(args).pathname] as const
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
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.inventory[':productId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
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

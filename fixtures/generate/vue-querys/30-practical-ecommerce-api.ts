import { useQuery, useMutation, queryOptions } from '@tanstack/vue-query'
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetProductsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /products
 */
export function getGetProductsQueryKey(args: InferRequestType<typeof client.products.$get>) {
  return ['/products', args] as const
}

/**
 * Returns Vue Query query options for GET /products
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProductsQueryOptions = (
  args: InferRequestType<typeof client.products.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetProductsQueryKey(args),
    queryFn: ({ signal }) =>
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.products.$post>,
      variables: InferRequestType<typeof client.products.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.products.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.products.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.products.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.products.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetProductsProductIdQueryOptions(args, clientOptions), ...queryOptions })
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
 * Returns Vue Query query options for GET /products/{productId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProductsProductIdQueryOptions = (
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetProductsProductIdQueryKey(args),
    queryFn: ({ signal }) =>
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.products)[':productId']['$put']>,
      variables: InferRequestType<(typeof client.products)[':productId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.products)[':productId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.products)[':productId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.products)[':productId']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.products)[':productId']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.products)[':productId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.products)[':productId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.products)[':productId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.products)[':productId']['$delete']>
        | undefined
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.products)[':productId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.products)[':productId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.products)[':productId']['images']['$post']>,
      variables: InferRequestType<(typeof client.products)[':productId']['images']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.products)[':productId']['images']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.products)[':productId']['images']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.products)[':productId']['images']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.products)[':productId']['images']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetCategoriesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /categories
 */
export function getGetCategoriesQueryKey() {
  return ['/categories'] as const
}

/**
 * Returns Vue Query query options for GET /categories
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCategoriesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetCategoriesQueryKey(),
    queryFn: ({ signal }) =>
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.categories.$post>,
      variables: InferRequestType<typeof client.categories.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.categories.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.categories.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.categories.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.categories.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetCartQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /cart
 */
export function getGetCartQueryKey() {
  return ['/cart'] as const
}

/**
 * Returns Vue Query query options for GET /cart
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCartQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetCartQueryKey(),
    queryFn: ({ signal }) =>
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.cart.$delete> | undefined,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<typeof client.cart.$delete> | undefined | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.cart.items.$post>,
      variables: InferRequestType<typeof client.cart.items.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.cart.items.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.cart.items.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.cart.items.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.cart.items.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.cart.items)[':itemId']['$put']>,
      variables: InferRequestType<(typeof client.cart.items)[':itemId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.cart.items)[':itemId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.cart.items)[':itemId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.cart.items)[':itemId']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.cart.items)[':itemId']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.cart.items)[':itemId']['$delete']>,
      variables: InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.cart.items)[':itemId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.cart.items)[':itemId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetOrdersQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /orders
 */
export function getGetOrdersQueryKey(args: InferRequestType<typeof client.orders.$get>) {
  return ['/orders', args] as const
}

/**
 * Returns Vue Query query options for GET /orders
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOrdersQueryOptions = (
  args: InferRequestType<typeof client.orders.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetOrdersQueryKey(args),
    queryFn: ({ signal }) =>
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.orders.$post>,
      variables: InferRequestType<typeof client.orders.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.orders.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.orders.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.orders.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.orders.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetOrdersOrderIdQueryOptions(args, clientOptions), ...queryOptions })
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
 * Returns Vue Query query options for GET /orders/{orderId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOrdersOrderIdQueryOptions = (
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetOrdersOrderIdQueryKey(args),
    queryFn: ({ signal }) =>
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.orders)[':orderId']['cancel']['$post']>,
      variables: InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.orders)[':orderId']['cancel']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.orders)[':orderId']['cancel']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetInventoryProductIdQueryOptions(args, clientOptions), ...queryOptions })
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
 * Returns Vue Query query options for GET /inventory/{productId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetInventoryProductIdQueryOptions = (
  args: InferRequestType<(typeof client.inventory)[':productId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetInventoryProductIdQueryKey(args),
    queryFn: ({ signal }) =>
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.inventory)[':productId']['$put']>,
      variables: InferRequestType<(typeof client.inventory)[':productId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.inventory)[':productId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.inventory)[':productId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.inventory)[':productId']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.inventory)[':productId']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.inventory)[':productId']['$put']>) =>
      parseResponse(client.inventory[':productId'].$put(args, clientOptions)),
  })
}

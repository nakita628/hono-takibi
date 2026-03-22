import { useQuery, useInfiniteQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Key prefix for /categories
 */
export function getCategoriesKey() {
  return ['categories'] as const
}

/**
 * Key prefix for /orders
 */
export function getOrdersKey() {
  return ['orders'] as const
}

/**
 * Key prefix for /products
 */
export function getProductsKey() {
  return ['products'] as const
}

/**
 * Key prefix for /upload
 */
export function getUploadKey() {
  return ['upload'] as const
}

/**
 * Key prefix for /users
 */
export function getUsersKey() {
  return ['users'] as const
}

/**
 * GET /users query key
 */
export function getUsersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args] as const
}

/**
 * GET /users
 */
export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

/**
 * GET /users query options
 */
export function getUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /users
 */
export function useUsers(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getUsersQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * GET /users infinite query key
 */
export function getUsersInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args, 'infinite'] as const
}

/**
 * GET /users infinite query options
 */
export function getUsersInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users
 */
export function useInfiniteUsers(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getUsersInfiniteQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * POST /users
 */
export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

/**
 * POST /users
 */
export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
    },
  }
}

/**
 * POST /users
 */
export function usePostUsers(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    Error,
    InferRequestType<typeof client.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostUsersMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * GET /users/{userId} query key
 */
export function getUsersUserIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':userId']['$get']>>,
) {
  return ['users', '/users/:userId', args] as const
}

/**
 * GET /users/{userId}
 */
export async function getUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$get(args, options))
}

/**
 * GET /users/{userId} query options
 */
export function getUsersUserIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':userId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersUserIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersUserId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /users/{userId}
 */
export function useUsersUserId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':userId']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getUsersUserIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * GET /users/{userId} infinite query key
 */
export function getUsersUserIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':userId']['$get']>>,
) {
  return ['users', '/users/:userId', args, 'infinite'] as const
}

/**
 * GET /users/{userId} infinite query options
 */
export function getUsersUserIdInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':userId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersUserIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersUserId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users/{userId}
 */
export function useInfiniteUsersUserId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':userId']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getUsersUserIdInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * PUT /users/{userId}
 */
export async function putUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$put(args, options))
}

/**
 * PUT /users/{userId}
 */
export function getPutUsersUserIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:userId'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':userId']['$put']>) {
      return putUsersUserId(args, options)
    },
  }
}

/**
 * PUT /users/{userId}
 */
export function usePutUsersUserId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putUsersUserId>>,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPutUsersUserIdMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * DELETE /users/{userId}
 */
export async function deleteUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$delete(args, options))
}

/**
 * DELETE /users/{userId}
 */
export function getDeleteUsersUserIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:userId'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':userId']['$delete']>) {
      return deleteUsersUserId(args, options)
    },
  }
}

/**
 * DELETE /users/{userId}
 */
export function useDeleteUsersUserId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteUsersUserId>> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getDeleteUsersUserIdMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * GET /products query key
 */
export function getProductsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.products.$get>>,
) {
  return ['products', '/products', args] as const
}

/**
 * GET /products
 */
export async function getProducts(
  args: InferRequestType<typeof client.products.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products.$get(args, options))
}

/**
 * GET /products query options
 */
export function getProductsQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.products.$get>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getProductsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProducts(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /products
 */
export function useProducts(
  args: MaybeRefOrGetter<InferRequestType<typeof client.products.$get>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProducts>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getProductsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * GET /products infinite query key
 */
export function getProductsInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.products.$get>>,
) {
  return ['products', '/products', args, 'infinite'] as const
}

/**
 * GET /products infinite query options
 */
export function getProductsInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.products.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getProductsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProducts(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /products
 */
export function useInfiniteProducts(
  args: MaybeRefOrGetter<InferRequestType<typeof client.products.$get>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProducts>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getProductsInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * POST /products
 */
export async function postProducts(
  args: InferRequestType<typeof client.products.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products.$post(args, options))
}

/**
 * POST /products
 */
export function getPostProductsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['products', '/products'] as const,
    async mutationFn(args: InferRequestType<typeof client.products.$post>) {
      return postProducts(args, options)
    },
  }
}

/**
 * POST /products
 */
export function usePostProducts(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postProducts>>,
    Error,
    InferRequestType<typeof client.products.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostProductsMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * GET /products/{productId} query key
 */
export function getProductsProductIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.products)[':productId']['$get']>>,
) {
  return ['products', '/products/:productId', args] as const
}

/**
 * GET /products/{productId}
 */
export async function getProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products[':productId'].$get(args, options))
}

/**
 * GET /products/{productId} query options
 */
export function getProductsProductIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.products)[':productId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getProductsProductIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /products/{productId}
 */
export function useProductsProductId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.products)[':productId']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductsProductId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getProductsProductIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * GET /products/{productId} infinite query key
 */
export function getProductsProductIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.products)[':productId']['$get']>>,
) {
  return ['products', '/products/:productId', args, 'infinite'] as const
}

/**
 * GET /products/{productId} infinite query options
 */
export function getProductsProductIdInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.products)[':productId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getProductsProductIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /products/{productId}
 */
export function useInfiniteProductsProductId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.products)[':productId']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProductsProductId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getProductsProductIdInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * PUT /products/{productId}
 */
export async function putProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products[':productId'].$put(args, options))
}

/**
 * PUT /products/{productId}
 */
export function getPutProductsProductIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['products', '/products/:productId'] as const,
    async mutationFn(args: InferRequestType<(typeof client.products)[':productId']['$put']>) {
      return putProductsProductId(args, options)
    },
  }
}

/**
 * PUT /products/{productId}
 */
export function usePutProductsProductId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putProductsProductId>>,
    Error,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...getPutProductsProductIdMutationOptions(clientOptions),
    ...mutationOptions,
  })
}

/**
 * GET /products/{productId}/reviews query key
 */
export function getProductsProductIdReviewsQueryKey(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>
  >,
) {
  return ['products', '/products/:productId/reviews', args] as const
}

/**
 * GET /products/{productId}/reviews
 */
export async function getProductsProductIdReviews(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products[':productId'].reviews.$get(args, options))
}

/**
 * GET /products/{productId}/reviews query options
 */
export function getProductsProductIdReviewsQueryOptions(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>
  >,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductIdReviews(toValue(args), {
        ...options,
        init: { ...options?.init, signal },
      })
    },
  })
}

/**
 * GET /products/{productId}/reviews
 */
export function useProductsProductIdReviews(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>
  >,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductsProductIdReviews>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...getProductsProductIdReviewsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * GET /products/{productId}/reviews infinite query key
 */
export function getProductsProductIdReviewsInfiniteQueryKey(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>
  >,
) {
  return ['products', '/products/:productId/reviews', args, 'infinite'] as const
}

/**
 * GET /products/{productId}/reviews infinite query options
 */
export function getProductsProductIdReviewsInfiniteQueryOptions(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>
  >,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getProductsProductIdReviewsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductIdReviews(toValue(args), {
        ...options,
        init: { ...options?.init, signal },
      })
    },
  }
}

/**
 * GET /products/{productId}/reviews
 */
export function useInfiniteProductsProductIdReviews(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>
  >,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProductsProductIdReviews>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getProductsProductIdReviewsInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * POST /products/{productId}/reviews
 */
export async function postProductsProductIdReviews(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products[':productId'].reviews.$post(args, options))
}

/**
 * POST /products/{productId}/reviews
 */
export function getPostProductsProductIdReviewsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['products', '/products/:productId/reviews'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.products)[':productId']['reviews']['$post']>,
    ) {
      return postProductsProductIdReviews(args, options)
    },
  }
}

/**
 * POST /products/{productId}/reviews
 */
export function usePostProductsProductIdReviews(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postProductsProductIdReviews>>,
    Error,
    InferRequestType<(typeof client.products)[':productId']['reviews']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...getPostProductsProductIdReviewsMutationOptions(clientOptions),
    ...mutationOptions,
  })
}

/**
 * GET /orders query key
 */
export function getOrdersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.orders.$get>>,
) {
  return ['orders', '/orders', args] as const
}

/**
 * GET /orders
 */
export async function getOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders.$get(args, options))
}

/**
 * GET /orders query options
 */
export function getOrdersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.orders.$get>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getOrdersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrders(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /orders
 */
export function useOrders(
  args: MaybeRefOrGetter<InferRequestType<typeof client.orders.$get>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOrders>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getOrdersQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * GET /orders infinite query key
 */
export function getOrdersInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.orders.$get>>,
) {
  return ['orders', '/orders', args, 'infinite'] as const
}

/**
 * GET /orders infinite query options
 */
export function getOrdersInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.orders.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getOrdersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrders(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /orders
 */
export function useInfiniteOrders(
  args: MaybeRefOrGetter<InferRequestType<typeof client.orders.$get>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getOrders>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getOrdersInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * POST /orders
 */
export async function postOrders(
  args: InferRequestType<typeof client.orders.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders.$post(args, options))
}

/**
 * POST /orders
 */
export function getPostOrdersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['orders', '/orders'] as const,
    async mutationFn(args: InferRequestType<typeof client.orders.$post>) {
      return postOrders(args, options)
    },
  }
}

/**
 * POST /orders
 */
export function usePostOrders(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postOrders>>,
    Error,
    InferRequestType<typeof client.orders.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostOrdersMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * GET /orders/{orderId} query key
 */
export function getOrdersOrderIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.orders)[':orderId']['$get']>>,
) {
  return ['orders', '/orders/:orderId', args] as const
}

/**
 * GET /orders/{orderId}
 */
export async function getOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders[':orderId'].$get(args, options))
}

/**
 * GET /orders/{orderId} query options
 */
export function getOrdersOrderIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.orders)[':orderId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getOrdersOrderIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrdersOrderId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /orders/{orderId}
 */
export function useOrdersOrderId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.orders)[':orderId']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOrdersOrderId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getOrdersOrderIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * GET /orders/{orderId} infinite query key
 */
export function getOrdersOrderIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.orders)[':orderId']['$get']>>,
) {
  return ['orders', '/orders/:orderId', args, 'infinite'] as const
}

/**
 * GET /orders/{orderId} infinite query options
 */
export function getOrdersOrderIdInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.orders)[':orderId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getOrdersOrderIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrdersOrderId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /orders/{orderId}
 */
export function useInfiniteOrdersOrderId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.orders)[':orderId']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getOrdersOrderId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getOrdersOrderIdInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * GET /categories query key
 */
export function getCategoriesQueryKey() {
  return ['categories', '/categories'] as const
}

/**
 * GET /categories
 */
export async function getCategories(options?: ClientRequestOptions) {
  return await parseResponse(client.categories.$get(undefined, options))
}

/**
 * GET /categories query options
 */
export function getCategoriesQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCategoriesQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getCategories({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /categories
 */
export function useCategories(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getCategories>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getCategoriesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /categories infinite query key
 */
export function getCategoriesInfiniteQueryKey() {
  return ['categories', '/categories', 'infinite'] as const
}

/**
 * GET /categories infinite query options
 */
export function getCategoriesInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getCategoriesInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getCategories({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /categories
 */
export function useInfiniteCategories(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getCategories>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getCategoriesInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * POST /upload/image
 */
export async function postUploadImage(
  args: InferRequestType<typeof client.upload.image.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.upload.image.$post(args, options))
}

/**
 * POST /upload/image
 */
export function getPostUploadImageMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['upload', '/upload/image'] as const,
    async mutationFn(args: InferRequestType<typeof client.upload.image.$post>) {
      return postUploadImage(args, options)
    },
  }
}

/**
 * POST /upload/image
 */
export function usePostUploadImage(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUploadImage>>,
    Error,
    InferRequestType<typeof client.upload.image.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostUploadImageMutationOptions(clientOptions), ...mutationOptions })
}

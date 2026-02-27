import { useQuery, useMutation, queryOptions, mutationOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates TanStack Query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersQueryKey(args: Parameters<typeof getUsers>[0]) {
  return ['users', 'GET', '/users', args] as const
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
 * Returns TanStack Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersQueryOptions(
  args: Parameters<typeof getUsers>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /users
 */
export function useGetUsers(
  args: Parameters<typeof getUsers>[0],
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetUsersQueryOptions(args, clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query mutation key for POST /users
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUsersMutationKey() {
  return ['users', 'POST', '/users'] as const
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
 * Returns TanStack Query mutation options for POST /users
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostUsersMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostUsersMutationKey(),
    async mutationFn(args: Parameters<typeof postUsers>[0]) {
      return postUsers(args, clientOptions)
    },
  })
}

/**
 * POST /users
 */
export function usePostUsers(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    Error,
    Parameters<typeof postUsers>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostUsersMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query cache key for GET /users/{userId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersUserIdQueryKey(args: Parameters<typeof getUsersUserId>[0]) {
  return ['users', 'GET', '/users/:userId', args] as const
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
 * Returns TanStack Query query options for GET /users/{userId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersUserIdQueryOptions(
  args: Parameters<typeof getUsersUserId>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersUserIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersUserId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /users/{userId}
 */
export function useGetUsersUserId(
  args: Parameters<typeof getUsersUserId>[0],
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetUsersUserIdQueryOptions(args, clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query mutation key for PUT /users/{userId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutUsersUserIdMutationKey() {
  return ['users', 'PUT', '/users/:userId'] as const
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
 * Returns TanStack Query mutation options for PUT /users/{userId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutUsersUserIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPutUsersUserIdMutationKey(),
    async mutationFn(args: Parameters<typeof putUsersUserId>[0]) {
      return putUsersUserId(args, clientOptions)
    },
  })
}

/**
 * PUT /users/{userId}
 */
export function usePutUsersUserId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putUsersUserId>>,
    Error,
    Parameters<typeof putUsersUserId>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPutUsersUserIdMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query mutation key for DELETE /users/{userId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteUsersUserIdMutationKey() {
  return ['users', 'DELETE', '/users/:userId'] as const
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
 * Returns TanStack Query mutation options for DELETE /users/{userId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeleteUsersUserIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getDeleteUsersUserIdMutationKey(),
    async mutationFn(args: Parameters<typeof deleteUsersUserId>[0]) {
      return deleteUsersUserId(args, clientOptions)
    },
  })
}

/**
 * DELETE /users/{userId}
 */
export function useDeleteUsersUserId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteUsersUserId>> | undefined,
    Error,
    Parameters<typeof deleteUsersUserId>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getDeleteUsersUserIdMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query cache key for GET /products
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProductsQueryKey(args: Parameters<typeof getProducts>[0]) {
  return ['products', 'GET', '/products', args] as const
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
 * Returns TanStack Query query options for GET /products
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetProductsQueryOptions(
  args: Parameters<typeof getProducts>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetProductsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProducts(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /products
 */
export function useGetProducts(
  args: Parameters<typeof getProducts>[0],
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProducts>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetProductsQueryOptions(args, clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query mutation key for POST /products
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostProductsMutationKey() {
  return ['products', 'POST', '/products'] as const
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
 * Returns TanStack Query mutation options for POST /products
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostProductsMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostProductsMutationKey(),
    async mutationFn(args: Parameters<typeof postProducts>[0]) {
      return postProducts(args, clientOptions)
    },
  })
}

/**
 * POST /products
 */
export function usePostProducts(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postProducts>>,
    Error,
    Parameters<typeof postProducts>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostProductsMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query cache key for GET /products/{productId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProductsProductIdQueryKey(args: Parameters<typeof getProductsProductId>[0]) {
  return ['products', 'GET', '/products/:productId', args] as const
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
 * Returns TanStack Query query options for GET /products/{productId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetProductsProductIdQueryOptions(
  args: Parameters<typeof getProductsProductId>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetProductsProductIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductId(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

/**
 * GET /products/{productId}
 */
export function useGetProductsProductId(
  args: Parameters<typeof getProductsProductId>[0],
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductsProductId>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetProductsProductIdQueryOptions(args, clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query mutation key for PUT /products/{productId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutProductsProductIdMutationKey() {
  return ['products', 'PUT', '/products/:productId'] as const
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
 * Returns TanStack Query mutation options for PUT /products/{productId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutProductsProductIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPutProductsProductIdMutationKey(),
    async mutationFn(args: Parameters<typeof putProductsProductId>[0]) {
      return putProductsProductId(args, clientOptions)
    },
  })
}

/**
 * PUT /products/{productId}
 */
export function usePutProductsProductId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putProductsProductId>>,
    Error,
    Parameters<typeof putProductsProductId>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPutProductsProductIdMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query cache key for GET /products/{productId}/reviews
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProductsProductIdReviewsQueryKey(
  args: Parameters<typeof getProductsProductIdReviews>[0],
) {
  return ['products', 'GET', '/products/:productId/reviews', args] as const
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
 * Returns TanStack Query query options for GET /products/{productId}/reviews
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetProductsProductIdReviewsQueryOptions(
  args: Parameters<typeof getProductsProductIdReviews>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductIdReviews(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

/**
 * GET /products/{productId}/reviews
 */
export function useGetProductsProductIdReviews(
  args: Parameters<typeof getProductsProductIdReviews>[0],
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductsProductIdReviews>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetProductsProductIdReviewsQueryOptions(args, clientOptions),
    ...queryOpts,
  })
}

/**
 * Generates TanStack Query mutation key for POST /products/{productId}/reviews
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostProductsProductIdReviewsMutationKey() {
  return ['products', 'POST', '/products/:productId/reviews'] as const
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
 * Returns TanStack Query mutation options for POST /products/{productId}/reviews
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostProductsProductIdReviewsMutationOptions(
  clientOptions?: ClientRequestOptions,
) {
  return mutationOptions({
    mutationKey: getPostProductsProductIdReviewsMutationKey(),
    async mutationFn(args: Parameters<typeof postProductsProductIdReviews>[0]) {
      return postProductsProductIdReviews(args, clientOptions)
    },
  })
}

/**
 * POST /products/{productId}/reviews
 */
export function usePostProductsProductIdReviews(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postProductsProductIdReviews>>,
    Error,
    Parameters<typeof postProductsProductIdReviews>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({
    ...getPostProductsProductIdReviewsMutationOptions(clientOptions),
    ...mutationOpts,
  })
}

/**
 * Generates TanStack Query cache key for GET /orders
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetOrdersQueryKey(args: Parameters<typeof getOrders>[0]) {
  return ['orders', 'GET', '/orders', args] as const
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
 * Returns TanStack Query query options for GET /orders
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOrdersQueryOptions(
  args: Parameters<typeof getOrders>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetOrdersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrders(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /orders
 */
export function useGetOrders(
  args: Parameters<typeof getOrders>[0],
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOrders>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetOrdersQueryOptions(args, clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query mutation key for POST /orders
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOrdersMutationKey() {
  return ['orders', 'POST', '/orders'] as const
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
 * Returns TanStack Query mutation options for POST /orders
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostOrdersMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostOrdersMutationKey(),
    async mutationFn(args: Parameters<typeof postOrders>[0]) {
      return postOrders(args, clientOptions)
    },
  })
}

/**
 * POST /orders
 */
export function usePostOrders(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postOrders>>,
    Error,
    Parameters<typeof postOrders>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostOrdersMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query cache key for GET /orders/{orderId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetOrdersOrderIdQueryKey(args: Parameters<typeof getOrdersOrderId>[0]) {
  return ['orders', 'GET', '/orders/:orderId', args] as const
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
 * Returns TanStack Query query options for GET /orders/{orderId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOrdersOrderIdQueryOptions(
  args: Parameters<typeof getOrdersOrderId>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetOrdersOrderIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrdersOrderId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /orders/{orderId}
 */
export function useGetOrdersOrderId(
  args: Parameters<typeof getOrdersOrderId>[0],
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOrdersOrderId>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetOrdersOrderIdQueryOptions(args, clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query cache key for GET /categories
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetCategoriesQueryKey() {
  return ['categories', 'GET', '/categories'] as const
}

/**
 * GET /categories
 */
export async function getCategories(options?: ClientRequestOptions) {
  return await parseResponse(client.categories.$get(undefined, options))
}

/**
 * Returns TanStack Query query options for GET /categories
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetCategoriesQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetCategoriesQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getCategories({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /categories
 */
export function useGetCategories(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getCategories>>, Error>
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetCategoriesQueryOptions(clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query mutation key for POST /upload/image
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUploadImageMutationKey() {
  return ['upload', 'POST', '/upload/image'] as const
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
 * Returns TanStack Query mutation options for POST /upload/image
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostUploadImageMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostUploadImageMutationKey(),
    async mutationFn(args: Parameters<typeof postUploadImage>[0]) {
      return postUploadImage(args, clientOptions)
    },
  })
}

/**
 * POST /upload/image
 */
export function usePostUploadImage(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUploadImage>>,
    Error,
    Parameters<typeof postUploadImage>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostUploadImageMutationOptions(clientOptions), ...mutationOpts })
}

import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
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
export function getUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
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
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /users
 */
export function createUsers(
  args: () => InferRequestType<typeof client.users.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getUsersQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * GET /users infinite query key
 */
export function getUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args, 'infinite'] as const
}

/**
 * GET /users infinite query options
 */
export function getUsersInfiniteQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users
 */
export function createInfiniteUsers(
  args: () => InferRequestType<typeof client.users.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getUsersInfiniteQueryOptions(args(), clientOptions), ...query }
  })
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
export function createPostUsers(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postUsers>>,
      Error,
      InferRequestType<typeof client.users.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostUsersMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * GET /users/{userId} query key
 */
export function getUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
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
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersUserIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersUserId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /users/{userId}
 */
export function createUsersUserId(
  args: () => InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getUsersUserIdQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * GET /users/{userId} infinite query key
 */
export function getUsersUserIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['users', '/users/:userId', args, 'infinite'] as const
}

/**
 * GET /users/{userId} infinite query options
 */
export function getUsersUserIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersUserIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersUserId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users/{userId}
 */
export function createInfiniteUsersUserId(
  args: () => InferRequestType<(typeof client.users)[':userId']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getUsersUserIdInfiniteQueryOptions(args(), clientOptions), ...query }
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
export function createPutUsersUserId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putUsersUserId>>,
      Error,
      InferRequestType<(typeof client.users)[':userId']['$put']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPutUsersUserIdMutationOptions(clientOptions), ...mutation }
  })
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
export function createDeleteUsersUserId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deleteUsersUserId>> | undefined,
      Error,
      InferRequestType<(typeof client.users)[':userId']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getDeleteUsersUserIdMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * GET /products query key
 */
export function getProductsQueryKey(args: InferRequestType<typeof client.products.$get>) {
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
  args: InferRequestType<typeof client.products.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getProductsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProducts(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /products
 */
export function createProducts(
  args: () => InferRequestType<typeof client.products.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getProducts>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getProductsQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * GET /products infinite query key
 */
export function getProductsInfiniteQueryKey(args: InferRequestType<typeof client.products.$get>) {
  return ['products', '/products', args, 'infinite'] as const
}

/**
 * GET /products infinite query options
 */
export function getProductsInfiniteQueryOptions(
  args: InferRequestType<typeof client.products.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getProductsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProducts(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /products
 */
export function createInfiniteProducts(
  args: () => InferRequestType<typeof client.products.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getProducts>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getProductsInfiniteQueryOptions(args(), clientOptions), ...query }
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
export function createPostProducts(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postProducts>>,
      Error,
      InferRequestType<typeof client.products.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostProductsMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * GET /products/{productId} query key
 */
export function getProductsProductIdQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
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
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getProductsProductIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /products/{productId}
 */
export function createProductsProductId(
  args: () => InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getProductsProductId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getProductsProductIdQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * GET /products/{productId} infinite query key
 */
export function getProductsProductIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return ['products', '/products/:productId', args, 'infinite'] as const
}

/**
 * GET /products/{productId} infinite query options
 */
export function getProductsProductIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getProductsProductIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /products/{productId}
 */
export function createInfiniteProductsProductId(
  args: () => InferRequestType<(typeof client.products)[':productId']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getProductsProductId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getProductsProductIdInfiniteQueryOptions(args(), clientOptions), ...query }
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
export function createPutProductsProductId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putProductsProductId>>,
      Error,
      InferRequestType<(typeof client.products)[':productId']['$put']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPutProductsProductIdMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * GET /products/{productId}/reviews query key
 */
export function getProductsProductIdReviewsQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
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
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductIdReviews(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /products/{productId}/reviews
 */
export function createProductsProductIdReviews(
  args: () => InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getProductsProductIdReviews>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getProductsProductIdReviewsQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * GET /products/{productId}/reviews infinite query key
 */
export function getProductsProductIdReviewsInfiniteQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
) {
  return ['products', '/products/:productId/reviews', args, 'infinite'] as const
}

/**
 * GET /products/{productId}/reviews infinite query options
 */
export function getProductsProductIdReviewsInfiniteQueryOptions(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getProductsProductIdReviewsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductIdReviews(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /products/{productId}/reviews
 */
export function createInfiniteProductsProductIdReviews(
  args: () => InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<
      Awaited<ReturnType<typeof getProductsProductIdReviews>>,
      Error
    >
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getProductsProductIdReviewsInfiniteQueryOptions(args(), clientOptions), ...query }
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
export function createPostProductsProductIdReviews(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postProductsProductIdReviews>>,
      Error,
      InferRequestType<(typeof client.products)[':productId']['reviews']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostProductsProductIdReviewsMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * GET /orders query key
 */
export function getOrdersQueryKey(args: InferRequestType<typeof client.orders.$get>) {
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
  args: InferRequestType<typeof client.orders.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getOrdersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrders(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /orders
 */
export function createOrders(
  args: () => InferRequestType<typeof client.orders.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getOrders>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getOrdersQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * GET /orders infinite query key
 */
export function getOrdersInfiniteQueryKey(args: InferRequestType<typeof client.orders.$get>) {
  return ['orders', '/orders', args, 'infinite'] as const
}

/**
 * GET /orders infinite query options
 */
export function getOrdersInfiniteQueryOptions(
  args: InferRequestType<typeof client.orders.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getOrdersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrders(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /orders
 */
export function createInfiniteOrders(
  args: () => InferRequestType<typeof client.orders.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getOrders>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getOrdersInfiniteQueryOptions(args(), clientOptions), ...query }
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
export function createPostOrders(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postOrders>>,
      Error,
      InferRequestType<typeof client.orders.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostOrdersMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * GET /orders/{orderId} query key
 */
export function getOrdersOrderIdQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
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
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getOrdersOrderIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrdersOrderId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /orders/{orderId}
 */
export function createOrdersOrderId(
  args: () => InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getOrdersOrderId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getOrdersOrderIdQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * GET /orders/{orderId} infinite query key
 */
export function getOrdersOrderIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['orders', '/orders/:orderId', args, 'infinite'] as const
}

/**
 * GET /orders/{orderId} infinite query options
 */
export function getOrdersOrderIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getOrdersOrderIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrdersOrderId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /orders/{orderId}
 */
export function createInfiniteOrdersOrderId(
  args: () => InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getOrdersOrderId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getOrdersOrderIdInfiniteQueryOptions(args(), clientOptions), ...query }
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
export function createCategories(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getCategories>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getCategoriesQueryOptions(clientOptions), ...query }
  })
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
export function createInfiniteCategories(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getCategories>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getCategoriesInfiniteQueryOptions(clientOptions), ...query }
  })
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
export function createPostUploadImage(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postUploadImage>>,
      Error,
      InferRequestType<typeof client.upload.image.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostUploadImageMutationOptions(clientOptions), ...mutation }
  })
}

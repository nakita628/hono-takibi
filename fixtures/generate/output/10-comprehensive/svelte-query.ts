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
 * Generates Svelte Query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
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
 * Returns Svelte Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /users
 */
export function createGetUsers(
  args: () => InferRequestType<typeof client.users.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetUsersQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', 'GET', '/users', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /users
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersInfiniteQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users
 */
export function createInfiniteGetUsers(
  args: () => InferRequestType<typeof client.users.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetUsersInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query mutation key for POST /users
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
 * Returns Svelte Query mutation options for POST /users
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostUsersMutationKey(),
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
 * Generates Svelte Query cache key for GET /users/{userId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
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
 * Returns Svelte Query query options for GET /users/{userId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersUserIdQueryOptions(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetUsersUserIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersUserId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /users/{userId}
 */
export function createGetUsersUserId(
  args: () => InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetUsersUserIdQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /users/{userId}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetUsersUserIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['users', 'GET', '/users/:userId', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /users/{userId}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetUsersUserIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersUserIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersUserId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /users/{userId}
 */
export function createInfiniteGetUsersUserId(
  args: () => InferRequestType<(typeof client.users)[':userId']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetUsersUserIdInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /users/{userId}
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
 * Returns Svelte Query mutation options for PUT /users/{userId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutUsersUserIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPutUsersUserIdMutationKey(),
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
 * Generates Svelte Query mutation key for DELETE /users/{userId}
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
 * Returns Svelte Query mutation options for DELETE /users/{userId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeleteUsersUserIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getDeleteUsersUserIdMutationKey(),
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
 * Generates Svelte Query cache key for GET /products
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProductsQueryKey(args: InferRequestType<typeof client.products.$get>) {
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
 * Returns Svelte Query query options for GET /products
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetProductsQueryOptions(
  args: InferRequestType<typeof client.products.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetProductsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProducts(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /products
 */
export function createGetProducts(
  args: () => InferRequestType<typeof client.products.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getProducts>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetProductsQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /products
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetProductsInfiniteQueryKey(
  args: InferRequestType<typeof client.products.$get>,
) {
  return ['products', 'GET', '/products', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /products
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetProductsInfiniteQueryOptions(
  args: InferRequestType<typeof client.products.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetProductsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProducts(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /products
 */
export function createInfiniteGetProducts(
  args: () => InferRequestType<typeof client.products.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getProducts>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetProductsInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query mutation key for POST /products
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
 * Returns Svelte Query mutation options for POST /products
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostProductsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostProductsMutationKey(),
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
 * Generates Svelte Query cache key for GET /products/{productId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProductsProductIdQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
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
 * Returns Svelte Query query options for GET /products/{productId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetProductsProductIdQueryOptions(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetProductsProductIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /products/{productId}
 */
export function createGetProductsProductId(
  args: () => InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getProductsProductId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetProductsProductIdQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /products/{productId}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetProductsProductIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return ['products', 'GET', '/products/:productId', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /products/{productId}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetProductsProductIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetProductsProductIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /products/{productId}
 */
export function createInfiniteGetProductsProductId(
  args: () => InferRequestType<(typeof client.products)[':productId']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getProductsProductId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetProductsProductIdInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /products/{productId}
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
 * Returns Svelte Query mutation options for PUT /products/{productId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutProductsProductIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPutProductsProductIdMutationKey(),
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
 * Generates Svelte Query cache key for GET /products/{productId}/reviews
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetProductsProductIdReviewsQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
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
 * Returns Svelte Query query options for GET /products/{productId}/reviews
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetProductsProductIdReviewsQueryOptions(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductIdReviews(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /products/{productId}/reviews
 */
export function createGetProductsProductIdReviews(
  args: () => InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getProductsProductIdReviews>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetProductsProductIdReviewsQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /products/{productId}/reviews
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetProductsProductIdReviewsInfiniteQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
) {
  return ['products', 'GET', '/products/:productId/reviews', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /products/{productId}/reviews
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetProductsProductIdReviewsInfiniteQueryOptions(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetProductsProductIdReviewsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductIdReviews(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /products/{productId}/reviews
 */
export function createInfiniteGetProductsProductIdReviews(
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
    return {
      ...getGetProductsProductIdReviewsInfiniteQueryOptions(args(), clientOptions),
      ...query,
    }
  })
}

/**
 * Generates Svelte Query mutation key for POST /products/{productId}/reviews
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
 * Returns Svelte Query mutation options for POST /products/{productId}/reviews
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostProductsProductIdReviewsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostProductsProductIdReviewsMutationKey(),
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
 * Generates Svelte Query cache key for GET /orders
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetOrdersQueryKey(args: InferRequestType<typeof client.orders.$get>) {
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
 * Returns Svelte Query query options for GET /orders
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOrdersQueryOptions(
  args: InferRequestType<typeof client.orders.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetOrdersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrders(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /orders
 */
export function createGetOrders(
  args: () => InferRequestType<typeof client.orders.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getOrders>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetOrdersQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /orders
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetOrdersInfiniteQueryKey(args: InferRequestType<typeof client.orders.$get>) {
  return ['orders', 'GET', '/orders', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /orders
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetOrdersInfiniteQueryOptions(
  args: InferRequestType<typeof client.orders.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetOrdersInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrders(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /orders
 */
export function createInfiniteGetOrders(
  args: () => InferRequestType<typeof client.orders.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getOrders>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetOrdersInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query mutation key for POST /orders
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
 * Returns Svelte Query mutation options for POST /orders
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostOrdersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostOrdersMutationKey(),
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
 * Generates Svelte Query cache key for GET /orders/{orderId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetOrdersOrderIdQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
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
 * Returns Svelte Query query options for GET /orders/{orderId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOrdersOrderIdQueryOptions(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetOrdersOrderIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrdersOrderId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /orders/{orderId}
 */
export function createGetOrdersOrderId(
  args: () => InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getOrdersOrderId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetOrdersOrderIdQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /orders/{orderId}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetOrdersOrderIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['orders', 'GET', '/orders/:orderId', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /orders/{orderId}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetOrdersOrderIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetOrdersOrderIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrdersOrderId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /orders/{orderId}
 */
export function createInfiniteGetOrdersOrderId(
  args: () => InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getOrdersOrderId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetOrdersOrderIdInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query cache key for GET /categories
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
 * Returns Svelte Query query options for GET /categories
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetCategoriesQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetCategoriesQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getCategories({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /categories
 */
export function createGetCategories(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getCategories>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetCategoriesQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /categories
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetCategoriesInfiniteQueryKey() {
  return ['categories', 'GET', '/categories', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /categories
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetCategoriesInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetCategoriesInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getCategories({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /categories
 */
export function createInfiniteGetCategories(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getCategories>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetCategoriesInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query mutation key for POST /upload/image
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
 * Returns Svelte Query mutation options for POST /upload/image
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostUploadImageMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostUploadImageMutationKey(),
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

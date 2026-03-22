import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/** Key prefix for /categories */
export function getCategoriesKey() {
  return ['categories'] as const
}

/** Key prefix for /orders */
export function getOrdersKey() {
  return ['orders'] as const
}

/** Key prefix for /products */
export function getProductsKey() {
  return ['products'] as const
}

/** Key prefix for /upload */
export function getUploadKey() {
  return ['upload'] as const
}

/** Key prefix for /users */
export function getUsersKey() {
  return ['users'] as const
}

/** GET /users query key */
export function getGetUsersKey(args: InferRequestType<typeof client.users.$get>) {
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
 * GET /users
 */
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey(args)) : null
  return { swrKey, ...useSWR(swrKey, async () => getUsers(args, clientOptions), restSwrOptions) }
}

/**
 * GET /users
 */
export function useImmutableGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getUsers(args, clientOptions), restSwrOptions),
  }
}

/** GET /users infinite query key */
export function getGetUsersInfiniteKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args, 'infinite'] as const
}

/**
 * GET /users
 */
export function useInfiniteGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getUsers>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getUsers(args, clientOptions), restSwrOptions)
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
export function usePostUsers(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postUsers>>,
    Error,
    Key,
    InferRequestType<typeof client.users.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['users', '/users'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.users.$post> }) =>
        postUsers(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/** GET /users/{userId} query key */
export function getGetUsersUserIdKey(
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
 * GET /users/{userId}
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getUsersUserId(args, clientOptions), restSwrOptions),
  }
}

/**
 * GET /users/{userId}
 */
export function useImmutableGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetUsersUserIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getUsersUserId(args, clientOptions), restSwrOptions),
  }
}

/** GET /users/{userId} infinite query key */
export function getGetUsersUserIdInfiniteKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['users', '/users/:userId', args, 'infinite'] as const
}

/**
 * GET /users/{userId}
 */
export function useInfiniteGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getUsersUserId>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetUsersUserIdInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getUsersUserId(args, clientOptions), restSwrOptions)
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
export function usePutUsersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof putUsersUserId>>,
    Error,
    Key,
    InferRequestType<(typeof client.users)[':userId']['$put']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['users', '/users/:userId'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['$put']> },
      ) => putUsersUserId(arg, clientOptions),
      restMutationOptions,
    ),
  }
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
export function useDeleteUsersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof deleteUsersUserId>> | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.users)[':userId']['$delete']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['users', '/users/:userId'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['$delete']> },
      ) => deleteUsersUserId(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/** GET /products query key */
export function getGetProductsKey(args: InferRequestType<typeof client.products.$get>) {
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
 * GET /products
 */
export function useGetProducts(
  args: InferRequestType<typeof client.products.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetProductsKey(args)) : null
  return { swrKey, ...useSWR(swrKey, async () => getProducts(args, clientOptions), restSwrOptions) }
}

/**
 * GET /products
 */
export function useImmutableGetProducts(
  args: InferRequestType<typeof client.products.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetProductsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getProducts(args, clientOptions), restSwrOptions),
  }
}

/** GET /products infinite query key */
export function getGetProductsInfiniteKey(args: InferRequestType<typeof client.products.$get>) {
  return ['products', '/products', args, 'infinite'] as const
}

/**
 * GET /products
 */
export function useInfiniteGetProducts(
  args: InferRequestType<typeof client.products.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getProducts>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetProductsInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getProducts(args, clientOptions), restSwrOptions)
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
export function usePostProducts(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postProducts>>,
    Error,
    Key,
    InferRequestType<typeof client.products.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['products', '/products'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.products.$post> }) =>
        postProducts(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/** GET /products/{productId} query key */
export function getGetProductsProductIdKey(
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
 * GET /products/{productId}
 */
export function useGetProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetProductsProductIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getProductsProductId(args, clientOptions), restSwrOptions),
  }
}

/**
 * GET /products/{productId}
 */
export function useImmutableGetProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetProductsProductIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => getProductsProductId(args, clientOptions),
      restSwrOptions,
    ),
  }
}

/** GET /products/{productId} infinite query key */
export function getGetProductsProductIdInfiniteKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return ['products', '/products/:productId', args, 'infinite'] as const
}

/**
 * GET /products/{productId}
 */
export function useInfiniteGetProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getProductsProductId>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ??
    ((index: number) => [...getGetProductsProductIdInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => getProductsProductId(args, clientOptions),
    restSwrOptions,
  )
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
export function usePutProductsProductId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof putProductsProductId>>,
    Error,
    Key,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['products', '/products/:productId'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.products)[':productId']['$put']> },
      ) => putProductsProductId(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/** GET /products/{productId}/reviews query key */
export function getGetProductsProductIdReviewsKey(
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
 * GET /products/{productId}/reviews
 */
export function useGetProductsProductIdReviews(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetProductsProductIdReviewsKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getProductsProductIdReviews(args, clientOptions), restSwrOptions),
  }
}

/**
 * GET /products/{productId}/reviews
 */
export function useImmutableGetProductsProductIdReviews(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetProductsProductIdReviewsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => getProductsProductIdReviews(args, clientOptions),
      restSwrOptions,
    ),
  }
}

/** GET /products/{productId}/reviews infinite query key */
export function getGetProductsProductIdReviewsInfiniteKey(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
) {
  return ['products', '/products/:productId/reviews', args, 'infinite'] as const
}

/**
 * GET /products/{productId}/reviews
 */
export function useInfiniteGetProductsProductIdReviews(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<
      Awaited<ReturnType<typeof getProductsProductIdReviews>>,
      Error
    > & { swrKey?: SWRInfiniteKeyLoader }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ??
    ((index: number) => [...getGetProductsProductIdReviewsInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => getProductsProductIdReviews(args, clientOptions),
    restSwrOptions,
  )
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
export function usePostProductsProductIdReviews(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postProductsProductIdReviews>>,
    Error,
    Key,
    InferRequestType<(typeof client.products)[':productId']['reviews']['$post']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['products', '/products/:productId/reviews'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.products)[':productId']['reviews']['$post']> },
      ) => postProductsProductIdReviews(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/** GET /orders query key */
export function getGetOrdersKey(args: InferRequestType<typeof client.orders.$get>) {
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
 * GET /orders
 */
export function useGetOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetOrdersKey(args)) : null
  return { swrKey, ...useSWR(swrKey, async () => getOrders(args, clientOptions), restSwrOptions) }
}

/**
 * GET /orders
 */
export function useImmutableGetOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetOrdersKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getOrders(args, clientOptions), restSwrOptions),
  }
}

/** GET /orders infinite query key */
export function getGetOrdersInfiniteKey(args: InferRequestType<typeof client.orders.$get>) {
  return ['orders', '/orders', args, 'infinite'] as const
}

/**
 * GET /orders
 */
export function useInfiniteGetOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getOrders>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetOrdersInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getOrders(args, clientOptions), restSwrOptions)
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
export function usePostOrders(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postOrders>>,
    Error,
    Key,
    InferRequestType<typeof client.orders.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['orders', '/orders'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.orders.$post> }) =>
        postOrders(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/** GET /orders/{orderId} query key */
export function getGetOrdersOrderIdKey(
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
 * GET /orders/{orderId}
 */
export function useGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetOrdersOrderIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getOrdersOrderId(args, clientOptions), restSwrOptions),
  }
}

/**
 * GET /orders/{orderId}
 */
export function useImmutableGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetOrdersOrderIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getOrdersOrderId(args, clientOptions), restSwrOptions),
  }
}

/** GET /orders/{orderId} infinite query key */
export function getGetOrdersOrderIdInfiniteKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['orders', '/orders/:orderId', args, 'infinite'] as const
}

/**
 * GET /orders/{orderId}
 */
export function useInfiniteGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getOrdersOrderId>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ??
    ((index: number) => [...getGetOrdersOrderIdInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => getOrdersOrderId(args, clientOptions),
    restSwrOptions,
  )
}

/** GET /categories query key */
export function getGetCategoriesKey() {
  return ['categories', '/categories'] as const
}

/**
 * GET /categories
 */
export async function getCategories(options?: ClientRequestOptions) {
  return await parseResponse(client.categories.$get(undefined, options))
}

/**
 * GET /categories
 */
export function useGetCategories(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCategoriesKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getCategories(clientOptions), restSwrOptions) }
}

/**
 * GET /categories
 */
export function useImmutableGetCategories(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCategoriesKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getCategories(clientOptions), restSwrOptions),
  }
}

/** GET /categories infinite query key */
export function getGetCategoriesInfiniteKey() {
  return ['categories', '/categories', 'infinite'] as const
}

/**
 * GET /categories
 */
export function useInfiniteGetCategories(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getCategories>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetCategoriesInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getCategories(clientOptions), restSwrOptions)
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
export function usePostUploadImage(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postUploadImage>>,
    Error,
    Key,
    InferRequestType<typeof client.upload.image.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['upload', '/upload/image'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.upload.image.$post> }) =>
        postUploadImage(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

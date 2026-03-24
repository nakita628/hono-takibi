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

export function getCategoriesKey() {
  return ['categories'] as const
}

export function getOrdersKey() {
  return ['orders'] as const
}

export function getProductsKey() {
  return ['products'] as const
}

export function getUploadKey() {
  return ['upload'] as const
}

export function getUsersKey() {
  return ['users'] as const
}

export function getUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
}

export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

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

export function createUsers<TData = Awaited<ReturnType<typeof getUsers>>>(
  args: () => InferRequestType<typeof client.users.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getUsers(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getUsersInfiniteQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args, 'infinite'] as const
}

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

export function createInfiniteUsers(
  args: () => InferRequestType<typeof client.users.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getUsersInfiniteQueryOptions(args(), clientOptions) }
  })
}

export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
    },
  }
}

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

export function getUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['users', '/users/:userId', args] as const
}

export async function getUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$get(args, options))
}

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

export function createUsersUserId<TData = Awaited<ReturnType<typeof getUsersUserId>>>(
  args: () => InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersUserIdQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getUsersUserId(args(), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        })
      },
    }
  })
}

export function getUsersUserIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['users', '/users/:userId', args, 'infinite'] as const
}

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

export function createInfiniteUsersUserId(
  args: () => InferRequestType<(typeof client.users)[':userId']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getUsersUserIdInfiniteQueryOptions(args(), clientOptions) }
  })
}

export async function putUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$put(args, options))
}

export function getPutUsersUserIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:userId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':userId']['$put']>) {
      return putUsersUserId(args, options)
    },
  }
}

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

export async function deleteUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$delete(args, options))
}

export function getDeleteUsersUserIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:userId', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':userId']['$delete']>) {
      return deleteUsersUserId(args, options)
    },
  }
}

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

export function getProductsQueryKey(args: InferRequestType<typeof client.products.$get>) {
  return ['products', '/products', args] as const
}

export async function getProducts(
  args: InferRequestType<typeof client.products.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products.$get(args, options))
}

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

export function createProducts<TData = Awaited<ReturnType<typeof getProducts>>>(
  args: () => InferRequestType<typeof client.products.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getProducts>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getProductsQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getProducts(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getProductsInfiniteQueryKey(args: InferRequestType<typeof client.products.$get>) {
  return ['products', '/products', args, 'infinite'] as const
}

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

export function createInfiniteProducts(
  args: () => InferRequestType<typeof client.products.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getProducts>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getProductsInfiniteQueryOptions(args(), clientOptions) }
  })
}

export async function postProducts(
  args: InferRequestType<typeof client.products.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products.$post(args, options))
}

export function getPostProductsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['products', '/products', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.products.$post>) {
      return postProducts(args, options)
    },
  }
}

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

export function getProductsProductIdQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return ['products', '/products/:productId', args] as const
}

export async function getProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products[':productId'].$get(args, options))
}

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

export function createProductsProductId<TData = Awaited<ReturnType<typeof getProductsProductId>>>(
  args: () => InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getProductsProductId>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getProductsProductIdQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getProductsProductId(args(), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        })
      },
    }
  })
}

export function getProductsProductIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
) {
  return ['products', '/products/:productId', args, 'infinite'] as const
}

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

export function createInfiniteProductsProductId(
  args: () => InferRequestType<(typeof client.products)[':productId']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getProductsProductId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getProductsProductIdInfiniteQueryOptions(args(), clientOptions) }
  })
}

export async function putProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products[':productId'].$put(args, options))
}

export function getPutProductsProductIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['products', '/products/:productId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.products)[':productId']['$put']>) {
      return putProductsProductId(args, options)
    },
  }
}

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

export function getProductsProductIdReviewsQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
) {
  return ['products', '/products/:productId/reviews', args] as const
}

export async function getProductsProductIdReviews(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products[':productId'].reviews.$get(args, options))
}

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

export function createProductsProductIdReviews<
  TData = Awaited<ReturnType<typeof getProductsProductIdReviews>>,
>(
  args: () => InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof getProductsProductIdReviews>>,
      Error,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getProductsProductIdReviewsQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getProductsProductIdReviews(args(), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        })
      },
    }
  })
}

export function getProductsProductIdReviewsInfiniteQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
) {
  return ['products', '/products/:productId/reviews', args, 'infinite'] as const
}

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
    return { ...query, ...getProductsProductIdReviewsInfiniteQueryOptions(args(), clientOptions) }
  })
}

export async function postProductsProductIdReviews(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products[':productId'].reviews.$post(args, options))
}

export function getPostProductsProductIdReviewsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['products', '/products/:productId/reviews', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.products)[':productId']['reviews']['$post']>,
    ) {
      return postProductsProductIdReviews(args, options)
    },
  }
}

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

export function getOrdersQueryKey(args: InferRequestType<typeof client.orders.$get>) {
  return ['orders', '/orders', args] as const
}

export async function getOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders.$get(args, options))
}

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

export function createOrders<TData = Awaited<ReturnType<typeof getOrders>>>(
  args: () => InferRequestType<typeof client.orders.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getOrders>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getOrdersQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getOrders(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getOrdersInfiniteQueryKey(args: InferRequestType<typeof client.orders.$get>) {
  return ['orders', '/orders', args, 'infinite'] as const
}

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

export function createInfiniteOrders(
  args: () => InferRequestType<typeof client.orders.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getOrders>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getOrdersInfiniteQueryOptions(args(), clientOptions) }
  })
}

export async function postOrders(
  args: InferRequestType<typeof client.orders.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders.$post(args, options))
}

export function getPostOrdersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['orders', '/orders', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.orders.$post>) {
      return postOrders(args, options)
    },
  }
}

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

export function getOrdersOrderIdQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['orders', '/orders/:orderId', args] as const
}

export async function getOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders[':orderId'].$get(args, options))
}

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

export function createOrdersOrderId<TData = Awaited<ReturnType<typeof getOrdersOrderId>>>(
  args: () => InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getOrdersOrderId>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getOrdersOrderIdQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getOrdersOrderId(args(), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        })
      },
    }
  })
}

export function getOrdersOrderIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['orders', '/orders/:orderId', args, 'infinite'] as const
}

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

export function createInfiniteOrdersOrderId(
  args: () => InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getOrdersOrderId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getOrdersOrderIdInfiniteQueryOptions(args(), clientOptions) }
  })
}

export function getCategoriesQueryKey() {
  return ['categories', '/categories'] as const
}

export async function getCategories(options?: ClientRequestOptions) {
  return await parseResponse(client.categories.$get(undefined, options))
}

export function getCategoriesQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCategoriesQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getCategories({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createCategories<TData = Awaited<ReturnType<typeof getCategories>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getCategories>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getCategoriesQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getCategories({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getCategoriesInfiniteQueryKey() {
  return ['categories', '/categories', 'infinite'] as const
}

export function getCategoriesInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getCategoriesInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getCategories({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteCategories(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getCategories>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getCategoriesInfiniteQueryOptions(clientOptions) }
  })
}

export async function postUploadImage(
  args: InferRequestType<typeof client.upload.image.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.upload.image.$post(args, options))
}

export function getPostUploadImageMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['upload', '/upload/image', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.upload.image.$post>) {
      return postUploadImage(args, options)
    },
  }
}

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

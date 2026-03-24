import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
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

export function useUsers<TData = Awaited<ReturnType<typeof getUsers>>>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseUsers<TData = Awaited<ReturnType<typeof getUsers>>>(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
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

export function useInfiniteUsers(
  args: InferRequestType<typeof client.users.$get>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getUsersInfiniteQueryOptions(args, clientOptions) })
}

export function useSuspenseInfiniteUsers(
  args: InferRequestType<typeof client.users.$get>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getUsersInfiniteQueryOptions(args, clientOptions),
  })
}

export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['users', '/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
    },
  })
}

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

export function useUsersUserId<TData = Awaited<ReturnType<typeof getUsersUserId>>>(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersUserIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersUserId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseUsersUserId<TData = Awaited<ReturnType<typeof getUsersUserId>>>(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersUserIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersUserId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
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

export function useInfiniteUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getUsersUserIdInfiniteQueryOptions(args, clientOptions),
  })
}

export function useSuspenseInfiniteUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersUserId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getUsersUserIdInfiniteQueryOptions(args, clientOptions),
  })
}

export async function putUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$put(args, options))
}

export function getPutUsersUserIdMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['users', '/users/:userId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':userId']['$put']>) {
      return putUsersUserId(args, options)
    },
  })
}

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

export async function deleteUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$delete(args, options))
}

export function getDeleteUsersUserIdMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['users', '/users/:userId', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':userId']['$delete']>) {
      return deleteUsersUserId(args, options)
    },
  })
}

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

export function useProducts<TData = Awaited<ReturnType<typeof getProducts>>>(
  args: InferRequestType<typeof client.products.$get>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProducts>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getProductsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProducts(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseProducts<TData = Awaited<ReturnType<typeof getProducts>>>(
  args: InferRequestType<typeof client.products.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getProducts>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getProductsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProducts(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
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

export function useInfiniteProducts(
  args: InferRequestType<typeof client.products.$get>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProducts>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getProductsInfiniteQueryOptions(args, clientOptions),
  })
}

export function useSuspenseInfiniteProducts(
  args: InferRequestType<typeof client.products.$get>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getProducts>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getProductsInfiniteQueryOptions(args, clientOptions),
  })
}

export async function postProducts(
  args: InferRequestType<typeof client.products.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products.$post(args, options))
}

export function getPostProductsMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['products', '/products', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.products.$post>) {
      return postProducts(args, options)
    },
  })
}

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

export function useProductsProductId<TData = Awaited<ReturnType<typeof getProductsProductId>>>(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductsProductId>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getProductsProductIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductId(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export function useSuspenseProductsProductId<
  TData = Awaited<ReturnType<typeof getProductsProductId>>,
>(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getProductsProductId>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getProductsProductIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductId(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
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

export function useInfiniteProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProductsProductId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getProductsProductIdInfiniteQueryOptions(args, clientOptions),
  })
}

export function useSuspenseInfiniteProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$get']>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getProductsProductId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getProductsProductIdInfiniteQueryOptions(args, clientOptions),
  })
}

export async function putProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products[':productId'].$put(args, options))
}

export function getPutProductsProductIdMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['products', '/products/:productId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.products)[':productId']['$put']>) {
      return putProductsProductId(args, options)
    },
  })
}

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

export function useProductsProductIdReviews<
  TData = Awaited<ReturnType<typeof getProductsProductIdReviews>>,
>(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProductsProductIdReviews>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductIdReviews(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export function useSuspenseProductsProductIdReviews<
  TData = Awaited<ReturnType<typeof getProductsProductIdReviews>>,
>(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<
      Awaited<ReturnType<typeof getProductsProductIdReviews>>,
      Error,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getProductsProductIdReviews(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
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

export function useInfiniteProductsProductIdReviews(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProductsProductIdReviews>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getProductsProductIdReviewsInfiniteQueryOptions(args, clientOptions),
  })
}

export function useSuspenseInfiniteProductsProductIdReviews(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<
      Awaited<ReturnType<typeof getProductsProductIdReviews>>,
      Error
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getProductsProductIdReviewsInfiniteQueryOptions(args, clientOptions),
  })
}

export async function postProductsProductIdReviews(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products[':productId'].reviews.$post(args, options))
}

export function getPostProductsProductIdReviewsMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['products', '/products/:productId/reviews', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.products)[':productId']['reviews']['$post']>,
    ) {
      return postProductsProductIdReviews(args, options)
    },
  })
}

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

export function useOrders<TData = Awaited<ReturnType<typeof getOrders>>>(
  args: InferRequestType<typeof client.orders.$get>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOrders>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getOrdersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrders(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseOrders<TData = Awaited<ReturnType<typeof getOrders>>>(
  args: InferRequestType<typeof client.orders.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getOrders>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getOrdersQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrders(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
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

export function useInfiniteOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getOrders>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getOrdersInfiniteQueryOptions(args, clientOptions),
  })
}

export function useSuspenseInfiniteOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getOrders>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getOrdersInfiniteQueryOptions(args, clientOptions),
  })
}

export async function postOrders(
  args: InferRequestType<typeof client.orders.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders.$post(args, options))
}

export function getPostOrdersMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['orders', '/orders', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.orders.$post>) {
      return postOrders(args, options)
    },
  })
}

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

export function useOrdersOrderId<TData = Awaited<ReturnType<typeof getOrdersOrderId>>>(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOrdersOrderId>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getOrdersOrderIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrdersOrderId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseOrdersOrderId<TData = Awaited<ReturnType<typeof getOrdersOrderId>>>(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getOrdersOrderId>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getOrdersOrderIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getOrdersOrderId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
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

export function useInfiniteOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getOrdersOrderId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getOrdersOrderIdInfiniteQueryOptions(args, clientOptions),
  })
}

export function useSuspenseInfiniteOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getOrdersOrderId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getOrdersOrderIdInfiniteQueryOptions(args, clientOptions),
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

export function useCategories<TData = Awaited<ReturnType<typeof getCategories>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getCategories>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCategoriesQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getCategories({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseCategories<TData = Awaited<ReturnType<typeof getCategories>>>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getCategories>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getCategoriesQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getCategories({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
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

export function useInfiniteCategories(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getCategories>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getCategoriesInfiniteQueryOptions(clientOptions) })
}

export function useSuspenseInfiniteCategories(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getCategories>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getCategoriesInfiniteQueryOptions(clientOptions),
  })
}

export async function postUploadImage(
  args: InferRequestType<typeof client.upload.image.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.upload.image.$post(args, options))
}

export function getPostUploadImageMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['upload', '/upload/image', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.upload.image.$post>) {
      return postUploadImage(args, options)
    },
  })
}

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

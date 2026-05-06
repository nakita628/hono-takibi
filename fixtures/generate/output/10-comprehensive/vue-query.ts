import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
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

export function getUsersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
) {
  return ['users', '/users', args] as const
}

export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$get(args, options))
}

export function getUsersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }) {
      return getUsers(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useUsers<TData = Awaited<ReturnType<typeof getUsers>>, TError = unknown>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.users.$get>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getUsers>>,
      TError,
      TData,
      Awaited<ReturnType<typeof getUsers>>,
      ReturnType<typeof getUsersQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersQueryKey(args),
    queryFn({ signal }) {
      return getUsers(toValue(args), { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

export function getPostUsersMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
    },
  }
}

export function usePostUsers<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    TError,
    InferRequestType<typeof client.users.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostUsersMutationOptions<TError>(clientOptions) })
}

export function getUsersUserIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':userId']['$get']>>,
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
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':userId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersUserIdQueryKey(args),
    queryFn({ signal }) {
      return getUsersUserId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useUsersUserId<
  TData = Awaited<ReturnType<typeof getUsersUserId>>,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.users)[':userId']['$get']>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getUsersUserId>>,
      TError,
      TData,
      Awaited<ReturnType<typeof getUsersUserId>>,
      ReturnType<typeof getUsersUserIdQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersUserIdQueryKey(args),
    queryFn({ signal }) {
      return getUsersUserId(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export async function putUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$put(args, options))
}

export function getPutUsersUserIdMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:userId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':userId']['$put']>) {
      return putUsersUserId(args, options)
    },
  }
}

export function usePutUsersUserId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putUsersUserId>>,
    TError,
    InferRequestType<(typeof client.users)[':userId']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutUsersUserIdMutationOptions<TError>(clientOptions),
  })
}

export async function deleteUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':userId'].$delete(args, options))
}

export function getDeleteUsersUserIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['users', '/users/:userId', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':userId']['$delete']>) {
      return deleteUsersUserId(args, options)
    },
  }
}

export function useDeleteUsersUserId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteUsersUserId>> | undefined,
    TError,
    InferRequestType<(typeof client.users)[':userId']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getDeleteUsersUserIdMutationOptions<TError>(clientOptions),
  })
}

export function getProductsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.products.$get>>,
) {
  return ['products', '/products', args] as const
}

export async function getProducts(
  args: InferRequestType<typeof client.products.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products.$get(args, options))
}

export function getProductsQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.products.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getProductsQueryKey(args),
    queryFn({ signal }) {
      return getProducts(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useProducts<TData = Awaited<ReturnType<typeof getProducts>>, TError = unknown>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.products.$get>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getProducts>>,
      TError,
      TData,
      Awaited<ReturnType<typeof getProducts>>,
      ReturnType<typeof getProductsQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getProductsQueryKey(args),
    queryFn({ signal }) {
      return getProducts(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export async function postProducts(
  args: InferRequestType<typeof client.products.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products.$post(args, options))
}

export function getPostProductsMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['products', '/products', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.products.$post>) {
      return postProducts(args, options)
    },
  }
}

export function usePostProducts<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postProducts>>,
    TError,
    InferRequestType<typeof client.products.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostProductsMutationOptions<TError>(clientOptions),
  })
}

export function getProductsProductIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.products)[':productId']['$get']>>,
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
  args: MaybeRefOrGetter<InferRequestType<(typeof client.products)[':productId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getProductsProductIdQueryKey(args),
    queryFn({ signal }) {
      return getProductsProductId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useProductsProductId<
  TData = Awaited<ReturnType<typeof getProductsProductId>>,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.products)[':productId']['$get']>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getProductsProductId>>,
      TError,
      TData,
      Awaited<ReturnType<typeof getProductsProductId>>,
      ReturnType<typeof getProductsProductIdQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getProductsProductIdQueryKey(args),
    queryFn({ signal }) {
      return getProductsProductId(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export async function putProductsProductId(
  args: InferRequestType<(typeof client.products)[':productId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products[':productId'].$put(args, options))
}

export function getPutProductsProductIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['products', '/products/:productId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.products)[':productId']['$put']>) {
      return putProductsProductId(args, options)
    },
  }
}

export function usePutProductsProductId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putProductsProductId>>,
    TError,
    InferRequestType<(typeof client.products)[':productId']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutProductsProductIdMutationOptions<TError>(clientOptions),
  })
}

export function getProductsProductIdReviewsQueryKey(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>
  >,
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
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>
  >,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }) {
      return getProductsProductIdReviews(toValue(args), {
        ...options,
        init: { ...options?.init, signal },
      })
    },
  }
}

export function useProductsProductIdReviews<
  TData = Awaited<ReturnType<typeof getProductsProductIdReviews>>,
  TError = unknown,
>(
  args: MaybeRefOrGetter<
    InferRequestType<(typeof client.products)[':productId']['reviews']['$get']>
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getProductsProductIdReviews>>,
      TError,
      TData,
      Awaited<ReturnType<typeof getProductsProductIdReviews>>,
      ReturnType<typeof getProductsProductIdReviewsQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getProductsProductIdReviewsQueryKey(args),
    queryFn({ signal }) {
      return getProductsProductIdReviews(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export async function postProductsProductIdReviews(
  args: InferRequestType<(typeof client.products)[':productId']['reviews']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.products[':productId'].reviews.$post(args, options))
}

export function getPostProductsProductIdReviewsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['products', '/products/:productId/reviews', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.products)[':productId']['reviews']['$post']>,
    ) {
      return postProductsProductIdReviews(args, options)
    },
  }
}

export function usePostProductsProductIdReviews<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postProductsProductIdReviews>>,
    TError,
    InferRequestType<(typeof client.products)[':productId']['reviews']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostProductsProductIdReviewsMutationOptions<TError>(clientOptions),
  })
}

export function getOrdersQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.orders.$get>>,
) {
  return ['orders', '/orders', args] as const
}

export async function getOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders.$get(args, options))
}

export function getOrdersQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.orders.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getOrdersQueryKey(args),
    queryFn({ signal }) {
      return getOrders(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useOrders<TData = Awaited<ReturnType<typeof getOrders>>, TError = unknown>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.orders.$get>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getOrders>>,
      TError,
      TData,
      Awaited<ReturnType<typeof getOrders>>,
      ReturnType<typeof getOrdersQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getOrdersQueryKey(args),
    queryFn({ signal }) {
      return getOrders(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export async function postOrders(
  args: InferRequestType<typeof client.orders.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.orders.$post(args, options))
}

export function getPostOrdersMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['orders', '/orders', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.orders.$post>) {
      return postOrders(args, options)
    },
  }
}

export function usePostOrders<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postOrders>>,
    TError,
    InferRequestType<typeof client.orders.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostOrdersMutationOptions<TError>(clientOptions) })
}

export function getOrdersOrderIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.orders)[':orderId']['$get']>>,
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
  args: MaybeRefOrGetter<InferRequestType<(typeof client.orders)[':orderId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getOrdersOrderIdQueryKey(args),
    queryFn({ signal }) {
      return getOrdersOrderId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useOrdersOrderId<
  TData = Awaited<ReturnType<typeof getOrdersOrderId>>,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.orders)[':orderId']['$get']>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getOrdersOrderId>>,
      TError,
      TData,
      Awaited<ReturnType<typeof getOrdersOrderId>>,
      ReturnType<typeof getOrdersOrderIdQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getOrdersOrderIdQueryKey(args),
    queryFn({ signal }) {
      return getOrdersOrderId(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export function getCategoriesQueryKey() {
  return ['categories', '/categories'] as const
}

export async function getCategories(options?: ClientRequestOptions) {
  return await parseResponse(client.categories.$get(undefined, options))
}

export function getCategoriesQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getCategoriesQueryKey(),
    queryFn({ signal }) {
      return getCategories({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useCategories<
  TData = Awaited<ReturnType<typeof getCategories>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getCategories>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getCategories>>,
    ReturnType<typeof getCategoriesQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getCategoriesQueryKey(),
    queryFn({ signal }) {
      return getCategories({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export async function postUploadImage(
  args: InferRequestType<typeof client.upload.image.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.upload.image.$post(args, options))
}

export function getPostUploadImageMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['upload', '/upload/image', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.upload.image.$post>) {
      return postUploadImage(args, options)
    },
  }
}

export function usePostUploadImage<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUploadImage>>,
    TError,
    InferRequestType<typeof client.upload.image.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostUploadImageMutationOptions<TError>(clientOptions),
  })
}

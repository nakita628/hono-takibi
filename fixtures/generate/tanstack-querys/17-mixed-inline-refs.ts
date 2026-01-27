import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/17-mixed-inline-refs'

/**
 * Generates TanStack Query cache key for GET /users
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', '/users', args] as const
}

/**
 * Returns TanStack Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersQueryOptions = (
  args: InferRequestType<typeof client.users.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /users
 */
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /users
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostUsersMutationKey() {
  return ['POST', '/users'] as const
}

/**
 * Returns TanStack Query mutation options for POST /users
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostUsersMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostUsersMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.users.$post>) =>
    parseResponse(client.users.$post(args, clientOptions)),
})

/**
 * POST /users
 */
export function usePostUsers(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
    Error,
    InferRequestType<typeof client.users.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.users.$post>) =>
      parseResponse(client.users.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /users/{userId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['users', '/users/:userId', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/{userId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdQueryOptions = (
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersUserIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users[':userId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/{userId}
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersUserIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /orders
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostOrdersMutationKey() {
  return ['POST', '/orders'] as const
}

/**
 * Returns TanStack Query mutation options for POST /orders
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostOrdersMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostOrdersMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.orders.$post>) =>
    parseResponse(client.orders.$post(args, clientOptions)),
})

/**
 * POST /orders
 */
export function usePostOrders(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.orders.$post>>>>>,
    Error,
    InferRequestType<typeof client.orders.$post>
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
 * Generates TanStack Query cache key for GET /products/{productId}/variants
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetProductsProductIdVariantsQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['variants']['$get']>,
) {
  return ['products', '/products/:productId/variants', args] as const
}

/**
 * Returns TanStack Query query options for GET /products/{productId}/variants
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetProductsProductIdVariantsQueryOptions = (
  args: InferRequestType<(typeof client.products)[':productId']['variants']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetProductsProductIdVariantsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.products[':productId'].variants.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /products/{productId}/variants
 */
export function useGetProductsProductIdVariants(
  args: InferRequestType<(typeof client.products)[':productId']['variants']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.products)[':productId']['variants']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetProductsProductIdVariantsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /reports/generate
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostReportsGenerateMutationKey() {
  return ['POST', '/reports/generate'] as const
}

/**
 * Returns TanStack Query mutation options for POST /reports/generate
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostReportsGenerateMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostReportsGenerateMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.reports.generate.$post>) =>
    parseResponse(client.reports.generate.$post(args, clientOptions)),
})

/**
 * POST /reports/generate
 */
export function usePostReportsGenerate(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.reports.generate.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.reports.generate.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.reports.generate.$post>) =>
      parseResponse(client.reports.generate.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /webhooks/test
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostWebhooksTestMutationKey() {
  return ['POST', '/webhooks/test'] as const
}

/**
 * Returns TanStack Query mutation options for POST /webhooks/test
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostWebhooksTestMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostWebhooksTestMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.webhooks.test.$post>) =>
    parseResponse(client.webhooks.test.$post(args, clientOptions)),
})

/**
 * POST /webhooks/test
 */
export function usePostWebhooksTest(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.test.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.webhooks.test.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.webhooks.test.$post>) =>
      parseResponse(client.webhooks.test.$post(args, clientOptions)),
  })
}

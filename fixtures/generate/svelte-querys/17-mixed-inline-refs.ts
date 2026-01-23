import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/17-mixed-inline-refs'

/**
 * GET /users
 */
export function createGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.users.$get>,
      Error,
      InferResponseType<typeof client.users.$get>,
      readonly ['/users', InferRequestType<typeof client.users.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users
 */
export function getGetUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['/users', args] as const
}

/**
 * POST /users
 */
export function createPostUsers(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.users.$post> | undefined,
      Error,
      InferRequestType<typeof client.users.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.users.$post> | undefined,
    Error,
    InferRequestType<typeof client.users.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.users.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /users/{userId}
 */
export function createGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users)[':userId']['$get']>,
      Error,
      InferResponseType<(typeof client.users)[':userId']['$get']>,
      readonly ['/users/:userId', InferRequestType<(typeof client.users)[':userId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/{userId}
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', args] as const
}

/**
 * POST /orders
 */
export function createPostOrders(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.orders.$post> | undefined,
      Error,
      InferRequestType<typeof client.orders.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.orders.$post> | undefined,
    Error,
    InferRequestType<typeof client.orders.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.orders.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /products/{productId}/variants
 */
export function createGetProductsProductIdVariants(
  args: InferRequestType<(typeof client.products)[':productId']['variants']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.products)[':productId']['variants']['$get']>,
      Error,
      InferResponseType<(typeof client.products)[':productId']['variants']['$get']>,
      readonly [
        '/products/:productId/variants',
        InferRequestType<(typeof client.products)[':productId']['variants']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProductsProductIdVariantsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.products[':productId'].variants.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /products/{productId}/variants
 */
export function getGetProductsProductIdVariantsQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['variants']['$get']>,
) {
  return ['/products/:productId/variants', args] as const
}

/**
 * POST /reports/generate
 */
export function createPostReportsGenerate(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.reports.generate.$post> | undefined,
      Error,
      InferRequestType<typeof client.reports.generate.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.reports.generate.$post> | undefined,
    Error,
    InferRequestType<typeof client.reports.generate.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.reports.generate.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /webhooks/test
 */
export function createPostWebhooksTest(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.webhooks.test.$post> | undefined,
      Error,
      InferRequestType<typeof client.webhooks.test.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.webhooks.test.$post> | undefined,
    Error,
    InferRequestType<typeof client.webhooks.test.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.webhooks.test.$post(args, options?.client)),
    },
    queryClient,
  )
}

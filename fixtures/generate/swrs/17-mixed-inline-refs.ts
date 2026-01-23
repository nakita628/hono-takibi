import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/17-mixed-inline-refs'

/**
 * GET /users
 */
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.users.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.users.$get>, Error>(
    swrKey,
    async () => parseResponse(client.users.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users
 */
export function getGetUsersKey(args: InferRequestType<typeof client.users.$get>) {
  return ['GET', '/users', args] as const
}

/**
 * POST /users
 */
export function usePostUsers(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >(
    'POST /users',
    async (_, { arg }) => parseResponse(client.users.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /users/{userId}
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.users)[':userId']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.users)[':userId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users/{userId}
 */
export function getGetUsersUserIdKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['GET', '/users/:userId', args] as const
}

/**
 * POST /orders
 */
export function usePostOrders(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >(
    'POST /orders',
    async (_, { arg }) => parseResponse(client.orders.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /products/{productId}/variants
 */
export function useGetProductsProductIdVariants(
  args: InferRequestType<(typeof client.products)[':productId']['variants']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.products)[':productId']['variants']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProductsProductIdVariantsKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.products)[':productId']['variants']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.products[':productId'].variants.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /products/{productId}/variants
 */
export function getGetProductsProductIdVariantsKey(
  args: InferRequestType<(typeof client.products)[':productId']['variants']['$get']>,
) {
  return ['GET', '/products/:productId/variants', args] as const
}

/**
 * POST /reports/generate
 */
export function usePostReportsGenerate(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.reports.generate.$post>,
    Error,
    string,
    InferRequestType<typeof client.reports.generate.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.reports.generate.$post>,
    Error,
    string,
    InferRequestType<typeof client.reports.generate.$post>
  >(
    'POST /reports/generate',
    async (_, { arg }) => parseResponse(client.reports.generate.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /webhooks/test
 */
export function usePostWebhooksTest(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.webhooks.test.$post>,
    Error,
    string,
    InferRequestType<typeof client.webhooks.test.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.webhooks.test.$post>,
    Error,
    string,
    InferRequestType<typeof client.webhooks.test.$post>
  >(
    'POST /webhooks/test',
    async (_, { arg }) => parseResponse(client.webhooks.test.$post(arg, options?.client)),
    options?.swr,
  )
}

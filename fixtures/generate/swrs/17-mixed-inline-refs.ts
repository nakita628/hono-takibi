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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users
 */
export function getGetUsersKey(args?: InferRequestType<typeof client.users.$get>) {
  return ['/users', ...(args ? [args] : [])] as const
}

/**
 * POST /users
 */
export function usePostUsers(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /users',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.users.$post> }) =>
      parseResponse(client.users.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /users/{userId}
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{userId}
 */
export function getGetUsersUserIdKey(
  args?: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', ...(args ? [args] : [])] as const
}

/**
 * POST /orders
 */
export function usePostOrders(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /orders',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.orders.$post> }) =>
      parseResponse(client.orders.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /products/{productId}/variants
 */
export function useGetProductsProductIdVariants(
  args: InferRequestType<(typeof client.products)[':productId']['variants']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetProductsProductIdVariantsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.products[':productId'].variants.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /products/{productId}/variants
 */
export function getGetProductsProductIdVariantsKey(
  args?: InferRequestType<(typeof client.products)[':productId']['variants']['$get']>,
) {
  return ['/products/:productId/variants', ...(args ? [args] : [])] as const
}

/**
 * POST /reports/generate
 */
export function usePostReportsGenerate(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.reports.generate.$post>,
    Error,
    string,
    InferRequestType<typeof client.reports.generate.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /reports/generate',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.reports.generate.$post> }) =>
      parseResponse(client.reports.generate.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /webhooks/test
 */
export function usePostWebhooksTest(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.webhooks.test.$post>,
    Error,
    string,
    InferRequestType<typeof client.webhooks.test.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /webhooks/test',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.webhooks.test.$post> }) =>
      parseResponse(client.webhooks.test.$post(arg, options?.client)),
    mutationOptions,
  )
}

import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/17-mixed-inline-refs'

/**
 * Generates SWR cache key for GET /users
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetUsersKey(args: InferRequestType<typeof client.users.$get>) {
  return ['/users', args] as const
}

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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /users
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostUsersMutationKey() {
  return ['/users'] as const
}

/**
 * POST /users
 */
export function usePostUsers(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.users.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUsersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.users.$post> }) =>
        parseResponse(client.users.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{userId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetUsersUserIdKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return [`/users/${args.param.userId}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /orders
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostOrdersMutationKey() {
  return ['/orders'] as const
}

/**
 * POST /orders
 */
export function usePostOrders(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.orders.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.orders.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrdersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.orders.$post> }) =>
        parseResponse(client.orders.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /products/{productId}/variants
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetProductsProductIdVariantsKey(
  args: InferRequestType<(typeof client.products)[':productId']['variants']['$get']>,
) {
  return [`/products/${args.param.productId}/variants`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetProductsProductIdVariantsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.products[':productId'].variants.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /reports/generate
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostReportsGenerateMutationKey() {
  return ['/reports/generate'] as const
}

/**
 * POST /reports/generate
 */
export function usePostReportsGenerate(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.reports.generate.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.reports.generate.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostReportsGenerateMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.reports.generate.$post> }) =>
        parseResponse(client.reports.generate.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webhooks/test
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostWebhooksTestMutationKey() {
  return ['/webhooks/test'] as const
}

/**
 * POST /webhooks/test
 */
export function usePostWebhooksTest(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.test.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.webhooks.test.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebhooksTestMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.webhooks.test.$post> }) =>
        parseResponse(client.webhooks.test.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

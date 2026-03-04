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

/**
 * Generates SWR mutation key for POST /subscriptions
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSubscriptionsMutationKey() {
  return ['subscriptions', 'POST', '/subscriptions'] as const
}

/**
 * POST /subscriptions
 */
export async function postSubscriptions(
  args: InferRequestType<typeof client.subscriptions.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions.$post(args, options))
}

/**
 * POST /subscriptions
 */
export function usePostSubscriptions(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postSubscriptions>>,
    Error,
    Key,
    InferRequestType<typeof client.subscriptions.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSubscriptionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.subscriptions.$post> }) =>
        postSubscriptions(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /subscriptions/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSubscriptionsIdKey(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
) {
  return ['subscriptions', 'GET', '/subscriptions/:id', args] as const
}

/**
 * GET /subscriptions/{id}
 */
export async function getSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions[':id'].$get(args, options))
}

/**
 * GET /subscriptions/{id}
 */
export function useGetSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSubscriptionsIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getSubscriptionsId(args, clientOptions), restSwrOptions),
  }
}

/**
 * GET /subscriptions/{id}
 */
export function useImmutableGetSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetSubscriptionsIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getSubscriptionsId(args, clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /subscriptions/{id}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetSubscriptionsIdInfiniteKey(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
) {
  return ['subscriptions', 'GET', '/subscriptions/:id', args, 'infinite'] as const
}

/**
 * GET /subscriptions/{id}
 */
export function useInfiniteGetSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getSubscriptionsId>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ??
    ((index: number) => [...getGetSubscriptionsIdInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => getSubscriptionsId(args, clientOptions),
    restSwrOptions,
  )
}

/**
 * Generates SWR mutation key for DELETE /subscriptions/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteSubscriptionsIdMutationKey() {
  return ['subscriptions', 'DELETE', '/subscriptions/:id'] as const
}

/**
 * DELETE /subscriptions/{id}
 */
export async function deleteSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions[':id'].$delete(args, options))
}

/**
 * DELETE /subscriptions/{id}
 */
export function useDeleteSubscriptionsId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof deleteSubscriptionsId>> | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.subscriptions)[':id']['$delete']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteSubscriptionsIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.subscriptions)[':id']['$delete']> },
      ) => deleteSubscriptionsId(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webhooks/test
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebhooksTestMutationKey() {
  return ['webhooks', 'POST', '/webhooks/test'] as const
}

/**
 * POST /webhooks/test
 */
export async function postWebhooksTest(
  args: InferRequestType<typeof client.webhooks.test.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.webhooks.test.$post(args, options))
}

/**
 * POST /webhooks/test
 */
export function usePostWebhooksTest(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postWebhooksTest>>,
    Error,
    Key,
    InferRequestType<typeof client.webhooks.test.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebhooksTestMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.webhooks.test.$post> }) =>
        postWebhooksTest(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

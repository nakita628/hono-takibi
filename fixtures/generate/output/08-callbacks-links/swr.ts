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

export function getSubscriptionsKey() {
  return ['subscriptions'] as const
}

export function getWebhooksKey() {
  return ['webhooks'] as const
}

export async function postSubscriptions(
  args: InferRequestType<typeof client.subscriptions.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions.$post(args, options))
}

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
  const swrKey = customKey ?? (['subscriptions', '/subscriptions', 'POST'] as const)
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

export function getGetSubscriptionsIdKey(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
) {
  return ['subscriptions', '/subscriptions/:id', args] as const
}

export async function getSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions[':id'].$get(args, options))
}

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

export function getGetSubscriptionsIdInfiniteKey(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
) {
  return ['subscriptions', '/subscriptions/:id', args, 'infinite'] as const
}

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

export async function deleteSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions[':id'].$delete(args, options))
}

export function useDeleteSubscriptionsId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof deleteSubscriptionsId>>  ,
    Error,
    Key,
    InferRequestType<(typeof client.subscriptions)[':id']['$delete']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['subscriptions', '/subscriptions/:id', 'DELETE'] as const)
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

export async function postWebhooksTest(
  args: InferRequestType<typeof client.webhooks.test.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.webhooks.test.$post(args, options))
}

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
  const swrKey = customKey ?? (['webhooks', '/webhooks/test', 'POST'] as const)
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

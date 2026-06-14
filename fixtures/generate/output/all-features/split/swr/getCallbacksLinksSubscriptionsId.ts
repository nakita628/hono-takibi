import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetCallbacksLinksSubscriptionsIdKey(
  args: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>,
) {
  return ['callbacksLinks', '/callbacksLinks/subscriptions/:id', args] as const
}

export function useGetCallbacksLinksSubscriptionsId(
  args: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetCallbacksLinksSubscriptionsIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.callbacksLinks.subscriptions[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCallbacksLinksSubscriptionsId(
  args: InferRequestType<(typeof client.callbacksLinks.subscriptions)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey ?? getGetCallbacksLinksSubscriptionsIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () =>
        parseResponse(client.callbacksLinks.subscriptions[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

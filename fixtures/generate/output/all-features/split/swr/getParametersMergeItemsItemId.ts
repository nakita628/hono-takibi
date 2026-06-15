import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetParametersMergeItemsItemIdKey(
  args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$get']>,
) {
  const { header: _, ...keyArgs } = args
  return ['parametersMerge', '/parametersMerge/items/:itemId', keyArgs] as const
}

export function useGetParametersMergeItemsItemId(
  args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetParametersMergeItemsItemIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.parametersMerge.items[':itemId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetParametersMergeItemsItemId(
  args: InferRequestType<(typeof client.parametersMerge.items)[':itemId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetParametersMergeItemsItemIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.parametersMerge.items[':itemId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

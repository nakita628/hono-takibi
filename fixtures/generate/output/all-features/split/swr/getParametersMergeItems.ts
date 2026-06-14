import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetParametersMergeItemsKey(
  args: InferRequestType<typeof client.parametersMerge.items.$get>,
) {
  return ['parametersMerge', '/parametersMerge/items', args] as const
}

export function useGetParametersMergeItems(
  args: InferRequestType<typeof client.parametersMerge.items.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetParametersMergeItemsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.parametersMerge.items.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetParametersMergeItems(
  args: InferRequestType<typeof client.parametersMerge.items.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetParametersMergeItemsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.parametersMerge.items.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

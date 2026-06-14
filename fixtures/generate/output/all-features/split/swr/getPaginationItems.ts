import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetPaginationItemsKey(
  args: InferRequestType<typeof client.pagination.items.$get>,
) {
  return ['pagination', '/pagination/items', args] as const
}

export function useGetPaginationItems(
  args: InferRequestType<typeof client.pagination.items.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPaginationItemsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.pagination.items.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetPaginationItems(
  args: InferRequestType<typeof client.pagination.items.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetPaginationItemsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.pagination.items.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function getGetPaginationItemsInfiniteKey(
  args: InferRequestType<typeof client.pagination.items.$get>,
) {
  return ['pagination', '/pagination/items', args, 'infinite'] as const
}

export function useInfiniteGetPaginationItems<TError = unknown>(
  args: InferRequestType<typeof client.pagination.items.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pagination.items.$get>>>>
      >,
      TError
    > & { swrKey?: SWRInfiniteKeyLoader }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ??
    ((index: number) => [...getGetPaginationItemsInfiniteKey(args), index] as const)
  return useSWRInfinite(
    keyLoader,
    async () => parseResponse(client.pagination.items.$get(args, clientOptions)),
    restSwrOptions,
  )
}

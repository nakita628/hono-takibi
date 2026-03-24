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

export function getItemsKey() {
  return ['items'] as const
}

export function getGetItemsItemIdKey(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
) {
  const { header: _, ...keyArgs } = args
  return ['items', '/items/:itemId', keyArgs] as const
}

export async function getItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items[':itemId'].$get(args, options))
}

export function useGetItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetItemsItemIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(swrKey, async () => getItemsItemId(args, clientOptions), restSwrOptions),
  }
}

export function useImmutableGetItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetItemsItemIdKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getItemsItemId(args, clientOptions), restSwrOptions),
  }
}

export function getGetItemsItemIdInfiniteKey(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
) {
  const { header: _, ...keyArgs } = args
  return ['items', '/items/:itemId', keyArgs, 'infinite'] as const
}

export function useInfiniteGetItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getItemsItemId>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetItemsItemIdInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getItemsItemId(args, clientOptions), restSwrOptions)
}

export async function putItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items[':itemId'].$put(args, options))
}

export function usePutItemsItemId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof putItemsItemId>>,
    Error,
    Key,
    InferRequestType<(typeof client.items)[':itemId']['$put']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['items', '/items/:itemId', 'PUT'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.items)[':itemId']['$put']> },
      ) => putItemsItemId(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export async function deleteItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items[':itemId'].$delete(args, options))
}

export function useDeleteItemsItemId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof deleteItemsItemId>> | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.items)[':itemId']['$delete']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['items', '/items/:itemId', 'DELETE'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.items)[':itemId']['$delete']> },
      ) => deleteItemsItemId(arg, clientOptions),
      restMutationOptions,
    ),
  }
}

export function getGetItemsKey(args: InferRequestType<typeof client.items.$get>) {
  return ['items', '/items', args] as const
}

export async function getItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items.$get(args, options))
}

export function useGetItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetItemsKey(args)) : null
  return { swrKey, ...useSWR(swrKey, async () => getItems(args, clientOptions), restSwrOptions) }
}

export function useImmutableGetItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetItemsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getItems(args, clientOptions), restSwrOptions),
  }
}

export function getGetItemsInfiniteKey(args: InferRequestType<typeof client.items.$get>) {
  return ['items', '/items', args, 'infinite'] as const
}

export function useInfiniteGetItems(
  args: InferRequestType<typeof client.items.$get>,
  options: {
    swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getItems>>, Error> & {
      swrKey?: SWRInfiniteKeyLoader
    }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetItemsInfiniteKey(args), index] as const)
  return useSWRInfinite(keyLoader, async () => getItems(args, clientOptions), restSwrOptions)
}

import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/03-parameters-responses'

/**
 * GET /items
 */
export function useGetItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetItemsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.items.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /items
 */
export function getGetItemsKey(args?: InferRequestType<typeof client.items.$get>) {
  return ['/items', ...(args ? [args] : [])] as const
}

/**
 * GET /items/{itemId}
 */
export function useGetItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetItemsItemIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.items[':itemId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /items/{itemId}
 */
export function getGetItemsItemIdKey(
  args?: InferRequestType<(typeof client.items)[':itemId']['$get']>,
) {
  return ['/items/:itemId', ...(args ? [args] : [])] as const
}

/**
 * DELETE /items/{itemId}
 */
export function useDeleteItemsItemId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.items)[':itemId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.items)[':itemId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /items/:itemId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.items)[':itemId']['$delete']> },
    ) => parseResponse(client.items[':itemId'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

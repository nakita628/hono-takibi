import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/03-parameters-responses'

/**
 * GET /items
 */
export function useGetItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.items.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetItemsKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.items.$get>, Error>(
    swrKey,
    async () => parseResponse(client.items.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.items)[':itemId']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetItemsItemIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.items)[':itemId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.items[':itemId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.items)[':itemId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.items)[':itemId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.items)[':itemId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.items)[':itemId']['$delete']>
  >(
    'DELETE /items/:itemId',
    async (_, { arg }) => parseResponse(client.items[':itemId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

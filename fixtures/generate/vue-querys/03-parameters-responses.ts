import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/03-parameters-responses'

/**
 * GET /items
 */
export function useGetItems(
  args: InferRequestType<typeof client.items.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetItemsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.items.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /items
 */
export function getGetItemsQueryKey(args: InferRequestType<typeof client.items.$get>) {
  return ['/items', args] as const
}

/**
 * GET /items/{itemId}
 */
export function useGetItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetItemsItemIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.items[':itemId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /items/{itemId}
 */
export function getGetItemsItemIdQueryKey(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
) {
  return ['/items/:itemId', args] as const
}

/**
 * DELETE /items/{itemId}
 */
export function useDeleteItemsItemId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.items)[':itemId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.items)[':itemId']['$delete']>
  >({
    mutationFn: async (args) => parseResponse(client.items[':itemId'].$delete(args, clientOptions)),
  })
}

import type { CreateMutationOptions, CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/03-parameters-responses'

/**
 * GET /items
 */
export function createGetItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.items.$get>,
      Error,
      InferResponseType<typeof client.items.$get>,
      readonly ['/items', InferRequestType<typeof client.items.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetItemsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.items.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /items
 */
export function getGetItemsQueryKey(args: InferRequestType<typeof client.items.$get>) {
  return ['/items', args] as const
}

/**
 * GET /items/{itemId}
 */
export function createGetItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.items)[':itemId']['$get']>,
      Error,
      InferResponseType<(typeof client.items)[':itemId']['$get']>,
      readonly ['/items/:itemId', InferRequestType<(typeof client.items)[':itemId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetItemsItemIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.items[':itemId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /items/{itemId}
 */
export function getGetItemsItemIdQueryKey(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
) {
  return ['/items/:itemId', args] as const
}

/**
 * DELETE /items/{itemId}
 */
export function createDeleteItemsItemId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.items)[':itemId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.items)[':itemId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.items)[':itemId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.items)[':itemId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.items[':itemId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

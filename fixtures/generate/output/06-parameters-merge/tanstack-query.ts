import { useQuery, useMutation, queryOptions, mutationOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates TanStack Query cache key for GET /items/{itemId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetItemsItemIdQueryKey(args: Parameters<typeof getItemsItemId>[0]) {
  return ['items', 'GET', '/items/:itemId', args] as const
}

/**
 * GET /items/{itemId}
 */
export async function getItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items[':itemId'].$get(args, options))
}

/**
 * Returns TanStack Query query options for GET /items/{itemId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetItemsItemIdQueryOptions(
  args: Parameters<typeof getItemsItemId>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetItemsItemIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItemsItemId(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /items/{itemId}
 */
export function useGetItemsItemId(
  args: Parameters<typeof getItemsItemId>[0],
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getItemsItemId>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetItemsItemIdQueryOptions(args, clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query mutation key for PUT /items/{itemId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutItemsItemIdMutationKey() {
  return ['items', 'PUT', '/items/:itemId'] as const
}

/**
 * PUT /items/{itemId}
 */
export async function putItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items[':itemId'].$put(args, options))
}

/**
 * Returns TanStack Query mutation options for PUT /items/{itemId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutItemsItemIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPutItemsItemIdMutationKey(),
    async mutationFn(args: Parameters<typeof putItemsItemId>[0]) {
      return putItemsItemId(args, clientOptions)
    },
  })
}

/**
 * PUT /items/{itemId}
 */
export function usePutItemsItemId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putItemsItemId>>,
    Error,
    Parameters<typeof putItemsItemId>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPutItemsItemIdMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query mutation key for DELETE /items/{itemId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteItemsItemIdMutationKey() {
  return ['items', 'DELETE', '/items/:itemId'] as const
}

/**
 * DELETE /items/{itemId}
 */
export async function deleteItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items[':itemId'].$delete(args, options))
}

/**
 * Returns TanStack Query mutation options for DELETE /items/{itemId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeleteItemsItemIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getDeleteItemsItemIdMutationKey(),
    async mutationFn(args: Parameters<typeof deleteItemsItemId>[0]) {
      return deleteItemsItemId(args, clientOptions)
    },
  })
}

/**
 * DELETE /items/{itemId}
 */
export function useDeleteItemsItemId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteItemsItemId>> | undefined,
    Error,
    Parameters<typeof deleteItemsItemId>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getDeleteItemsItemIdMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query cache key for GET /items
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetItemsQueryKey(args: Parameters<typeof getItems>[0]) {
  return ['items', 'GET', '/items', args] as const
}

/**
 * GET /items
 */
export async function getItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items.$get(args, options))
}

/**
 * Returns TanStack Query query options for GET /items
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetItemsQueryOptions(
  args: Parameters<typeof getItems>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /items
 */
export function useGetItems(
  args: Parameters<typeof getItems>[0],
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetItemsQueryOptions(args, clientOptions), ...queryOpts })
}

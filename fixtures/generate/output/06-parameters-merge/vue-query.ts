import { useQuery, useInfiniteQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query cache key for GET /items/{itemId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetItemsItemIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
) {
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
 * Returns Vue Query query options for GET /items/{itemId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetItemsItemIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetItemsItemIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItemsItemId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /items/{itemId}
 */
export function useGetItemsItemId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getItemsItemId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetItemsItemIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /items/{itemId}
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetItemsItemIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
) {
  return ['items', 'GET', '/items/:itemId', args, 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /items/{itemId}
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetItemsItemIdInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetItemsItemIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItemsItemId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /items/{itemId}
 */
export function useInfiniteGetItemsItemId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getItemsItemId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetItemsItemIdInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query mutation key for PUT /items/{itemId}
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
 * Returns Vue Query mutation options for PUT /items/{itemId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutItemsItemIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPutItemsItemIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.items)[':itemId']['$put']>) {
      return putItemsItemId(args, options)
    },
  }
}

/**
 * PUT /items/{itemId}
 */
export function usePutItemsItemId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putItemsItemId>>,
    Error,
    InferRequestType<(typeof client.items)[':itemId']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPutItemsItemIdMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates Vue Query mutation key for DELETE /items/{itemId}
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
 * Returns Vue Query mutation options for DELETE /items/{itemId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getDeleteItemsItemIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getDeleteItemsItemIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.items)[':itemId']['$delete']>) {
      return deleteItemsItemId(args, options)
    },
  }
}

/**
 * DELETE /items/{itemId}
 */
export function useDeleteItemsItemId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteItemsItemId>> | undefined,
    Error,
    InferRequestType<(typeof client.items)[':itemId']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getDeleteItemsItemIdMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates Vue Query cache key for GET /items
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetItemsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
) {
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
 * Returns Vue Query query options for GET /items
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetItemsQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /items
 */
export function useGetItems(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetItemsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /items
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetItemsInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
) {
  return ['items', 'GET', '/items', args, 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /items
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetItemsInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetItemsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /items
 */
export function useInfiniteGetItems(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetItemsInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

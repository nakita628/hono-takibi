import type { QueryFunctionContext, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { MaybeRef } from 'vue'
import { unref } from 'vue'
import { client } from '../clients/03-parameters-responses'

/**
 * Generates Vue Query cache key for GET /items
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetItemsQueryKey(args: MaybeRef<InferRequestType<typeof client.items.$get>>) {
  return ['items', 'GET', '/items', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /items
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetItemsQueryOptions = (
  args: InferRequestType<typeof client.items.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetItemsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.items.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /items
 */
export function useGetItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>>,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetItemsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /items/{itemId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetItemsItemIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
) {
  return ['items', 'GET', '/items/:itemId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /items/{itemId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetItemsItemIdQueryOptions = (
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetItemsItemIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.items[':itemId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /items/{itemId}
 */
export function useGetItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.items)[':itemId']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetItemsItemIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /items/{itemId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteItemsItemIdMutationKey() {
  return ['items', 'DELETE', '/items/:itemId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /items/{itemId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteItemsItemIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteItemsItemIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.items)[':itemId']['$delete']>) =>
    parseResponse(client.items[':itemId'].$delete(args, clientOptions)),
})

/**
 * DELETE /items/{itemId}
 */
export function useDeleteItemsItemId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.items)[':itemId']['$delete']>>>
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.items)[':itemId']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteItemsItemIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

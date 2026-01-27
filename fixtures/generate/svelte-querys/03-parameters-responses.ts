import type {
  CreateMutationOptions,
  CreateQueryOptions,
  QueryFunctionContext,
} from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/03-parameters-responses'

/**
 * Generates Svelte Query cache key for GET /items
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetItemsQueryKey(args: InferRequestType<typeof client.items.$get>) {
  return ['items', 'GET', '/items', args] as const
}

/**
 * Returns Svelte Query query options for GET /items
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
export function createGetItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetItemsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /items/{itemId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetItemsItemIdQueryKey(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
) {
  return ['items', 'GET', '/items/:itemId', args] as const
}

/**
 * Returns Svelte Query query options for GET /items/{itemId}
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
export function createGetItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.items)[':itemId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetItemsItemIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /items/{itemId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteItemsItemIdMutationKey() {
  return ['items', 'DELETE', '/items/:itemId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /items/{itemId}
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
export function createDeleteItemsItemId(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.items)[':itemId']['$delete']>>>
          >
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.items)[':itemId']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteItemsItemIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

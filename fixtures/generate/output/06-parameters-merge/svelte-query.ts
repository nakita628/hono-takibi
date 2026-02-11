import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

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
export function getGetItemsItemIdQueryOptions(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetItemsItemIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.items[':itemId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

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
 * Generates Svelte Query mutation key for PUT /items/{itemId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutItemsItemIdMutationKey() {
  return ['items', 'PUT', '/items/:itemId'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /items/{itemId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutItemsItemIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPutItemsItemIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.items)[':itemId']['$put']>) {
      return parseResponse(client.items[':itemId'].$put(args, clientOptions))
    },
  }
}

/**
 * PUT /items/{itemId}
 */
export function createPutItemsItemId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.items)[':itemId']['$put']>>>
        >
      >,
      Error,
      InferRequestType<(typeof client.items)[':itemId']['$put']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutItemsItemIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
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
export function getDeleteItemsItemIdMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getDeleteItemsItemIdMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client.items)[':itemId']['$delete']>) {
      return parseResponse(client.items[':itemId'].$delete(args, clientOptions))
    },
  }
}

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
export function getGetItemsQueryOptions(
  args: InferRequestType<typeof client.items.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.items.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
  }
}

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

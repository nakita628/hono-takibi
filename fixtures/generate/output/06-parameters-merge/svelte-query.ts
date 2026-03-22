import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/** Key prefix for /items */
export function getItemsKey() {
  return ['items'] as const
}

/** GET /items/{itemId} query key */
export function getItemsItemIdQueryKey(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
) {
  const { header: _, ...keyArgs } = args
  return ['items', '/items/:itemId', keyArgs] as const
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
 * GET /items/{itemId} query options
 */
export function getItemsItemIdQueryOptions(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getItemsItemIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItemsItemId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /items/{itemId}
 */
export function createItemsItemId(
  args: () => InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getItemsItemId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getItemsItemIdQueryOptions(args(), clientOptions), ...query }
  })
}

/** GET /items/{itemId} infinite query key */
export function getItemsItemIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
) {
  const { header: _, ...keyArgs } = args
  return ['items', '/items/:itemId', keyArgs, 'infinite'] as const
}

/**
 * GET /items/{itemId} infinite query options
 */
export function getItemsItemIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getItemsItemIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItemsItemId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /items/{itemId}
 */
export function createInfiniteItemsItemId(
  args: () => InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getItemsItemId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getItemsItemIdInfiniteQueryOptions(args(), clientOptions), ...query }
  })
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

/** PUT /items/{itemId} */
export function getPutItemsItemIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['items', '/items/:itemId'] as const,
    async mutationFn(args: InferRequestType<(typeof client.items)[':itemId']['$put']>) {
      return putItemsItemId(args, options)
    },
  }
}

/**
 * PUT /items/{itemId}
 */
export function createPutItemsItemId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putItemsItemId>>,
      Error,
      InferRequestType<(typeof client.items)[':itemId']['$put']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPutItemsItemIdMutationOptions(clientOptions), ...mutation }
  })
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

/** DELETE /items/{itemId} */
export function getDeleteItemsItemIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['items', '/items/:itemId'] as const,
    async mutationFn(args: InferRequestType<(typeof client.items)[':itemId']['$delete']>) {
      return deleteItemsItemId(args, options)
    },
  }
}

/**
 * DELETE /items/{itemId}
 */
export function createDeleteItemsItemId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof deleteItemsItemId>> | undefined,
      Error,
      InferRequestType<(typeof client.items)[':itemId']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getDeleteItemsItemIdMutationOptions(clientOptions), ...mutation }
  })
}

/** GET /items query key */
export function getItemsQueryKey(args: InferRequestType<typeof client.items.$get>) {
  return ['items', '/items', args] as const
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
 * GET /items query options
 */
export function getItemsQueryOptions(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /items
 */
export function createItems(
  args: () => InferRequestType<typeof client.items.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getItemsQueryOptions(args(), clientOptions), ...query }
  })
}

/** GET /items infinite query key */
export function getItemsInfiniteQueryKey(args: InferRequestType<typeof client.items.$get>) {
  return ['items', '/items', args, 'infinite'] as const
}

/**
 * GET /items infinite query options
 */
export function getItemsInfiniteQueryOptions(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getItemsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /items
 */
export function createInfiniteItems(
  args: () => InferRequestType<typeof client.items.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getItemsInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

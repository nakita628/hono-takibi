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

/** Key prefix for /items */
export function getItemsKey() {
  return ['items'] as const
}

/** GET /items/{itemId} query key */
export function getItemsItemIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
) {
  const { header: _, ...keyArgs } = toValue(args)
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
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getItemsItemIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItemsItemId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /items/{itemId}
 */
export function useItemsItemId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getItemsItemId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getItemsItemIdQueryOptions(args, clientOptions), ...queryOptions })
}

/** GET /items/{itemId} infinite query key */
export function getItemsItemIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
) {
  const { header: _, ...keyArgs } = toValue(args)
  return ['items', '/items/:itemId', keyArgs, 'infinite'] as const
}

/**
 * GET /items/{itemId} infinite query options
 */
export function getItemsItemIdInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getItemsItemIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItemsItemId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /items/{itemId}
 */
export function useInfiniteItemsItemId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getItemsItemId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getItemsItemIdInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
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

/** GET /items query key */
export function getItemsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
) {
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
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /items
 */
export function useItems(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getItemsQueryOptions(args, clientOptions), ...queryOptions })
}

/** GET /items infinite query key */
export function getItemsInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
) {
  return ['items', '/items', args, 'infinite'] as const
}

/**
 * GET /items infinite query options
 */
export function getItemsInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getItemsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /items
 */
export function useInfiniteItems(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getItemsInfiniteQueryOptions(args, clientOptions), ...queryOptions })
}

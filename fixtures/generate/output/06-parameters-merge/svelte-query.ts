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

export function getItemsKey() {
  return ['items'] as const
}

export function getItemsItemIdQueryKey(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
) {
  const { header: _, ...keyArgs } = args
  return ['items', '/items/:itemId', keyArgs] as const
}

export async function getItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items[':itemId'].$get(args, options))
}

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

export function createItemsItemId<TData = Awaited<ReturnType<typeof getItemsItemId>>>(
  args: () => InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getItemsItemId>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getItemsItemIdQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getItemsItemId(args(), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        })
      },
    }
  })
}

export function getItemsItemIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
) {
  const { header: _, ...keyArgs } = args
  return ['items', '/items/:itemId', keyArgs, 'infinite'] as const
}

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

export function createInfiniteItemsItemId(
  args: () => InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getItemsItemId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getItemsItemIdInfiniteQueryOptions(args(), clientOptions) }
  })
}

export async function putItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items[':itemId'].$put(args, options))
}

export function getPutItemsItemIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['items', '/items/:itemId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.items)[':itemId']['$put']>) {
      return putItemsItemId(args, options)
    },
  }
}

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

export async function deleteItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items[':itemId'].$delete(args, options))
}

export function getDeleteItemsItemIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['items', '/items/:itemId', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.items)[':itemId']['$delete']>) {
      return deleteItemsItemId(args, options)
    },
  }
}

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

export function getItemsQueryKey(args: InferRequestType<typeof client.items.$get>) {
  return ['items', '/items', args] as const
}

export async function getItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items.$get(args, options))
}

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

export function createItems<TData = Awaited<ReturnType<typeof getItems>>>(
  args: () => InferRequestType<typeof client.items.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getItems>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getItemsQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getItems(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getItemsInfiniteQueryKey(args: InferRequestType<typeof client.items.$get>) {
  return ['items', '/items', args, 'infinite'] as const
}

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

export function createInfiniteItems(
  args: () => InferRequestType<typeof client.items.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getItemsInfiniteQueryOptions(args(), clientOptions) }
  })
}

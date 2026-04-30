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

export function getItemsKey() {
  return ['items'] as const
}

export function getItemsItemIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
) {
  const { header: _, ...keyArgs } = toValue(args)
  return ['items', '/items/:itemId', keyArgs] as const
}

export async function getItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items[':itemId'].$get(args, options))
}

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

export function useItemsItemId<TData = Awaited<ReturnType<typeof getItemsItemId>>>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getItemsItemId>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getItemsItemIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItemsItemId(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export function getItemsItemIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
) {
  const { header: _, ...keyArgs } = toValue(args)
  return ['items', '/items/:itemId', keyArgs, 'infinite'] as const
}

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

export function useInfiniteItemsItemId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getItemsItemId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getItemsItemIdInfiniteQueryOptions(args, clientOptions),
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

export function useDeleteItemsItemId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteItemsItemId>>  ,
    Error,
    InferRequestType<(typeof client.items)[':itemId']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getDeleteItemsItemIdMutationOptions(clientOptions), ...mutationOptions })
}

export function getItemsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
) {
  return ['items', '/items', args] as const
}

export async function getItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items.$get(args, options))
}

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

export function useItems<TData = Awaited<ReturnType<typeof getItems>>>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getItems>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems(toValue(args), { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getItemsInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
) {
  return ['items', '/items', args, 'infinite'] as const
}

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

export function useInfiniteItems(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getItemsInfiniteQueryOptions(args, clientOptions) })
}

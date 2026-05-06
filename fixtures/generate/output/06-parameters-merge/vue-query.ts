import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
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
  return {
    queryKey: getItemsItemIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getItemsItemIdQueryKey>>) {
      return getItemsItemId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useItemsItemId<
  TData = Awaited<ReturnType<typeof getItemsItemId>>,
  TError = unknown,
>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.items)[':itemId']['$get']>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getItemsItemId>>,
      TError,
      TData,
      Awaited<ReturnType<typeof getItemsItemId>>,
      ReturnType<typeof getItemsItemIdQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getItemsItemIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getItemsItemIdQueryKey>>) {
      return getItemsItemId(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export async function putItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items[':itemId'].$put(args, options))
}

export function getPutItemsItemIdMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['items', '/items/:itemId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.items)[':itemId']['$put']>) {
      return putItemsItemId(args, options)
    },
  }
}

export function usePutItemsItemId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putItemsItemId>>,
    TError,
    InferRequestType<(typeof client.items)[':itemId']['$put']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPutItemsItemIdMutationOptions<TError>(clientOptions),
  })
}

export async function deleteItemsItemId(
  args: InferRequestType<(typeof client.items)[':itemId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.items[':itemId'].$delete(args, options))
}

export function getDeleteItemsItemIdMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['items', '/items/:itemId', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.items)[':itemId']['$delete']>) {
      return deleteItemsItemId(args, options)
    },
  }
}

export function useDeleteItemsItemId<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteItemsItemId>> | undefined,
    TError,
    InferRequestType<(typeof client.items)[':itemId']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getDeleteItemsItemIdMutationOptions<TError>(clientOptions),
  })
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
  return {
    queryKey: getItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getItemsQueryKey>>) {
      return getItems(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useItems<TData = Awaited<ReturnType<typeof getItems>>, TError = unknown>(
  args: MaybeRefOrGetter<InferRequestType<typeof client.items.$get>>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getItems>>,
      TError,
      TData,
      Awaited<ReturnType<typeof getItems>>,
      ReturnType<typeof getItemsQueryKey>
    >
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getItemsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getItemsQueryKey>>) {
      return getItems(toValue(args), { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

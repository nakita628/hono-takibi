import { injectQuery, injectMutation, queryOptions } from '@tanstack/angular-query-experimental'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/angular-query-experimental'
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

export function getItemsItemIdQueryOptions(
  args: InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getItemsItemIdQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.items[':itemId'].$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function injectItemsItemId<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.items)[':itemId']['$get']>>>>
  >,
  TError = unknown,
>(
  args: () => InferRequestType<(typeof client.items)[':itemId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.items)[':itemId']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getItemsItemIdQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.items[':itemId'].$get(args(), {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getPutItemsItemIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['items', '/items/:itemId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.items)[':itemId']['$put']>) {
      return parseResponse(client.items[':itemId'].$put(args, options))
    },
  }
}

export function injectPutItemsItemId<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.items)[':itemId']['$put']>>>
        >
      >,
      TError,
      InferRequestType<(typeof client.items)[':itemId']['$put']>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPutItemsItemIdMutationOptions(clientOptions) }
  })
}

export function getDeleteItemsItemIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['items', '/items/:itemId', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.items)[':itemId']['$delete']>) {
      return parseResponse(client.items[':itemId'].$delete(args, options))
    },
  }
}

export function injectDeleteItemsItemId<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.items)[':itemId']['$delete']>>>
          >
        >
      | undefined,
      TError,
      InferRequestType<(typeof client.items)[':itemId']['$delete']>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getDeleteItemsItemIdMutationOptions(clientOptions) }
  })
}

export function getItemsQueryKey(args: InferRequestType<typeof client.items.$get>) {
  return ['items', '/items', args] as const
}

export function getItemsQueryOptions(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getItemsQueryKey(args),
    queryFn({ signal }) {
      return parseResponse(
        client.items.$get(args, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function injectItems<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>>,
  TError = unknown,
>(
  args: () => InferRequestType<typeof client.items.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.items.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getItemsQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.items.$get(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } }),
        )
      },
    }
  })
}

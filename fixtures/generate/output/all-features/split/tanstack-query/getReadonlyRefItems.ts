import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getReadonlyRefItemsQueryKey() {
  return ['readonlyRef', '/readonlyRef/items'] as const
}

export function getReadonlyRefItemsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getReadonlyRefItemsQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.readonlyRef.items.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useReadonlyRefItems<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.items.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.items.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getReadonlyRefItemsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.readonlyRef.items.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseReadonlyRefItems<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.items.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.readonlyRef.items.$get>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getReadonlyRefItemsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.readonlyRef.items.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

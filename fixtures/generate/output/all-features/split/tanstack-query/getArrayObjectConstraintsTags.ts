import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getArrayObjectConstraintsTagsQueryKey() {
  return ['arrayObjectConstraints', '/arrayObjectConstraints/tags'] as const
}

export function getArrayObjectConstraintsTagsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getArrayObjectConstraintsTagsQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.arrayObjectConstraints.tags.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useArrayObjectConstraintsTags<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.tags.$get>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.tags.$get>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getArrayObjectConstraintsTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.arrayObjectConstraints.tags.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseArrayObjectConstraintsTags<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.tags.$get>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.arrayObjectConstraints.tags.$get>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getArrayObjectConstraintsTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.arrayObjectConstraints.tags.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

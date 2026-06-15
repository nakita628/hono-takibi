import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getComplexSchemasNestedCircularQueryKey() {
  return ['complexSchemas', '/complexSchemas/nested-circular'] as const
}

export function getComplexSchemasNestedCircularQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getComplexSchemasNestedCircularQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.complexSchemas['nested-circular'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useComplexSchemasNestedCircular<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.complexSchemas)['nested-circular']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.complexSchemas)['nested-circular']['$get']>>
        >
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
    queryKey: getComplexSchemasNestedCircularQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.complexSchemas['nested-circular'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComplexSchemasNestedCircular<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.complexSchemas)['nested-circular']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.complexSchemas)['nested-circular']['$get']>>
        >
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
    queryKey: getComplexSchemasNestedCircularQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.complexSchemas['nested-circular'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

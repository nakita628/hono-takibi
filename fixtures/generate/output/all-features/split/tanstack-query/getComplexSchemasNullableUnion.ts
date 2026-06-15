import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getComplexSchemasNullableUnionQueryKey() {
  return ['complexSchemas', '/complexSchemas/nullable-union'] as const
}

export function getComplexSchemasNullableUnionQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getComplexSchemasNullableUnionQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.complexSchemas['nullable-union'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useComplexSchemasNullableUnion<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.complexSchemas)['nullable-union']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.complexSchemas)['nullable-union']['$get']>>
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
    queryKey: getComplexSchemasNullableUnionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.complexSchemas['nullable-union'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseComplexSchemasNullableUnion<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.complexSchemas)['nullable-union']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.complexSchemas)['nullable-union']['$get']>>
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
    queryKey: getComplexSchemasNullableUnionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.complexSchemas['nullable-union'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

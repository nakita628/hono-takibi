import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getSchemaEdgeCasesComposedQueryKey() {
  return ['schemaEdgeCases', '/schemaEdgeCases/composed'] as const
}

export function getSchemaEdgeCasesComposedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getSchemaEdgeCasesComposedQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.schemaEdgeCases.composed.$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useSchemaEdgeCasesComposed<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.composed.$get>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.composed.$get>>>
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
    queryKey: getSchemaEdgeCasesComposedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.schemaEdgeCases.composed.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseSchemaEdgeCasesComposed<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.composed.$get>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.schemaEdgeCases.composed.$get>>>
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
    queryKey: getSchemaEdgeCasesComposedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.schemaEdgeCases.composed.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

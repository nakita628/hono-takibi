import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getSchemaEdgeCasesAdditionalPropsQueryKey() {
  return ['schemaEdgeCases', '/schemaEdgeCases/additional-props'] as const
}

export function getSchemaEdgeCasesAdditionalPropsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getSchemaEdgeCasesAdditionalPropsQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.schemaEdgeCases['additional-props'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useSchemaEdgeCasesAdditionalProps<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.schemaEdgeCases)['additional-props']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.schemaEdgeCases)['additional-props']['$get']>>
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
    queryKey: getSchemaEdgeCasesAdditionalPropsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.schemaEdgeCases['additional-props'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseSchemaEdgeCasesAdditionalProps<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.schemaEdgeCases)['additional-props']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.schemaEdgeCases)['additional-props']['$get']>>
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
    queryKey: getSchemaEdgeCasesAdditionalPropsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.schemaEdgeCases['additional-props'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

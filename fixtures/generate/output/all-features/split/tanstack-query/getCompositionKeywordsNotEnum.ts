import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getCompositionKeywordsNotEnumQueryKey() {
  return ['compositionKeywords', '/compositionKeywords/not-enum'] as const
}

export function getCompositionKeywordsNotEnumQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCompositionKeywordsNotEnumQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.compositionKeywords['not-enum'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCompositionKeywordsNotEnum<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['not-enum']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['not-enum']['$get']>>
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
    queryKey: getCompositionKeywordsNotEnumQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-enum'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCompositionKeywordsNotEnum<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['not-enum']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['not-enum']['$get']>>
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
    queryKey: getCompositionKeywordsNotEnumQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-enum'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getCompositionKeywordsNotRefQueryKey() {
  return ['compositionKeywords', '/compositionKeywords/not-ref'] as const
}

export function getCompositionKeywordsNotRefQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCompositionKeywordsNotRefQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.compositionKeywords['not-ref'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCompositionKeywordsNotRef<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['not-ref']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['not-ref']['$get']>>
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
    queryKey: getCompositionKeywordsNotRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-ref'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCompositionKeywordsNotRef<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['not-ref']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['not-ref']['$get']>>
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
    queryKey: getCompositionKeywordsNotRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['not-ref'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

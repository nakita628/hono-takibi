import { useQuery, useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getCompositionKeywordsAnyOfRefQueryKey() {
  return ['compositionKeywords', '/compositionKeywords/any-of-ref'] as const
}

export function getCompositionKeywordsAnyOfRefQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getCompositionKeywordsAnyOfRefQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.compositionKeywords['any-of-ref'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function useCompositionKeywordsAnyOfRef<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['any-of-ref']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['any-of-ref']['$get']>>
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
    queryKey: getCompositionKeywordsAnyOfRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['any-of-ref'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function useSuspenseCompositionKeywordsAnyOfRef<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<
        Awaited<ReturnType<(typeof client.compositionKeywords)['any-of-ref']['$get']>>
      >
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['any-of-ref']['$get']>>
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
    queryKey: getCompositionKeywordsAnyOfRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.compositionKeywords['any-of-ref'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

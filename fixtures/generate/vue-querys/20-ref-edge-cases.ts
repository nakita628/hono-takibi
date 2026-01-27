import { queryOptions, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/20-ref-edge-cases'

/**
 * GET /test
 */
export function useGetTest(
  args: InferRequestType<typeof client.test.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetTestQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /test
 */
export function getGetTestQueryKey(args: InferRequestType<typeof client.test.$get>) {
  return ['/test', args] as const
}

/**
 * Returns Vue Query query options for GET /test
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTestQueryOptions = (
  args: InferRequestType<typeof client.test.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTestQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.test.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /empty-refs
 */
export function useGetEmptyRefs(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetEmptyRefsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /empty-refs
 */
export function getGetEmptyRefsQueryKey() {
  return ['/empty-refs'] as const
}

/**
 * Returns Vue Query query options for GET /empty-refs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEmptyRefsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetEmptyRefsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['empty-refs'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /unicode-refs
 */
export function useGetUnicodeRefs(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetUnicodeRefsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /unicode-refs
 */
export function getGetUnicodeRefsQueryKey() {
  return ['/unicode-refs'] as const
}

/**
 * Returns Vue Query query options for GET /unicode-refs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUnicodeRefsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetUnicodeRefsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['unicode-refs'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /special-chars
 */
export function useGetSpecialChars(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSpecialCharsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /special-chars
 */
export function getGetSpecialCharsQueryKey() {
  return ['/special-chars'] as const
}

/**
 * Returns Vue Query query options for GET /special-chars
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSpecialCharsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSpecialCharsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['special-chars'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /numeric-start
 */
export function useGetNumericStart(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetNumericStartQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /numeric-start
 */
export function getGetNumericStartQueryKey() {
  return ['/numeric-start'] as const
}

/**
 * Returns Vue Query query options for GET /numeric-start
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNumericStartQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetNumericStartQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['numeric-start'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /ref-in-allof
 */
export function useGetRefInAllof(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetRefInAllofQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /ref-in-allof
 */
export function getGetRefInAllofQueryKey() {
  return ['/ref-in-allof'] as const
}

/**
 * Returns Vue Query query options for GET /ref-in-allof
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetRefInAllofQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetRefInAllofQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['ref-in-allof'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /deeply-nested
 */
export function useGetDeeplyNested(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetDeeplyNestedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /deeply-nested
 */
export function getGetDeeplyNestedQueryKey() {
  return ['/deeply-nested'] as const
}

/**
 * Returns Vue Query query options for GET /deeply-nested
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDeeplyNestedQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetDeeplyNestedQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['deeply-nested'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /same-name-diff-context
 */
export function useGetSameNameDiffContext(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSameNameDiffContextQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /same-name-diff-context
 */
export function getGetSameNameDiffContextQueryKey() {
  return ['/same-name-diff-context'] as const
}

/**
 * Returns Vue Query query options for GET /same-name-diff-context
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSameNameDiffContextQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSameNameDiffContextQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['same-name-diff-context'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

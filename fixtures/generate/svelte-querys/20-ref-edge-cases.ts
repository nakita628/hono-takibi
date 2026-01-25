import { createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/20-ref-edge-cases'

/**
 * GET /test
 */
export function createGetTest(
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
  return createQuery({
    queryKey: getGetTestQueryKey(args),
    queryFn: async () => parseResponse(client.test.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /test
 */
export function getGetTestQueryKey(args: InferRequestType<typeof client.test.$get>) {
  return ['/test', args] as const
}

/**
 * Returns Svelte Query query options for GET /test
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetTestQueryOptions(
  args: InferRequestType<typeof client.test.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetTestQueryKey(args),
    queryFn: async () => parseResponse(client.test.$get(args, clientOptions)),
  }
}

/**
 * GET /empty-refs
 */
export function createGetEmptyRefs(options?: {
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
  return createQuery({
    queryKey: getGetEmptyRefsQueryKey(),
    queryFn: async () => parseResponse(client['empty-refs'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /empty-refs
 */
export function getGetEmptyRefsQueryKey() {
  return ['/empty-refs'] as const
}

/**
 * Returns Svelte Query query options for GET /empty-refs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetEmptyRefsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetEmptyRefsQueryKey(),
    queryFn: async () => parseResponse(client['empty-refs'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /unicode-refs
 */
export function createGetUnicodeRefs(options?: {
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
  return createQuery({
    queryKey: getGetUnicodeRefsQueryKey(),
    queryFn: async () => parseResponse(client['unicode-refs'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /unicode-refs
 */
export function getGetUnicodeRefsQueryKey() {
  return ['/unicode-refs'] as const
}

/**
 * Returns Svelte Query query options for GET /unicode-refs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUnicodeRefsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetUnicodeRefsQueryKey(),
    queryFn: async () => parseResponse(client['unicode-refs'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /special-chars
 */
export function createGetSpecialChars(options?: {
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
  return createQuery({
    queryKey: getGetSpecialCharsQueryKey(),
    queryFn: async () => parseResponse(client['special-chars'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /special-chars
 */
export function getGetSpecialCharsQueryKey() {
  return ['/special-chars'] as const
}

/**
 * Returns Svelte Query query options for GET /special-chars
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSpecialCharsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetSpecialCharsQueryKey(),
    queryFn: async () => parseResponse(client['special-chars'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /numeric-start
 */
export function createGetNumericStart(options?: {
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
  return createQuery({
    queryKey: getGetNumericStartQueryKey(),
    queryFn: async () => parseResponse(client['numeric-start'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /numeric-start
 */
export function getGetNumericStartQueryKey() {
  return ['/numeric-start'] as const
}

/**
 * Returns Svelte Query query options for GET /numeric-start
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNumericStartQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetNumericStartQueryKey(),
    queryFn: async () => parseResponse(client['numeric-start'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /ref-in-allof
 */
export function createGetRefInAllof(options?: {
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
  return createQuery({
    queryKey: getGetRefInAllofQueryKey(),
    queryFn: async () => parseResponse(client['ref-in-allof'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /ref-in-allof
 */
export function getGetRefInAllofQueryKey() {
  return ['/ref-in-allof'] as const
}

/**
 * Returns Svelte Query query options for GET /ref-in-allof
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetRefInAllofQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetRefInAllofQueryKey(),
    queryFn: async () => parseResponse(client['ref-in-allof'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /deeply-nested
 */
export function createGetDeeplyNested(options?: {
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
  return createQuery({
    queryKey: getGetDeeplyNestedQueryKey(),
    queryFn: async () => parseResponse(client['deeply-nested'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /deeply-nested
 */
export function getGetDeeplyNestedQueryKey() {
  return ['/deeply-nested'] as const
}

/**
 * Returns Svelte Query query options for GET /deeply-nested
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetDeeplyNestedQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetDeeplyNestedQueryKey(),
    queryFn: async () => parseResponse(client['deeply-nested'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /same-name-diff-context
 */
export function createGetSameNameDiffContext(options?: {
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
  return createQuery({
    queryKey: getGetSameNameDiffContextQueryKey(),
    queryFn: async () =>
      parseResponse(client['same-name-diff-context'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /same-name-diff-context
 */
export function getGetSameNameDiffContextQueryKey() {
  return ['/same-name-diff-context'] as const
}

/**
 * Returns Svelte Query query options for GET /same-name-diff-context
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSameNameDiffContextQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetSameNameDiffContextQueryKey(),
    queryFn: async () =>
      parseResponse(client['same-name-diff-context'].$get(undefined, clientOptions)),
  }
}

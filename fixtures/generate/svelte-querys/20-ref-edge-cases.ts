import { createQuery, queryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
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
      placeholderData?:
        | InferResponseType<typeof client.test.$get>
        | (() => InferResponseType<typeof client.test.$get>)
      initialData?:
        | InferResponseType<typeof client.test.$get>
        | (() => InferResponseType<typeof client.test.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetTestQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.test.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
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
    placeholderData?:
      | InferResponseType<(typeof client)['empty-refs']['$get']>
      | (() => InferResponseType<(typeof client)['empty-refs']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['empty-refs']['$get']>
      | (() => InferResponseType<(typeof client)['empty-refs']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetEmptyRefsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['empty-refs'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
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
    placeholderData?:
      | InferResponseType<(typeof client)['unicode-refs']['$get']>
      | (() => InferResponseType<(typeof client)['unicode-refs']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['unicode-refs']['$get']>
      | (() => InferResponseType<(typeof client)['unicode-refs']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUnicodeRefsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['unicode-refs'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
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
    placeholderData?:
      | InferResponseType<(typeof client)['special-chars']['$get']>
      | (() => InferResponseType<(typeof client)['special-chars']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['special-chars']['$get']>
      | (() => InferResponseType<(typeof client)['special-chars']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSpecialCharsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['special-chars'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
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
    placeholderData?:
      | InferResponseType<(typeof client)['numeric-start']['$get']>
      | (() => InferResponseType<(typeof client)['numeric-start']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['numeric-start']['$get']>
      | (() => InferResponseType<(typeof client)['numeric-start']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetNumericStartQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['numeric-start'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
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
    placeholderData?:
      | InferResponseType<(typeof client)['ref-in-allof']['$get']>
      | (() => InferResponseType<(typeof client)['ref-in-allof']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['ref-in-allof']['$get']>
      | (() => InferResponseType<(typeof client)['ref-in-allof']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetRefInAllofQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['ref-in-allof'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
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
    placeholderData?:
      | InferResponseType<(typeof client)['deeply-nested']['$get']>
      | (() => InferResponseType<(typeof client)['deeply-nested']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['deeply-nested']['$get']>
      | (() => InferResponseType<(typeof client)['deeply-nested']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetDeeplyNestedQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['deeply-nested'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
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
    placeholderData?:
      | InferResponseType<(typeof client)['same-name-diff-context']['$get']>
      | (() => InferResponseType<(typeof client)['same-name-diff-context']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['same-name-diff-context']['$get']>
      | (() => InferResponseType<(typeof client)['same-name-diff-context']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSameNameDiffContextQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['same-name-diff-context'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
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

import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/20-ref-edge-cases'

/**
 * Generates Vue Query cache key for GET /test
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetTestQueryKey(args: MaybeRef<InferRequestType<typeof client.test.$get>>) {
  return ['test', '/test', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /test
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTestQueryOptions = (
  args: InferRequestType<typeof client.test.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTestQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.test.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /test
 */
export function useGetTest(
  args: InferRequestType<typeof client.test.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.test.$get>>>>>,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTestQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /empty-refs
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetEmptyRefsQueryKey() {
  return ['empty-refs', '/empty-refs'] as const
}

/**
 * Returns Vue Query query options for GET /empty-refs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEmptyRefsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetEmptyRefsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['empty-refs'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /empty-refs
 */
export function useGetEmptyRefs(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['empty-refs']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetEmptyRefsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /unicode-refs
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetUnicodeRefsQueryKey() {
  return ['unicode-refs', '/unicode-refs'] as const
}

/**
 * Returns Vue Query query options for GET /unicode-refs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUnicodeRefsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetUnicodeRefsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['unicode-refs'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /unicode-refs
 */
export function useGetUnicodeRefs(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['unicode-refs']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUnicodeRefsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /special-chars
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSpecialCharsQueryKey() {
  return ['special-chars', '/special-chars'] as const
}

/**
 * Returns Vue Query query options for GET /special-chars
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSpecialCharsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSpecialCharsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['special-chars'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /special-chars
 */
export function useGetSpecialChars(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['special-chars']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSpecialCharsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /numeric-start
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetNumericStartQueryKey() {
  return ['numeric-start', '/numeric-start'] as const
}

/**
 * Returns Vue Query query options for GET /numeric-start
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNumericStartQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetNumericStartQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['numeric-start'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /numeric-start
 */
export function useGetNumericStart(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['numeric-start']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetNumericStartQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /ref-in-allof
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetRefInAllofQueryKey() {
  return ['ref-in-allof', '/ref-in-allof'] as const
}

/**
 * Returns Vue Query query options for GET /ref-in-allof
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetRefInAllofQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetRefInAllofQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['ref-in-allof'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /ref-in-allof
 */
export function useGetRefInAllof(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['ref-in-allof']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetRefInAllofQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /deeply-nested
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetDeeplyNestedQueryKey() {
  return ['deeply-nested', '/deeply-nested'] as const
}

/**
 * Returns Vue Query query options for GET /deeply-nested
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDeeplyNestedQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetDeeplyNestedQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['deeply-nested'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /deeply-nested
 */
export function useGetDeeplyNested(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['deeply-nested']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetDeeplyNestedQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /same-name-diff-context
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSameNameDiffContextQueryKey() {
  return ['same-name-diff-context', '/same-name-diff-context'] as const
}

/**
 * Returns Vue Query query options for GET /same-name-diff-context
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSameNameDiffContextQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSameNameDiffContextQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['same-name-diff-context'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /same-name-diff-context
 */
export function useGetSameNameDiffContext(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['same-name-diff-context']['$get']>>
            >
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSameNameDiffContextQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

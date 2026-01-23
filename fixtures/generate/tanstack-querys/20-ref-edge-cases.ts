import { useQuery } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/20-ref-edge-cases'

/**
 * GET /test
 */
export function useGetTest(
  args: InferRequestType<typeof client.test.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.test.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTestQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.test.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /test
 */
export function getGetTestQueryKey(args: InferRequestType<typeof client.test.$get>) {
  return ['GET', '/test', args] as const
}

/**
 * GET /empty-refs
 */
export function useGetEmptyRefs(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['empty-refs']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEmptyRefsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['empty-refs'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /empty-refs
 */
export function getGetEmptyRefsQueryKey() {
  return ['GET', '/empty-refs'] as const
}

/**
 * GET /unicode-refs
 */
export function useGetUnicodeRefs(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['unicode-refs']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUnicodeRefsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['unicode-refs'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /unicode-refs
 */
export function getGetUnicodeRefsQueryKey() {
  return ['GET', '/unicode-refs'] as const
}

/**
 * GET /special-chars
 */
export function useGetSpecialChars(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['special-chars']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSpecialCharsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['special-chars'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /special-chars
 */
export function getGetSpecialCharsQueryKey() {
  return ['GET', '/special-chars'] as const
}

/**
 * GET /numeric-start
 */
export function useGetNumericStart(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['numeric-start']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNumericStartQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['numeric-start'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /numeric-start
 */
export function getGetNumericStartQueryKey() {
  return ['GET', '/numeric-start'] as const
}

/**
 * GET /ref-in-allof
 */
export function useGetRefInAllof(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['ref-in-allof']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetRefInAllofQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['ref-in-allof'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /ref-in-allof
 */
export function getGetRefInAllofQueryKey() {
  return ['GET', '/ref-in-allof'] as const
}

/**
 * GET /deeply-nested
 */
export function useGetDeeplyNested(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['deeply-nested']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDeeplyNestedQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['deeply-nested'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /deeply-nested
 */
export function getGetDeeplyNestedQueryKey() {
  return ['GET', '/deeply-nested'] as const
}

/**
 * GET /same-name-diff-context
 */
export function useGetSameNameDiffContext(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['same-name-diff-context']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSameNameDiffContextQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client['same-name-diff-context'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /same-name-diff-context
 */
export function getGetSameNameDiffContextQueryKey() {
  return ['GET', '/same-name-diff-context'] as const
}

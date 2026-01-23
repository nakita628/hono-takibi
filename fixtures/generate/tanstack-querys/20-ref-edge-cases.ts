import type { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/20-ref-edge-cases'

/**
 * GET /test
 */
export function useGetTest(
  args: InferRequestType<typeof client.test.$get>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.test.$get>,
      Error,
      InferResponseType<typeof client.test.$get>,
      readonly ['/test', InferRequestType<typeof client.test.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTestQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.test.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /test
 */
export function getGetTestQueryKey(args: InferRequestType<typeof client.test.$get>) {
  return ['/test', args] as const
}

/**
 * GET /empty-refs
 */
export function useGetEmptyRefs(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['empty-refs']['$get']>,
      Error,
      InferResponseType<(typeof client)['empty-refs']['$get']>,
      readonly ['/empty-refs']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEmptyRefsQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['empty-refs'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /empty-refs
 */
export function getGetEmptyRefsQueryKey() {
  return ['/empty-refs'] as const
}

/**
 * GET /unicode-refs
 */
export function useGetUnicodeRefs(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['unicode-refs']['$get']>,
      Error,
      InferResponseType<(typeof client)['unicode-refs']['$get']>,
      readonly ['/unicode-refs']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUnicodeRefsQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['unicode-refs'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /unicode-refs
 */
export function getGetUnicodeRefsQueryKey() {
  return ['/unicode-refs'] as const
}

/**
 * GET /special-chars
 */
export function useGetSpecialChars(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['special-chars']['$get']>,
      Error,
      InferResponseType<(typeof client)['special-chars']['$get']>,
      readonly ['/special-chars']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSpecialCharsQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['special-chars'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /special-chars
 */
export function getGetSpecialCharsQueryKey() {
  return ['/special-chars'] as const
}

/**
 * GET /numeric-start
 */
export function useGetNumericStart(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['numeric-start']['$get']>,
      Error,
      InferResponseType<(typeof client)['numeric-start']['$get']>,
      readonly ['/numeric-start']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNumericStartQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['numeric-start'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /numeric-start
 */
export function getGetNumericStartQueryKey() {
  return ['/numeric-start'] as const
}

/**
 * GET /ref-in-allof
 */
export function useGetRefInAllof(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['ref-in-allof']['$get']>,
      Error,
      InferResponseType<(typeof client)['ref-in-allof']['$get']>,
      readonly ['/ref-in-allof']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetRefInAllofQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['ref-in-allof'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /ref-in-allof
 */
export function getGetRefInAllofQueryKey() {
  return ['/ref-in-allof'] as const
}

/**
 * GET /deeply-nested
 */
export function useGetDeeplyNested(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['deeply-nested']['$get']>,
      Error,
      InferResponseType<(typeof client)['deeply-nested']['$get']>,
      readonly ['/deeply-nested']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDeeplyNestedQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['deeply-nested'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /deeply-nested
 */
export function getGetDeeplyNestedQueryKey() {
  return ['/deeply-nested'] as const
}

/**
 * GET /same-name-diff-context
 */
export function useGetSameNameDiffContext(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['same-name-diff-context']['$get']>,
      Error,
      InferResponseType<(typeof client)['same-name-diff-context']['$get']>,
      readonly ['/same-name-diff-context']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSameNameDiffContextQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['same-name-diff-context'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /same-name-diff-context
 */
export function getGetSameNameDiffContextQueryKey() {
  return ['/same-name-diff-context'] as const
}

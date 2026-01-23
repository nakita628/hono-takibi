import type { CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/20-ref-edge-cases'

/**
 * GET /test
 */
export function createGetTest(
  args: InferRequestType<typeof client.test.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.test.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTestQueryKey(args)
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /test
 */
export function getGetTestQueryKey(args?: InferRequestType<typeof client.test.$get>) {
  return ['/test', ...(args ? [args] : [])] as const
}

/**
 * GET /empty-refs
 */
export function createGetEmptyRefs(
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client)['empty-refs']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEmptyRefsQueryKey()
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /empty-refs
 */
export function getGetEmptyRefsQueryKey() {
  return ['/empty-refs'] as const
}

/**
 * GET /unicode-refs
 */
export function createGetUnicodeRefs(
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client)['unicode-refs']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUnicodeRefsQueryKey()
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /unicode-refs
 */
export function getGetUnicodeRefsQueryKey() {
  return ['/unicode-refs'] as const
}

/**
 * GET /special-chars
 */
export function createGetSpecialChars(
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client)['special-chars']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSpecialCharsQueryKey()
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /special-chars
 */
export function getGetSpecialCharsQueryKey() {
  return ['/special-chars'] as const
}

/**
 * GET /numeric-start
 */
export function createGetNumericStart(
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client)['numeric-start']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetNumericStartQueryKey()
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /numeric-start
 */
export function getGetNumericStartQueryKey() {
  return ['/numeric-start'] as const
}

/**
 * GET /ref-in-allof
 */
export function createGetRefInAllof(
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client)['ref-in-allof']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetRefInAllofQueryKey()
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /ref-in-allof
 */
export function getGetRefInAllofQueryKey() {
  return ['/ref-in-allof'] as const
}

/**
 * GET /deeply-nested
 */
export function createGetDeeplyNested(
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client)['deeply-nested']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDeeplyNestedQueryKey()
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /deeply-nested
 */
export function getGetDeeplyNestedQueryKey() {
  return ['/deeply-nested'] as const
}

/**
 * GET /same-name-diff-context
 */
export function createGetSameNameDiffContext(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['same-name-diff-context']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSameNameDiffContextQueryKey()
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /same-name-diff-context
 */
export function getGetSameNameDiffContextQueryKey() {
  return ['/same-name-diff-context'] as const
}

import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/20-ref-edge-cases'

/**
 * GET /test
 */
export function useGetTest(
  args: InferRequestType<typeof client.test.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.test.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/test', args] as const) : null
  return useSWR<InferResponseType<typeof client.test.$get>, Error>(
    key,
    async () => parseResponse(client.test.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /test
 */
export function getGetTestKey(args: InferRequestType<typeof client.test.$get>) {
  return ['GET', '/test', args] as const
}

/**
 * GET /empty-refs
 */
export function useGetEmptyRefs(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['empty-refs']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/empty-refs'] as const) : null
  return useSWR<InferResponseType<(typeof client)['empty-refs']['$get']>, Error>(
    key,
    async () => parseResponse(client['empty-refs'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /empty-refs
 */
export function getGetEmptyRefsKey() {
  return ['GET', '/empty-refs'] as const
}

/**
 * GET /unicode-refs
 */
export function useGetUnicodeRefs(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['unicode-refs']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/unicode-refs'] as const) : null
  return useSWR<InferResponseType<(typeof client)['unicode-refs']['$get']>, Error>(
    key,
    async () => parseResponse(client['unicode-refs'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /unicode-refs
 */
export function getGetUnicodeRefsKey() {
  return ['GET', '/unicode-refs'] as const
}

/**
 * GET /special-chars
 */
export function useGetSpecialChars(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['special-chars']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/special-chars'] as const) : null
  return useSWR<InferResponseType<(typeof client)['special-chars']['$get']>, Error>(
    key,
    async () => parseResponse(client['special-chars'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /special-chars
 */
export function getGetSpecialCharsKey() {
  return ['GET', '/special-chars'] as const
}

/**
 * GET /numeric-start
 */
export function useGetNumericStart(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['numeric-start']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/numeric-start'] as const) : null
  return useSWR<InferResponseType<(typeof client)['numeric-start']['$get']>, Error>(
    key,
    async () => parseResponse(client['numeric-start'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /numeric-start
 */
export function getGetNumericStartKey() {
  return ['GET', '/numeric-start'] as const
}

/**
 * GET /ref-in-allof
 */
export function useGetRefInAllof(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['ref-in-allof']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/ref-in-allof'] as const) : null
  return useSWR<InferResponseType<(typeof client)['ref-in-allof']['$get']>, Error>(
    key,
    async () => parseResponse(client['ref-in-allof'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /ref-in-allof
 */
export function getGetRefInAllofKey() {
  return ['GET', '/ref-in-allof'] as const
}

/**
 * GET /deeply-nested
 */
export function useGetDeeplyNested(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['deeply-nested']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/deeply-nested'] as const) : null
  return useSWR<InferResponseType<(typeof client)['deeply-nested']['$get']>, Error>(
    key,
    async () => parseResponse(client['deeply-nested'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /deeply-nested
 */
export function getGetDeeplyNestedKey() {
  return ['GET', '/deeply-nested'] as const
}

/**
 * GET /same-name-diff-context
 */
export function useGetSameNameDiffContext(options?: {
  swr?: SWRConfiguration<
    InferResponseType<(typeof client)['same-name-diff-context']['$get']>,
    Error
  >
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/same-name-diff-context'] as const) : null
  return useSWR<InferResponseType<(typeof client)['same-name-diff-context']['$get']>, Error>(
    key,
    async () => parseResponse(client['same-name-diff-context'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /same-name-diff-context
 */
export function getGetSameNameDiffContextKey() {
  return ['GET', '/same-name-diff-context'] as const
}

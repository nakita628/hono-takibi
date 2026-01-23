import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/20-ref-edge-cases'

/**
 * GET /test
 */
export function useGetTest(
  args: InferRequestType<typeof client.test.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.test.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTestKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.test.$get>, Error>(
    swrKey,
    async () => parseResponse(client.test.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
  swr?: SWRConfiguration<InferResponseType<(typeof client)['empty-refs']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetEmptyRefsKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['empty-refs']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['empty-refs'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
  swr?: SWRConfiguration<InferResponseType<(typeof client)['unicode-refs']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUnicodeRefsKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['unicode-refs']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['unicode-refs'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
  swr?: SWRConfiguration<InferResponseType<(typeof client)['special-chars']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSpecialCharsKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['special-chars']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['special-chars'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
  swr?: SWRConfiguration<InferResponseType<(typeof client)['numeric-start']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetNumericStartKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['numeric-start']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['numeric-start'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
  swr?: SWRConfiguration<InferResponseType<(typeof client)['ref-in-allof']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetRefInAllofKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['ref-in-allof']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['ref-in-allof'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
  swr?: SWRConfiguration<InferResponseType<(typeof client)['deeply-nested']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetDeeplyNestedKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['deeply-nested']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['deeply-nested'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
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
  > & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSameNameDiffContextKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['same-name-diff-context']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['same-name-diff-context'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /same-name-diff-context
 */
export function getGetSameNameDiffContextKey() {
  return ['GET', '/same-name-diff-context'] as const
}

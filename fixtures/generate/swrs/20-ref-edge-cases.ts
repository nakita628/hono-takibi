import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/20-ref-edge-cases'

/**
 * Generates SWR cache key for GET /test
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTestKey(args: InferRequestType<typeof client.test.$get>) {
  return ['test', 'GET', '/test', args] as const
}

/**
 * GET /test
 */
export function useGetTest(
  args: InferRequestType<typeof client.test.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetTestKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.test.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /empty-refs
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetEmptyRefsKey() {
  return ['empty-refs', 'GET', '/empty-refs'] as const
}

/**
 * GET /empty-refs
 */
export function useGetEmptyRefs(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetEmptyRefsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['empty-refs'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /unicode-refs
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetUnicodeRefsKey() {
  return ['unicode-refs', 'GET', '/unicode-refs'] as const
}

/**
 * GET /unicode-refs
 */
export function useGetUnicodeRefs(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetUnicodeRefsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['unicode-refs'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /special-chars
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetSpecialCharsKey() {
  return ['special-chars', 'GET', '/special-chars'] as const
}

/**
 * GET /special-chars
 */
export function useGetSpecialChars(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetSpecialCharsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['special-chars'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /numeric-start
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNumericStartKey() {
  return ['numeric-start', 'GET', '/numeric-start'] as const
}

/**
 * GET /numeric-start
 */
export function useGetNumericStart(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetNumericStartKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['numeric-start'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /ref-in-allof
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetRefInAllofKey() {
  return ['ref-in-allof', 'GET', '/ref-in-allof'] as const
}

/**
 * GET /ref-in-allof
 */
export function useGetRefInAllof(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetRefInAllofKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['ref-in-allof'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /deeply-nested
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetDeeplyNestedKey() {
  return ['deeply-nested', 'GET', '/deeply-nested'] as const
}

/**
 * GET /deeply-nested
 */
export function useGetDeeplyNested(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetDeeplyNestedKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['deeply-nested'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /same-name-diff-context
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetSameNameDiffContextKey() {
  return ['same-name-diff-context', 'GET', '/same-name-diff-context'] as const
}

/**
 * GET /same-name-diff-context
 */
export function useGetSameNameDiffContext(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetSameNameDiffContextKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['same-name-diff-context'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

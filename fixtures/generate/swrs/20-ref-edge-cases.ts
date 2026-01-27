import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/20-ref-edge-cases'

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
  const swrKey = customKey ?? (isEnabled ? getGetTestKey(args) : null)
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
 * Generates SWR cache key for GET /test
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetTestKey(args: InferRequestType<typeof client.test.$get>) {
  return ['/test', args] as const
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
  const swrKey = customKey ?? (isEnabled ? getGetEmptyRefsKey() : null)
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
 * Generates SWR cache key for GET /empty-refs
 * Returns structured key [templatePath] for filter-based invalidation
 */
export function getGetEmptyRefsKey() {
  return ['/empty-refs'] as const
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
  const swrKey = customKey ?? (isEnabled ? getGetUnicodeRefsKey() : null)
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
 * Generates SWR cache key for GET /unicode-refs
 * Returns structured key [templatePath] for filter-based invalidation
 */
export function getGetUnicodeRefsKey() {
  return ['/unicode-refs'] as const
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
  const swrKey = customKey ?? (isEnabled ? getGetSpecialCharsKey() : null)
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
 * Generates SWR cache key for GET /special-chars
 * Returns structured key [templatePath] for filter-based invalidation
 */
export function getGetSpecialCharsKey() {
  return ['/special-chars'] as const
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
  const swrKey = customKey ?? (isEnabled ? getGetNumericStartKey() : null)
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
 * Generates SWR cache key for GET /numeric-start
 * Returns structured key [templatePath] for filter-based invalidation
 */
export function getGetNumericStartKey() {
  return ['/numeric-start'] as const
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
  const swrKey = customKey ?? (isEnabled ? getGetRefInAllofKey() : null)
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
 * Generates SWR cache key for GET /ref-in-allof
 * Returns structured key [templatePath] for filter-based invalidation
 */
export function getGetRefInAllofKey() {
  return ['/ref-in-allof'] as const
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
  const swrKey = customKey ?? (isEnabled ? getGetDeeplyNestedKey() : null)
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
 * Generates SWR cache key for GET /deeply-nested
 * Returns structured key [templatePath] for filter-based invalidation
 */
export function getGetDeeplyNestedKey() {
  return ['/deeply-nested'] as const
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
  const swrKey = customKey ?? (isEnabled ? getGetSameNameDiffContextKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['same-name-diff-context'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /same-name-diff-context
 * Returns structured key [templatePath] for filter-based invalidation
 */
export function getGetSameNameDiffContextKey() {
  return ['/same-name-diff-context'] as const
}

import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import type { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates SWR cache key for GET /health
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetHealthKey() {
  return ['health', 'GET', '/health'] as const
}

/**
 * GET /health
 */
export async function getHealth(options?: ClientRequestOptions) {
  return await parseResponse(client.health.$get(undefined, options))
}

/**
 * GET /health
 */
export function useGetHealth(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHealthKey()) : null
  return { swrKey, ...useSWR(swrKey, async () => getHealth(clientOptions), restSwrOptions) }
}

/**
 * GET /health
 */
export function useImmutableGetHealth(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetHealthKey()) : null
  return {
    swrKey,
    ...useSWRImmutable(swrKey, async () => getHealth(clientOptions), restSwrOptions),
  }
}

/**
 * Generates SWR infinite query cache key for GET /health
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetHealthInfiniteKey() {
  return ['health', 'GET', '/health', 'infinite'] as const
}

/**
 * GET /health
 */
export function useInfiniteGetHealth(options: {
  swr?: SWRInfiniteConfiguration<Awaited<ReturnType<typeof getHealth>>, Error> & {
    swrKey?: SWRInfiniteKeyLoader
  }
  options?: ClientRequestOptions
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKeyLoader, ...restSwrOptions } = swrOptions ?? {}
  const keyLoader =
    customKeyLoader ?? ((index: number) => [...getGetHealthInfiniteKey(), index] as const)
  return useSWRInfinite(keyLoader, async () => getHealth(clientOptions), restSwrOptions)
}

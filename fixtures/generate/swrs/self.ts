import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import { client } from '../clients/self'

/**
 * GET /categories
 */
export function useGetCategories(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCategoriesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.categories.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /categories
 */
export function getGetCategoriesKey() {
  return ['/categories'] as const
}

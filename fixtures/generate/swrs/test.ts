import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/test'

/**
 * GET /hono
 *
 * Hono
 *
 * Hono
 */
export function useGetHono(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetHonoKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.hono.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /hono
 * Returns structured key [templatePath] for filter-based invalidation
 */
export function getGetHonoKey() {
  return ['/hono'] as const
}

/**
 * GET /hono-x
 *
 * HonoX
 *
 * HonoX
 */
export function useGetHonoX(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetHonoXKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['hono-x'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /hono-x
 * Returns structured key [templatePath] for filter-based invalidation
 */
export function getGetHonoXKey() {
  return ['/hono-x'] as const
}

/**
 * GET /zod-openapi-hono
 *
 * ZodOpenAPIHono
 *
 * ZodOpenAPIHono
 */
export function useGetZodOpenapiHono(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetZodOpenapiHonoKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['zod-openapi-hono'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /zod-openapi-hono
 * Returns structured key [templatePath] for filter-based invalidation
 */
export function getGetZodOpenapiHonoKey() {
  return ['/zod-openapi-hono'] as const
}

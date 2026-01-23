import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import { client } from '../clients/test'

/**
 * GET /hono
 *
 * Hono
 *
 * Hono
 */
export function useGetHono(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.hono.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetHonoKey() : null)
  const query = useSWR<InferResponseType<typeof client.hono.$get>, Error>(
    swrKey,
    async () => parseResponse(client.hono.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /hono
 */
export function getGetHonoKey() {
  return ['GET', '/hono'] as const
}

/**
 * GET /hono-x
 *
 * HonoX
 *
 * HonoX
 */
export function useGetHonoX(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['hono-x']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetHonoXKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['hono-x']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['hono-x'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /hono-x
 */
export function getGetHonoXKey() {
  return ['GET', '/hono-x'] as const
}

/**
 * GET /zod-openapi-hono
 *
 * ZodOpenAPIHono
 *
 * ZodOpenAPIHono
 */
export function useGetZodOpenapiHono(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['zod-openapi-hono']['$get']>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetZodOpenapiHonoKey() : null)
  const query = useSWR<InferResponseType<(typeof client)['zod-openapi-hono']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client['zod-openapi-hono'].$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /zod-openapi-hono
 */
export function getGetZodOpenapiHonoKey() {
  return ['GET', '/zod-openapi-hono'] as const
}

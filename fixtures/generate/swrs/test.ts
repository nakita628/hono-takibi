import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
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
  swr?: SWRConfiguration<InferResponseType<typeof client.hono.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/hono'] as const) : null
  return useSWR<InferResponseType<typeof client.hono.$get>, Error>(
    key,
    async () => parseResponse(client.hono.$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<(typeof client)['hono-x']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/hono-x'] as const) : null
  return useSWR<InferResponseType<(typeof client)['hono-x']['$get']>, Error>(
    key,
    async () => parseResponse(client['hono-x'].$get(undefined, options?.client)),
    options?.swr,
  )
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
  swr?: SWRConfiguration<InferResponseType<(typeof client)['zod-openapi-hono']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/zod-openapi-hono'] as const) : null
  return useSWR<InferResponseType<(typeof client)['zod-openapi-hono']['$get']>, Error>(
    key,
    async () => parseResponse(client['zod-openapi-hono'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /zod-openapi-hono
 */
export function getGetZodOpenapiHonoKey() {
  return ['GET', '/zod-openapi-hono'] as const
}

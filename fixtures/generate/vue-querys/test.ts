import { useQuery } from '@tanstack/vue-query'
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
export function useGetHono(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetHonoQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.hono.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /hono
 */
export function getGetHonoQueryKey() {
  return ['/hono'] as const
}

/**
 * GET /hono-x
 *
 * HonoX
 *
 * HonoX
 */
export function useGetHonoX(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetHonoXQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['hono-x'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /hono-x
 */
export function getGetHonoXQueryKey() {
  return ['/hono-x'] as const
}

/**
 * GET /zod-openapi-hono
 *
 * ZodOpenAPIHono
 *
 * ZodOpenAPIHono
 */
export function useGetZodOpenapiHono(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetZodOpenapiHonoQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['zod-openapi-hono'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /zod-openapi-hono
 */
export function getGetZodOpenapiHonoQueryKey() {
  return ['/zod-openapi-hono'] as const
}

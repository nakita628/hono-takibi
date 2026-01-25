import { useQuery } from '@tanstack/react-query'
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
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<typeof client.hono.$get>
      | (() => InferResponseType<typeof client.hono.$get>)
    initialData?:
      | InferResponseType<typeof client.hono.$get>
      | (() => InferResponseType<typeof client.hono.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetHonoQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.hono.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /hono
 */
export function getGetHonoQueryKey() {
  return ['/hono'] as const
}

/**
 * Returns TanStack Query query options for GET /hono
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHonoQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetHonoQueryKey(),
    queryFn: async () => parseResponse(client.hono.$get(undefined, clientOptions)),
  }
}

/**
 * GET /hono-x
 *
 * HonoX
 *
 * HonoX
 */
export function useGetHonoX(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<(typeof client)['hono-x']['$get']>
      | (() => InferResponseType<(typeof client)['hono-x']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['hono-x']['$get']>
      | (() => InferResponseType<(typeof client)['hono-x']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetHonoXQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['hono-x'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /hono-x
 */
export function getGetHonoXQueryKey() {
  return ['/hono-x'] as const
}

/**
 * Returns TanStack Query query options for GET /hono-x
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetHonoXQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetHonoXQueryKey(),
    queryFn: async () => parseResponse(client['hono-x'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /zod-openapi-hono
 *
 * ZodOpenAPIHono
 *
 * ZodOpenAPIHono
 */
export function useGetZodOpenapiHono(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    placeholderData?:
      | InferResponseType<(typeof client)['zod-openapi-hono']['$get']>
      | (() => InferResponseType<(typeof client)['zod-openapi-hono']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['zod-openapi-hono']['$get']>
      | (() => InferResponseType<(typeof client)['zod-openapi-hono']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetZodOpenapiHonoQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['zod-openapi-hono'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /zod-openapi-hono
 */
export function getGetZodOpenapiHonoQueryKey() {
  return ['/zod-openapi-hono'] as const
}

/**
 * Returns TanStack Query query options for GET /zod-openapi-hono
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetZodOpenapiHonoQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetZodOpenapiHonoQueryKey(),
    queryFn: async () => parseResponse(client['zod-openapi-hono'].$get(undefined, clientOptions)),
  }
}

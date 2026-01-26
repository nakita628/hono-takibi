import { queryOptions, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferResponseType } from 'hono/client'
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
        client.hono.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
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
export const getGetHonoQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetHonoQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.hono.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

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
          init: { ...clientOptions?.init, signal },
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
export const getGetHonoXQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetHonoXQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['hono-x'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
          init: { ...clientOptions?.init, signal },
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
export const getGetZodOpenapiHonoQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetZodOpenapiHonoQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['zod-openapi-hono'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

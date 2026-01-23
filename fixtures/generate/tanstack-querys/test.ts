import type { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
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
export function useGetHono(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.hono.$get>,
      Error,
      InferResponseType<typeof client.hono.$get>,
      readonly ['/hono']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetHonoQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.hono.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /hono
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
export function useGetHonoX(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['hono-x']['$get']>,
      Error,
      InferResponseType<(typeof client)['hono-x']['$get']>,
      readonly ['/hono-x']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetHonoXQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['hono-x'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /hono-x
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
export function useGetZodOpenapiHono(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client)['zod-openapi-hono']['$get']>,
      Error,
      InferResponseType<(typeof client)['zod-openapi-hono']['$get']>,
      readonly ['/zod-openapi-hono']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetZodOpenapiHonoQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['zod-openapi-hono'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /zod-openapi-hono
 */
export function getGetZodOpenapiHonoQueryKey() {
  return ['/zod-openapi-hono'] as const
}

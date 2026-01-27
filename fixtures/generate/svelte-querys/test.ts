import { createQuery } from '@tanstack/svelte-query'
import type { CreateQueryOptions } from '@tanstack/svelte-query'
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
export function createGetHono(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.hono.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetHonoQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /hono
 * Uses $url() for type-safe key generation
 */
export function getGetHonoQueryKey() {
  return [client.hono.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /hono
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetHonoQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetHonoQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
export function createGetHonoX(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['hono-x']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetHonoXQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /hono-x
 * Uses $url() for type-safe key generation
 */
export function getGetHonoXQueryKey() {
  return [client['hono-x'].$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /hono-x
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetHonoXQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetHonoXQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
export function createGetZodOpenapiHono(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['zod-openapi-hono']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetZodOpenapiHonoQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /zod-openapi-hono
 * Uses $url() for type-safe key generation
 */
export function getGetZodOpenapiHonoQueryKey() {
  return [client['zod-openapi-hono'].$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /zod-openapi-hono
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetZodOpenapiHonoQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetZodOpenapiHonoQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['zod-openapi-hono'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})
